from django.shortcuts import render
from django.template import Context, loader
from django.http import HttpResponse, JsonResponse
from django.contrib.staticfiles.views import serve
from config import settings

import os
BUILD_DIR = 'draw'

#from fancy import wrapper

# Create your views here.

def index(request):
    path = os.path.join(BUILD_DIR, request.path.lstrip(os.path.sep))
    if not (os.path.exists(path) and os.path.isfile(path)):
        path = os.path.join(BUILD_DIR, "index.html")
    
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


