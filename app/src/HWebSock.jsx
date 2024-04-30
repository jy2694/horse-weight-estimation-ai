export class HWebSock {

    webSocket;

    constructor(url, onopen, onclose, onerror, onmessage) {
        this.webSocket = new WebSocket(url);
        this.webSocket.onopen = onopen;
        this.webSocket.onclose = onclose;
        this.webSocket.onerror = onerror;
        this.webSocket.onmessage = onmessage;
    }

    close(){
        this.webSocket.close();
    }

    send(message){
        this.webSocket.send(message);
    }
}