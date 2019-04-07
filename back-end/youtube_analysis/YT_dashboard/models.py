from django.db import models

# Create your models here.
class samples(models.Model):
    # 영상
    vid = models.CharField(max_length=100)
    # 날짜
    date = models.DateTimeField()
    # 조회수
    views = models.IntegerField()
    # 유튜브 프리미엄 이용자 조회수
    redViews = models.IntegerField()
    # 전체 시청 시간
    estimatedMinutesWatched = models.IntegerField()
    # 유튜브 프리미엄 이용자 시청 시간
    estimatedRedMinutesWatched = models.IntegerField()
    # 존채 평균 시청 시간
    averageViewDuration = models.IntegerField()
    #
    averageViewPercentage = models.FloatField()
    #
    subscribersGained = models.IntegerField()
    #
    subscribersLos = models.IntegerField()
    #
    comments = models.IntegerField()
    #
    likes = models.IntegerField()
    #
    dislikes = models.IntegerField()
    #
    videosAddedToPlaylists = models.IntegerField()
    #
    videosRemovedFromPlaylists = models.IntegerField()
    #
    shares = models.IntegerField()