import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faCheck,
    faRecycle,
    faTrashCan,
    faTriangleExclamation,
    faUpload
} from "@fortawesome/free-solid-svg-icons";

export default function ListElement(props){

    const renderStatus = () => {
        if(props.element["flag"] === "uploading"){
            return <h6><FontAwesomeIcon icon={faUpload} fade /> 업로드 중...</h6>;
        } else if(props.element["flag"] === "uploaded"){
            return <h6><FontAwesomeIcon icon={faArrowsRotate} spin /> 처리 중...</h6>;
        } else if(props.element["flag"] === "complete"){
            if(props.element["reason"] === "정상"){
                return <h6><FontAwesomeIcon icon={faCheck} style={{color:"#63E6BE"}}/> 완료</h6>
            } else {
                return <h6><FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#ff0000",}} /> 오류 발생</h6>
            }
        }
    }

    const renderMessage = () => {
        if(props.element["flag"] === "complete"){
            if(props.element["reason"] === "정상"){
                return <span style={{fontSize:"small"}}>{props.element["weight"]} kg, {props.element["tall"]} cm</span>;
            } else {
                return <span className="text-danger" style={{fontSize:"small"}}>오류 : {props.element["reason"]}</span>;
            }
        } else return <></>;
    }

    return <>
        <div className="w-100 border border-black border-1 d-flex align-items-center justify-content-center" style={{minHeight: "10vh", maxHeight: "10vh"}}>
            <img className="border border-black border-1" alt="img" src="" style={{minHeight: "8vh", maxHeight: "8vh", minWidth: "8vh", maxWidth: "8vh"}}/>
            <div className="w-75 d-flex flex-column jusitfy-content-center align-items-start m-2" style={{minHeight: "8vh", maxHeight: "8vh"}}>
                {renderStatus()}
                {renderMessage()}
            </div>
            <div className="ms-3 me-3">
                <FontAwesomeIcon icon={faTrashCan}/>
            </div>
        </div>
    </>;
}