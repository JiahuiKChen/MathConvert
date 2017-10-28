"""maaaaaaaaaaaaath URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from draw import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', views.api),
    url(r'^', views.index),
] #+ patterns(
   # 'django.contrib.staticfiles.views',
    #url(r'^(?:index.html)?$', 'serve', kwargs={'path': 'index.html'}),
    #url(r'^P<path>$', 'serve'),
#)