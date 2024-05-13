import {Modal, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate, faCheck, faTriangleExclamation, faUpload} from "@fortawesome/free-solid-svg-icons";

export default function DetailViewModal(props){
    
    const renderStatus = () => {
        if(props.element["flag"] === "uploading"){
            return <td><FontAwesomeIcon className={"me-2"} icon={faUpload} fade /> 업로드 중...</td>;
        } else if(props.element["flag"] === "uploaded"){
            return <td><FontAwesomeIcon className={"me-2"} icon={faArrowsRotate} spin /> 처리 중...</td>;
        } else if(props.element["flag"] === "complete"){
            if(props.element["reason"] === "정상"){
                return <td><FontAwesomeIcon className={"me-2"} icon={faCheck} style={{color:"#63E6BE"}}/> 완료</td>
            } else {
                return <td><FontAwesomeIcon className={"me-2"} icon={faTriangleExclamation} style={{color: "#ff0000",}} /> 오류 발생</td>
            }
        }
    }
    
    const renderDetail = () => {
        if(props.element["flag"] === "uploading") return <></>;
        if(props.element["flag"] === "uploaded") return <></>;
        if(props.element["reason"] === "정상"){
            return <>
                <tr>
                    <td>Weight</td>
                    <td>{props.element["weight"] + "kg"}</td>
                </tr>
                <tr>
                    <td>Tall</td>
                    <td>{props.element["tall"] + "cm"}</td>
                </tr>
            </>
        } else {
            return <>
                <tr>
                    <td>Reason</td>
                    <td className="text-danger">{props.element["reason"]}</td>
                </tr>
            </>
        }
    }
    
    return <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={()=>props.onHide()}
        >
            <Modal.Header closeButton/>
            <Modal.Body>
                { props.show &&
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img
                            alt={props.element["fileName"]}
                            src={"http://localhost:8080/image/"+props.element["fileName"]}
                            style={{minWidth:"35vh", maxWidth:"35vh", minHeight:"35vh", maxHeight:"35vh", objectFit: "contain"}}
                            className="border border-1 mb-2"/>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>Status</td>
                                    {renderStatus()}
                                </tr>
                                {renderDetail()}
                            </tbody>
                        </Table>
                    </div>
                }
            </Modal.Body>
        </Modal>;
}