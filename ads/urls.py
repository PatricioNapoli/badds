from django.conf.urls import url, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers

from ads.rest import *
from . import views

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, base_name='User')
router.register(r'applications', ApplicationViewSet)
router.register(r'advertisements', AdvertisementViewSet)
router.register(r'spaces', SpaceViewSet)
router.register(r'auctions', AuctionViewSet)
router.register(r'biddings', BiddingViewSet)
router.register(r'restriction', RestrictionViewSet)
router.register(r'resources', ResourceViewSet)

app_name = 'ads'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^', include(router.urls)),
    url(r'^context/$', views.context, name='index')
]

urlpatterns += staticfiles_urlpatterns()
