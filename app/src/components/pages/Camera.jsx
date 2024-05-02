import {Container} from "react-bootstrap";
import camImage from '../../img/camera.png';
import {useRef} from "react";
import axios from "axios";

export default function Camera(){

    const inputElement = useRef(null);

    return <Container className="w-100 overflow-y-auto overflow-x-hidden d-flex justify-content-center align-items-center" style={{minHeight: "82vh", height:"82vh"}}>
        <input type="file" ref={inputElement} className="d-none"
        onChange={(e) => {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("name", crypto.randomUUID().toString());
            formData.append("owner", localStorage.getItem("id"));
            axios.post('http://localhost:8080/upload', formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }}/>
        <Container className="rounded-circle bg-primary-subtle d-flex justify-content-center align-items-center flex-column"
            style={{minHeight: "50vh", minWidth: "50vh"}}
            onClick={() => {
                inputElement.current.click();
            }}>
            <img alt="" src={camImage} style={{height: "20vh", width: "20vh"}}/>
            <span className="h3">사진 업로드하기</span>
        </Container>
    </Container>
}