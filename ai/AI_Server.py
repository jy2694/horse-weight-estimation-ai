import os
import time
import sys
from model import DetectionModel
import websockets
import asyncio
from Load_DB import LoadDB


class Main(DetectionModel, LoadDB):
    def __init__(self, detection_weight):
        super().__init__(weights_file=detection_weight)


class Server(Main):
    # TODO: DB connect
    def __init__(self):
        super().__init__(detection_weight=r"./Detection/weight/best.pt")

        start_server = websockets.serve(self.ai_status, 'localhost', 8000)

        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

    async def ai_status(self, websocket):
        file_id = await websocket.recv()
        file_path = self.get_filepath(file_id)

        detect_status = self.predict(r"./Detection/Detection_sample.jpeg")
        if detect_status == 1:
            # TODO: Depth & Shape Estimation
            await websocket.send("0")
        else:
            await websocket.send("1")

        print('received websocket')


if __name__ == '__main__':
    s = Server()
