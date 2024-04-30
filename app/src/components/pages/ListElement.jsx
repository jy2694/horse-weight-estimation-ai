import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate, faCheck, faUpload} from "@fortawesome/free-solid-svg-icons";

export default function ListElement(props){
    return <>
        <div className="w-100 border border-black border-1 d-flex align-items-center justify-content-center" style={{minHeight: "10vh", maxHeight: "10vh"}}>
            <img className="border border-black border-1" alt="img" src="" style={{minHeight: "8vh", maxHeight: "8vh", minWidth: "8vh", maxWidth: "8vh"}}/>
            <div className="w-75 d-flex flex-column jusitfy-content-center align-items-start m-2" style={{minHeight: "8vh", maxHeight: "8vh"}}>
                {props.element["flag"] === "uploading" && <h6>상태 : <FontAwesomeIcon icon={faUpload} fade /> 업로드 중...</h6>}
                {props.element["flag"] === "uploaded" && <h6>상태 : <FontAwesomeIcon icon={faArrowsRotate} spin /> 처리 중...</h6>}
                {props.element["flag"] === "complete" && <h6>상태 : <FontAwesomeIcon icon={faCheck} style={{color:"#63E6BE"}}/> 완료</h6>}
                <span style={{fontSize:"small"}}>추정값 : N kg, M cm</span>
            </div>
        </div>
    </>;
}