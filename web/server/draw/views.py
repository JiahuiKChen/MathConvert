from django.shortcuts import render

import os
BUILD_DIR = '../build'

from fancy import wrapper

# Create your views here.

def index(request):
    path = os.path.join(BUILD_DIR, request.path)
    if os.path.exists(path):
        template = loader.get_template(path)
    else:
        template = loader.get_template(os.path.join(BUILD_DIR, "index.html"))
    return HttpResponse(template.render())

def api(request):
    ok = true
    result = ""
    try:
        result = wrapper(data)
    except:
        ok = false
    
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


