import {Container} from "react-bootstrap";
import ListElement from "./ListElement";

export default function RecordList(){

    const renderList = () => {
        
    }

    return <Container className="w-100 overflow-y-auto overflow-x-hidden" style={{minHeight: "82vh", height:"82vh"}}>
        {renderList()}
    </Container>
}