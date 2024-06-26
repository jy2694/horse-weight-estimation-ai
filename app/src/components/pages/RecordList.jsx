import {Container} from "react-bootstrap";
import ListElement from "./ListElement";
import {getRecordList} from "../../PhotoDatabase";

export default function RecordList(props){

    const renderList = () => {
        const result = [];
        let idx = 0;
        getRecordList().forEach((value) => {
            result.push(<ListElement key={idx} element={value} onDelete={()=>props.onDelete(value.fileName)} onClick={()=>props.setSelectElement(value)}/>);
            idx++;
        });
        return result;
    }

    return <Container className="w-100 overflow-y-auto overflow-x-hidden" style={{minHeight: "82vh", height:"82vh"}}>
        {renderList()}
    </Container>
}