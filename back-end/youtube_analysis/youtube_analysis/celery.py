# -*- coding: utf-8 -*-

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from youtube_analysis.settings import base

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youtube_analysis.settings.' + base.BASE_ENV)

app = Celery('youtube_analysis')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
# celery 워커 실행
# $ celery -A proj worker -l info
# 현재 product의 경우
# $ celery -A MoldMini worker -l info
#
# 멈추기
# Ctrl+C
#
# 백그라운드에서 실행
# $ celery multi start w1 -A proj -l info
# 현재 product의 경우
# $ celery multi start w1 -A MoldMini -l info
#
# 재시작
# $ celery multi restart w1 -A proj -l info
# 현재 product의 경우
# $ celery multi restart w1 -A MoldMini -l info
# task 변경이 된 경우 재시작을 해야 변경된 task가 수행된다