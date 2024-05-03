const recordList = [];
export function uploadPhoto(fileName) {
    recordList.push({
        fileName: fileName,
        flag: "uploading",
        owner: localStorage.getItem("id"),
        reason: null,
        tall: null,
        weight: null
    });
}
export function uploadCompletePhoto(fileName){
    for(let i = 0; i < recordList.length; i ++){
        if(recordList[i].fileName === fileName){
            recordList[i].flag = "uploaded";
            return;
        }
    }
}
export function processCompletePhoto(fileName, tall, weight, reason){
    for(let i = 0; i < recordList.length; i ++){
            if(recordList[i].fileName === fileName){
                recordList[i].flag = "complete";
                return;
            }
        }   
}
export function loadAll(list){
    recordList.length = 0;
    for(let i = 0; i < list.length; i ++){
        recordList.push(list[i]);
    }
}
export function getRecordList(){
    return recordList;
}