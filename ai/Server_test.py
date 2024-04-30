import time

import websockets
import asyncio

async def hello():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("start")
        a = await websocket.recv()
        print(a)
        # time.sleep(1)
        # await websocket.send("stop")
        b = await websocket.recv()
        print(b)

asyncio.get_event_loop().run_until_complete(hello())
