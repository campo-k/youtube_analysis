import json, redis, datetime
from celery import group
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.core.cache import cache

from YT_dashboard import tasks

# Create your views here.
def dashboard(request):
    task    = tasks.get_values.delay("al71*")
    data    = task.get()
    context = {'data': data}

    return render(request, 'YT_dashboard/dashboard.html', context)