import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import '../css/footer.css';

export default function FooterFrame(props){
    const renderMenu = () => {
        const result = [];
        for(let i = 0; i < props.menu.length; i ++){
            const menuElement = props.menu[i];
            result.push(<div className={"rounded-circle menu-icon " + (props.selection === i ? "bg-primary-subtle" : "")}
                style={{minHeight: "8vh", minWidth: "8vh"}}
                onClick={()=>props.setSelection(i)}>
                <div className="m-2 d-flex flex-column justify-content-center align-items-center" style={{height: "7vh", width: "7vh"}}>
                    <img alt="" src={menuElement.icon} style={{height: "3vh", width: "3vh"}}/>
                    <span style={{fontSize:"small"}}>{menuElement.title}</span>
                </div>
            </div>);
        }
        return result;
    }
    
    useEffect(() => {
        props.setSelection(props.selection);
    }, [props.selection]);
    
    return <Container className="w-100 bg-body-tertiary rounded-top-4 d-flex justify-content-around align-items-center" style={{minHeight: "10%", height:"10%"}}>
        {renderMenu()}
    </Container>
}