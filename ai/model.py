import json
import sys
import time

from Detection.models.common import DetectMultiBackend
from Detection.detect import run
import torch
from torch.utils.data import DataLoader
import cv2
import numpy as np


class DetectionModel:
    def __init__(self, weights_file):
        self.device_txt = 'cuda:0' if torch.cuda.is_available() else 'cpu'
        self.model = DetectMultiBackend(weights=weights_file, device=torch.device(self.device_txt), dnn=False, fp16=False)

    def predict(self, file_dir=None):
        time.sleep(0.5)

        pred = run(model=self.model, source=file_dir, data=r'D:\yolov5\data\cdata.yaml')

        return pred
