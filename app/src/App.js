import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import FooterFrame from "./components/FooterFrame";
import {useEffect, useRef, useState} from "react";
import Body from "./components/Body";
import { HWebSock } from './HWebSock';

function App() {
  
  const [selection, setSelection] = useState(0);
  const [connected, setConnected] = useState(false);
  const [record, setRecord] = useState([]);
  const webSock = useRef(null);
  
  useEffect(()=> {
    let id = localStorage.getItem("id");
    if(id == null){
      localStorage.setItem("id", crypto.randomUUID());
      id = localStorage.getItem("id");
    }
    webSock.current = new HWebSock("ws://localhost:8080/ws",
                                   () => {
      webSock.current.send("client:connect:"+id);
      }, (error) => {
      setConnected(false);
      console.log(error);
      }, (error) => {
      setConnected(false);
      console.log(error);
      }, (data) => {
        if(data.data.startsWith("connected")){
          setConnected(true);
          const listJson = JSON.parse(data.data.split("connected:")[1]);
          listJson.forEach((e) => {
            e['flag'] = 'uploaded';
          });
          setRecord(listJson);
          console.log(listJson);
        }
      });
  }, []);
  
  return (
    <div className="App">
      {
        !connected && <div className="w-100 bg-secondary d-flex justify-content-center align-items-center flex-column" style={{height: "100vh", opacity: "0.5", position:"fixed", top: "0px", left: "0px", maxWidth: "425px"}}>
          <span className="loader"></span>
          <h6 className="text-white mt-2">서버에 연결 중입니다...</h6>
        </div>
      }
      <NavigationBar/>
      <Body selection={selection}/>
      <FooterFrame onPageChange={(value) => setSelection(value)}/>
    </div>
  );
}

export default App;
