import {Container} from "react-bootstrap";
import ListElement from "./ListElement";
import {getRecordList} from "../../PhotoDatabase";

export default function RecordList(){

    const renderList = () => {
        const result = [];
        getRecordList().forEach((value) => {
            result.push(<ListElement element={value}/>);
        });
        return result;
    }

    return <Container className="w-100 overflow-y-auto overflow-x-hidden" style={{minHeight: "82vh", height:"82vh"}}>
        {renderList()}
    </Container>
}