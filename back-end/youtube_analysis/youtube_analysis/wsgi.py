"""
WSGI config for youtube_analysis project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os, json
from django.core.wsgi import get_wsgi_application
from django.core.exceptions import ImproperlyConfigured

with open(os.path.abspath(__file__ + "/../..") + "/secrets.json") as f:
    secrets = json.loads(f.read())

def get_secret(setting):
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {0} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'youtube_analysis.settings.' + get_secret("ENV_NAME"))

application = get_wsgi_application()
