from Load_DB import LoadDB
import asyncio
from model_handler import ModelHandler


class TaskManager(ModelHandler):
    def __init__(self, detection_weight):
        super().__init__(detection_weight=detection_weight)
        self.task = None

    async def handle_websocket_receive(self, websocket, message):  # 이름 변경
        if message == 'stop':  # STOP CODE
            await self._stop_task(websocket)
        else:
            await self._start_task(websocket, message)

    async def _start_task(self, websocket, message):  # 이름 변경
        if self.task is None or self.task.done():
            self.task = asyncio.create_task(self._pred(websocket, message))
            await websocket.send("Task started")
        else:
            await websocket.send("Task is already running")

    async def _stop_task(self, websocket):  # 이름 변경
        if self.task is not None and not self.task.done():
            self.task.cancel()
            await websocket.send("Task Stopped")
            print("Task stopped")
        else:
            await websocket.send('No task to stop')

    async def _pred(self, websocket, message):  # 이름 변경
        print('pred start')
        file_id = message
        file_path = LoadDB.get_filepath(id=472)

        detect_status = self.predict(file_path)  # test

        if detect_status == 1:
            # TODO: Depth & Shape Estimation
            await websocket.send('side')
        else:
            await websocket.send("etc")

        print('Pred Completed')
