import json
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from celery import group
from YT_dashboard import tasks


class GetTimeSeriesViewset(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    def retrieve(self, request, *args, **kwargs):
        try:
            pk   = self.kwargs['pk']
            qp   = request.query_params
            args = {"pk": None, "p1": None, "p2": None, "p3": None}

            if pk == "7m+xuexdi5rd29$+hk&%6":
                args["pk"] = "*_2019-02-"
            elif "*" in pk:
                args["pk"] = pk.split('*')
            else:
                args["pk"] = pk

            if len(qp) == 1:
                args["p1"] = int(qp['va'])
            elif len(qp) == 3:
                args["p1"] = int(qp['va'])
                args["p2"] = qp['sD']
                args["p3"] = qp['eD']

            task = tasks.get_TS_values.delay(args)
            data = task.get()
            task.forget()

            return Response(data)

        except IntegrityError:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetRankingViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request, *args, **kwargs):
        try:
            qp   = request.query_params
            args = {"p1": None, "p4": None}

            if len(qp) == 1:
                args["p1"] = int(qp['va'])
                args["p4"] = '2019-02-01'
            elif len(qp) == 2:
                args["p1"] = int(qp['va'])
                args["p4"] = qp['date']

            task = tasks.get_RANK_values.delay(args)
            data = task.get()
            task.forget()

            return Response(data)

        except IntegrityError:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetStartViewset(mixins.ListModelMixin, viewsets.GenericViewSet):
    def list(self, request, *args, **kwargs):
        try:
            data = {"ts": [], 'rank': []}
            args = {"pk": None, "p1": None, "p2": None, "p3": None,"p4": None}

            args["pk"] = "*_2019-02-"
            args["p1"] = 2
            args["p4"] = '2019-02-01'

            task1 = tasks.get_TS_values.delay(args)
            task2 = tasks.get_RANK_values.delay(args)
            data1 = task1.get()
            data2 = task2.get()
            task1.forget()
            task2.forget()

            data["ts"] = data1
            data["rank"] = data2

            # 나중에 확인 >> group async
            # resp = group(
            #     tasks.get_TS_values.s(args),
            #     tasks.get_RANK_values.s(args)
            # ).apply_async()
            #
            # result = resp.get()
            # data["ts"]   = result[0]
            # data["rank"] = result[1]
            # resp.forget()

            return Response(data)

        except IntegrityError:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)