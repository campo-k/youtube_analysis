import redis

class redis_query:
    def __init__(self):
        self.rConnect = redis.Redis(connection_pool=redis.ConnectionPool(host='localhost', port=6379, db=0))

    def get_connect(self):
        return self.rConnect

    def get_keys(self, str):
        ppid = 0
        keys = []

        while (True):
            scan = self.rConnect.scan(ppid, match = str)
            ppid = scan[0]

            if len(scan[1]) is not 0:
                for item in scan[1]:
                    keys.append(item)
            if ppid is 0:
                break

        return keys

    def close(self):
        self.rConnect.connection_pool.disconnect()