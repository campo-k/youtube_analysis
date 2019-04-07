from django.urls import include, path
from rest_framework import routers
from YT_dashboard.APIs import views

app_name = 'YT_dashboard'
router   = routers.SimpleRouter()
router.register(r'time', views.GetTimeSeriesViewset, base_name = 'd-time')
router.register(r'rank', views.GetRankingViewset, base_name = 'd-rank')
router.register(r'start', views.GetStartViewset, base_name = 'd-start')

urlpatterns = router.urls