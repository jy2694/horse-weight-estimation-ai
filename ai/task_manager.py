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
                              "tall": 0,
                              "weight": 0,
                              "reason": "blahblah",
                              "bbox": []
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

    def set_result_form(self, result_form):
        pass

    async def _pred(self, websocket, message):  # 이름 변경
        print('pred started')
        file_id = message

        # Local test

        file_path = message[9:]

        detect_status, bbox = self.predict(file_path)  # test
        detect_status = 1

        if detect_status == 1:
            # TODO: Depth & Shape Estimation

            # TODO: 원본 사진대신 바운딩박스 그려진 사진 저장
            self.result_form["fileName"] = file_path
            self.result_form["tall"] = random.randrange(200, 250)
            self.result_form['weight'] = random.randrange(500, 600)
            self.result_form['reason'] = '정상'
            await websocket.send('ai:comp:' + json.dumps(self.result_form))
        else:
            self.result_form["fileName"] = file_path
            self.result_form["tall"] = 0
            self.result_form['weight'] = 0
            self.result_form['reason'] = '옆면이 아닙니다.'
            await websocket.send('ai:comp:' + json.dumps(self.result_form))

        print('Pred Completed')
