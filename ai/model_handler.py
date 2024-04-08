from model import DetectionModel


class ModelHandler(DetectionModel):  # 이름 변경
    def __init__(self, detection_weight):
        super().__init__(weights_file=detection_weight)