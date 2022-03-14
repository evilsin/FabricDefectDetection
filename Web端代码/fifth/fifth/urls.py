from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns
from myweb import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index.html',views.index), # 主页
    path('bigdata.html',views.bigdata),
    path('new3.html',views.new3),# 大数据分析
    path('label.html',views.label),
    path('new2.html',views.new2), # 在线标签
    path('causes.html',views.causes),
    path('new4.html',views.new4),# 原因分析
    path('information.html',views.information),
    path('shibie.html',views.shibie),
    path('new5.html',views.new5),# 识别
    path('show.html',views.show),
]

urlpatterns += staticfiles_urlpatterns()
