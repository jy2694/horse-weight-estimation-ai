import {Container} from "react-bootstrap";
import camera from '../img/camera.png';
import record from '../img/record.png';
import settings from '../img/settings.png';
import {useEffect, useState} from "react";
import '../css/footer.css';
import RecordList from "./pages/RecordList";
import Setting from "./pages/Setting";
import Camera from "./pages/Camera";

const menu = [
    {
        title: "설정",
        icon: settings,
        page: <Setting/>
    },
    {
        title: "기록",
        icon: record,
        page: <RecordList/>
    },
    {
        title: "카메라",
        icon: camera,
        page: <Camera/>
    }
];

export function getMenus(){
    return menu;
}

export default function FooterFrame(props){
    
    const [selection, setSelection] = useState(1);
    const renderMenu = () => {
        const result = [];
        for(let i = 0; i < menu.length; i ++){
            const menuElement = menu[i];
            result.push(<div className={"rounded-circle menu-icon " + (selection === i ? "bg-primary-subtle" : "")}
                style={{minHeight: "8vh", minWidth: "8vh"}}
                onClick={()=>setSelection(i)}>
                <div className="m-2 d-flex flex-column justify-content-center align-items-center" style={{height: "7vh", width: "7vh"}}>
                    <img alt="" src={menuElement.icon} style={{height: "3vh", width: "3vh"}}/>
                    <span>{menuElement.title}</span>
                </div>
            </div>);
        }
        return result;
    }
    
    useEffect(() => {
        props.onPageChange(selection);
    }, [selection]);
    
    return <Container className="w-100 bg-body-tertiary rounded-top-4 d-flex justify-content-around align-items-center" style={{minHeight: "10%", height:"10%"}}>
        {renderMenu()}
    </Container>
}