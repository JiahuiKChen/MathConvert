from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import MNISTpredict

current_image = 0

@csrf_exempt
def api(request):
    global current_image

    try:
        next_name = "image_" + str(current_image) + ".png"
        current_image += 1
        MNISTpredict.save(request.FILES['file[]'], next_name)
        result = MNISTpredict.evaluate(next_name)

        return JsonResponse({
            'ok': True,
            'content': {'letter': result},
        })
    except Exception:
        return JsonResponse({
            'ok': False,
            'error': 'no_match',
            'message': "There was no match for the drawn character.",
        })
