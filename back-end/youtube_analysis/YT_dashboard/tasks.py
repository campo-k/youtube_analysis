import json, datetime
from celery import shared_task
from .redis_query import redis_query


@shared_task
def get_TS_values(args):
    try:
        rData = []
        redis = redis_query()
        rConn = redis.get_connect()

        if type(args["pk"]) is list:
            for item in args["pk"]:
                rData.append(get_TS_toObject(redis, rConn, item, args))
        else:
            rData.append(get_TS_toObject(redis, rConn, args["pk"], args))

        redis.close()

        return json.dumps(rData)

    except ValueError:
        print(ValueError)


def get_TS_toObject(redis, conn, key, args):
    keys = redis.get_keys(key + "*")
    data = conn.mget(keys)
    result = []
    object = {}

    for item in data:
        if item is None: continue

        item_obj  = {}
        item_pick = args["p1"] if args["p1"] is not None else 2
        item_list = item.decode('utf-8').replace('\r', '').split(',')

        if args["p2"] is not None and args["p3"] is not None:
            if args["p2"] > item_list[1] or args["p3"] < item_list[1]:
                continue

        if key == "*_2019-02-":
            if item_list[1] in object.keys():
                result[object[item_list[1]]]["va"] += int(item_list[item_pick])

            else:
                object[item_list[1]] = len(result)
                item_obj["id"] = "Sum all"
                item_obj["dt"] = item_list[1]
                item_obj["va"] = int(item_list[item_pick])
                result.append(item_obj)
        else:
            item_obj["id"] = item_list[0]
            item_obj["dt"] = item_list[1]
            item_obj["va"] = int(item_list[item_pick])
            result.append(item_obj)

    result.sort(key=lambda x: x["dt"])
    return result


@shared_task
def get_RANK_values(args):
    try:
        redis = redis_query()
        rConn = redis.get_connect()
        rData = get_RANK_toObject(redis, rConn, args)

        redis.close()
        return json.dumps(rData)

    except ValueError:
        print(ValueError)


def get_RANK_toObject(redis, conn, args):
    keys = redis.get_keys("*_2019-02-*")
    data = conn.mget(keys)
    result = []

    for item in data:
        if item is None: continue

        item_obj  = {}
        item_pick = args["p1"] if args["p1"] is not None else 2
        item_list = item.decode('utf-8').replace('\r', '').split(',')

        if args["p4"] is not None:
            if args["p4"] != item_list[1]:
                continue

        item_obj["id"] = item_list[0]
        item_obj["dt"] = item_list[1]
        item_obj["va"] = int(item_list[item_pick])
        result.append(item_obj)

    result.sort(key=lambda x: x["va"], reverse=True)
    return result