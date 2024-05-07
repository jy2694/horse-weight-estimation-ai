from Load_DB import LoadDB
import asyncio
from model_handler import ModelHandler
import json
import random


class TaskManager(ModelHandler):
    def __init__(self, detection_weight):
        super().__init__(detection_weight=detection_weight)
        self.task = None
        self.result_form = {
                              "fileName": "파일이름",
                              "tall": "0",
                              "weight": "0",
                              "reason": "blahblah"
                            }


    async def handle_websocket_receive(self, websocket, message):  # 이름 변경
        if message == 'stop':  # STOP CODE
            await self._stop_task(websocket)
        else:
            await self._start_task(websocket, message)

    async def _start_task(self, websocket, message):  # 이름 변경
        if self.task is None or self.task.done():
            self.task = asyncio.create_task(self._pred(websocket, message))
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
        print('pred started')
        file_id = message

        # Local test
        # test_path = LoadDB.get_filepath(id=472)

        file_path = message[10:]

        # detect_status = self.predict(test_path)  # test
        detect_status = 1

        if detect_status == 1:
            # TODO: Depth & Shape Estimation
            # await websocket.send('side')
            self.result_form["fileName"] = file_path
            self.result_form["tall"] = str(random.randrange(200, 250))
            self.result_form['weight'] = str(random.randrange(500, 600))
            self.result_form['reason'] = 'asdfasdf'
            await websocket.send(json.dumps(self.result_form))
        else:
            await websocket.send("etc")

        print('Pred Completed')
