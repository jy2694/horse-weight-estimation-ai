import {Button, Modal} from "react-bootstrap";
import {deletePhoto} from "../../PhotoDatabase";

export default function DeleteModal(props){
    return <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show != null}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    주의
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>해당 기록이 영구적으로 삭제됩니다.</h4>
                <p>
                    기록을 삭제하고 나면 복구할 수 없습니다.
                    <br/>
                    정말로 삭제하시겠습니까?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={()=> {
                            props.webSock.current.send("client:del:"+props.show);
                        }}>삭제</Button>
                <Button variant="secondary" onClick={()=>props.setShow(null)}>취소</Button>
            </Modal.Footer>
        </Modal>;
}