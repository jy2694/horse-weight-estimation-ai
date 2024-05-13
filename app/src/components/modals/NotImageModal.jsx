import {Button, Modal} from "react-bootstrap";

export default function NotImageModal(props){
    return <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={()=>props.setShow(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    오류
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>파일을 업로드할 수 없습니다.</h4>
                <p>
                    이미지가 아닌 파일은 업로드할 수 없습니다.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.setShow(false)}>확인</Button>
            </Modal.Footer>
        </Modal>;
}