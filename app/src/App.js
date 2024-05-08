import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from "./components/NavigationBar";
import FooterFrame from "./components/FooterFrame";
import {useCallback, useEffect, useRef, useState} from "react";
import Body from "./components/Body";
import { HWebSock } from './HWebSock';

import camera from './img/camera.png';
import recordImg from './img/record.png';
import settings from './img/settings.png';
import RecordList from "./components/pages/RecordList";
import Setting from "./components/pages/Setting";
import Camera from "./components/pages/Camera";
import {loadAll, processCompletePhoto} from "./PhotoDatabase";
import DeleteModal from "./components/modals/DeleteModal";
import FileSizeExceedModal from "./components/modals/FileSizeExceedModal";
import NotImageModal from "./components/modals/NotImageModal";

function App() {
  const [check, setCheck] = useState(false);
  const [selection, setSelection] = useState(1);
  const [connected, setConnected] = useState(false);
  const [menu, setMenu] = useState([]);
  const webSock = useRef(null);
  
  const [deleteModal, setDeleteModal] = useState(false);
  const [fileSizeExceedModal, setFileSizeExceedModal] = useState(false);
  const [notImageModal, setNotImageModal] = useState(false);


  useEffect(()=> {
    if(check){
      setCheck(false);
    }
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
      }, (error) => {
      setConnected(false);
      }, (data) => {
        if(data.data.startsWith("connected")){
          setConnected(true);
          const listJson = JSON.parse(data.data.split("connected:")[1]);
          loadAll(listJson);
          listJson.forEach((e) => {
            if(e['flag'] === true){
              e['flag'] = 'complete';
            } else {
              e['flag'] = 'uploaded';
            }
          });
          setMenu([
                    {
                      title: "설정",
                      icon: settings,
                      page: <Setting/>
                    },
                    {
                      title: "기록",
                      icon: recordImg,
                      page: <RecordList />
                    },
                    {
                      title: "카메라",
                      icon: camera,
                      page: <Camera setSelection={(index)=>setSelection(index)} showNotImage={()=>setNotImageModal(true)} showFileSizeExceed={()=>setFileSizeExceedModal(true)}/>
                    }
                  ]);
        } else if(data.data.startsWith("comp:")){
          const listJson = JSON.parse(data.data.split("comp:")[1]);
          processCompletePhoto(listJson["fileName"], listJson["tall"], listJson["weight"], listJson["reason"]);
          setTimeout(()=>setCheck(true), 1000);
        }
      });

    return () => {
    webSock.current?.close();
    };
  }, [check]);

  return (
    <>
      <div className="App">
        {
          !connected && <div className="w-100 bg-secondary d-flex justify-content-center align-items-center flex-column" style={{height: "100vh", opacity: "0.5", position:"fixed", top: "0px", left: "0px", maxWidth: "425px"}}>
            <span className="loader"></span>
            <h6 className="text-white mt-2">서버에 연결 중입니다...</h6>
          </div>
        }
        <NavigationBar/>
        <Body selection={selection} menu={menu}/>
        <FooterFrame menu={menu} selection={selection} setSelection={(i)=>setSelection(i)}/>
      </div>
      <DeleteModal show={deleteModal} setShow={(value)=>setDeleteModal(value)}/>
      <FileSizeExceedModal show={fileSizeExceedModal} setShow={(value)=>setFileSizeExceedModal(value)}/>
      <NotImageModal show={notImageModal} setShow={(value)=>setNotImageModal(value)}/>
    </>
  );
}

export default App;
