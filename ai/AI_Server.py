import os
import time
import sys
from model import DetectionModel
import websockets
import asyncio


class Main(DetectionModel):
    def __init__(self, detection_weight):
        super().__init__(weights_file=detection_weight)


class Server(Main):
    def __init__(self):
        super().__init__(detection_weight=r"D:\yolov5\runs\train\yolov5_test7\weights\best.pt")

        start_server = websockets.serve(self.ai_status, 'localhost', 8000)

        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

    async def ai_status(self, websocket, i):
        await websocket.recv()
        detect_status = self.predict(r"D:\yolov5\person\valid\images\20221105_ch8_1017.png")
        if detect_status == 0:
            await websocket.send("0")
        else:
            await websocket.send("1")

        print('received websocket')


if __name__ == '__main__':
    s = Server()
    print(sys.path)
