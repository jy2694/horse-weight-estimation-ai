import websockets
import asyncio
from task_manager import TaskManager


class Client(TaskManager):
    # TODO: DB connect
    def __init__(self, host='localhost', port=8080):
        super(Client, self).__init__(detection_weight=r"./Detection/weight/best.pt")
        self.task = None
        self.host = host
        self.port = port

    async def start_server(self):
        async with websockets.serve(self.temp, self.host, self.port):
            print('Server Started')
            async with websockets.connect(f'ws://{self.host}:{self.port}', ping_interval=None) as websocket:
                await websocket.send("connect")
                response = await websocket.recv()
            await asyncio.Future()

    async def temp(self, websocket):  # 이름 변경
        try:
            await websocket.send('connect')
            response = await websocket.recv()
            if response == 'connected':
                print("connected successfully")
            else:
                print("fail to connect")
                await websocket.close()

            async for message in websocket:
                await self.handle_websocket_receive(websocket, message)
        except websockets.exceptions.ConnectionClosedError:
            print('Connection Error')


if __name__ == '__main__':
    server = Client()
    asyncio.run(server.start_server())
