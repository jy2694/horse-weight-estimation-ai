import websockets
import asyncio

async def hello():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("0")
        a = await websocket.recv()
        print(a)

asyncio.get_event_loop().run_until_complete(hello())