from django.urls import reverse
from django.http import HttpResponseRedirect


def index(request):
    if 'NEXT' in request.GET:
        next_page = request.GET['NEXT']
        return HttpResponseRedirect(next_page)

    else:
        return HttpResponseRedirect(reverse('YT-dashboard:dashboard'))