export class HWebSock {

    webSocket;
    url;
    onopen;
    onclose;
    onerror;
    onmessage;

    constructor(url, onopen, onclose, onerror, onmessage) {
        this.url = url;
        console.log(this.url);
        this.onopen = onopen;
        this.onclose = onclose;
        this.onerror = onerror;
        this.onmessage = onmessage;
        this.connect();
    }

    connect(){
        console.log(this.url);
        this.webSocket = new WebSocket(this.url);
        this.webSocket.onopen =  this.onopen;
        this.webSocket.onclose = this.onclose;
        this.webSocket.onerror = this.onerror;
        this.webSocket.onmessage = this.onmessage;
    }

    close(){
        this.webSocket.close();
    }

    send(message){
        this.webSocket.send(message);
    }
}