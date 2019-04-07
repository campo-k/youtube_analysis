from django.urls import include, path
from YT_dashboard import views

app_name    = 'YT_dashboard'
urlpatterns = [
    path('', views.dashboard, name = 'dashboard'),
]