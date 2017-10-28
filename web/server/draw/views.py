from django.shortcuts import render
from django.template import Context, loader
from django.http import HttpResponse, JsonResponse, HttpResponseNotFound
from django.contrib.staticfiles.views import serve
from config import settings
from . import MNISTpredict
from django.views.decorators.csrf import csrf_exempt

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

count = 0

@csrf_exempt
def api(request):
    global count

    ok = True
    message = "no error"
    result = ""
    try:
        next_name = "im_data_" + str(count)
        count += 1
        #result = wrapper(data)
        MNISTpredict.save(request.FILES['file[]'], next_name)
        result = MNISTpredict.evaluate(next_name)
    except Exception as e:
        ok = False
        message = str(type(e)) + str(e)
    
    if ok:
        return JsonResponse({
            'ok' : 'true',
            'content' : { 'letter': result },
        })
    else:
        return JsonResponse({
            'ok' : 'false',
            'error' : 'noooooo',
            'message' : message,
        })


