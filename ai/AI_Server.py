import os
import time
import sys
from model import DetectionModel
import websockets
import asyncio
from Load_DB import LoadDB
from task_manager import TaskManager


class Server(TaskManager):
    # TODO: DB connect
    def __init__(self, host='localhost', port=8000):
        super().__init__(detection_weight=r"./Detection/weight/best.pt")
        self.task = None
        self.host = host
        self.port = port

    async def start_server(self):
        async with websockets.serve(self.temp, self.host, self.port):
            print('Server Started')
            await asyncio.Future()

    async def temp(self, websocket):  # 이름 변경
        try:
            async for message in websocket:
                await self.handle_websocket_receive(websocket, message)
        except websockets.exceptions.ConnectionClosedError:
            print('Connection Error')


if __name__ == '__main__':
    server = Server()
    asyncio.run(server.start_server())
