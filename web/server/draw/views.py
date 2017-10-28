from django.shortcuts import render
from django.template import Context, loader
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from django.contrib.staticfiles.views import serve
from config import settings

from django.contrib.staticfiles.storage import staticfiles_storage

import os
BUILD_DIR = 'draw' 

#from fancy import wrapper

# Create your views here.

def index(request):
    path = os.path.join(BUILD_DIR, request.path.lstrip(os.path.sep))
    if path is '' or not staticfiles_storage.exists(path):
        #return HttpResponseNotFound(path)
        path = os.path.join(BUILD_DIR, "index.html")
    
    #return HttpResponseNotFound(path)
    return serve(request, path)

def api(request):
    ok = False#True
    result = ""
    try:
        pass
        #result = wrapper(data)
    except:
        ok = False
    
    if ok:
        return JsonResponse({
            'ok' : 'true',
            'content' : result,
        })
    else:
        return JsonResponse({
            'ok' : 'false',
            'error' : 'bad_data',
            'message' : 'an unknown error has occurred while processing the image',
        })


