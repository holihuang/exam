import React, { useState } from "react";
// import logo from './logo.svg';
import axios from "axios";
import throttle from "lodash/throttle";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);

    function handleIpt(e: any) {
        const val = e.target.value.replace(/\D/g, '')
      setValue(val);
      setLoading(true)
    axios({
      method: "get",
      url: "/api/qq.info",
      params: {
        qq: val,
      },
    }).then((res) => {
      const { name, qq, qlogo } = res.data || {};
      setInfo({
        name,
        qq,
        qlogo,
      });
      setLoading(false);
    });
    }

  return (
    <div className="App">
      <h3>QQ号查询</h3>
      <div>
        QQ
              <input className="ipt" value={value} onInput={throttle(handleIpt, 200)} />
      </div>
      {isLoading ? (
              <div className="loading">Loading...</div>
      ) : (
        <div className="info">
          <img className="avator" src={info.qlogo} alt="" />
          <div>
            <div>{info.name}</div>
            <div>{info.qq}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
