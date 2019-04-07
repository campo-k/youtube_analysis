"""
Django settings for youtube_analysis project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os, json
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

with open(os.path.abspath(__file__ + "/../../..") + "/secrets.json") as f:
    secrets = json.loads(f.read())

def get_secret(str):
    try:
        return secrets[str]
    except KeyError:
        error_msg = "Set the {0} environment variable".format(str)
        raise ImproperlyConfigured(error_msg)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY    = get_secret('SECRET_KEY')
ALLOWED_HOSTS = get_secret('HOSTNAME')
BASE_ENV      = get_secret('ENV_NAME')

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # library app
    'rest_framework',
    'corsheaders',

    # serviced app
    'YT_dashboard',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',      # cors 관련 추가
    'django.middleware.common.CommonMiddleware',  # cors 관련 추가
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_WHITELIST = ('localhost:3000/')       # cors 관련 추가
CORS_ORIGIN_ALLOW_ALL = True                      # cors 관련 추가
CORS_ALLOW_CREDENTIALS = True                     # cors 관련 추가

ROOT_URLCONF = 'youtube_analysis.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'youtube_analysis.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.mysql',
    #     'NAME': get_secret("DATABASE_NAME"),
    #     'USER': get_secret("DATABASE_USER"),
    #     'HOST': get_secret("DATABASE_HOST"),
    #     'PORT': get_secret("DATABASE_PORT"),
    #     'PASSWORD': get_secret("DATABASE_PASS"),
    # }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# CACHES = {
#    "default": {
#        "BACKEND": "django_redis.cache.RedisCache",
#        "LOCATION": "redis://127.0.0.1:6379/0",
#        "OPTIONS": {
#          "CLIENT_CLASS": "django_redis.client.DefaultClient"
#        }
#    }
# }

# CACHES = {
#     "default": {
#         "BACKEND": "redis_cache.RedisCache",
#         "LOCATION": "redis://127.0.0.1:6379/1",
#         "OPTIONS": {
#             "SOCKET_CONNECT_TIMEOUT": 60,  # in seconds
#             "SOCKET_TIMEOUT": 60,  # in seconds
#             "IGNORE_EXCEPTIONS": True,
#             'COMPRESSOR_CLASS': 'redis_cache.compressors.ZLibCompressor',
#             'COMPRESSOR_CLASS_KWARGS': {
#                 'level': 5,  # 0 - 9; 0 - no compression; 1 - fastest, biggest; 9 - slowest, smallest
#             },
#         }
#     }
# }
# DJANGO_REDIS_IGNORE_EXCEPTIONS = True
# DJANGO_REDIS_LOG_IGNORED_EXCEPTIONS = True
# SESSION_ENGINE = "django.contrib.sessions.backends.cache"
# SESSION_CACHE_ALIAS = "default"


# #### Celery CONFIGURATION
# Broker settings.
CELERY_BROKER_URL = get_secret("BROKER_URL")

# Using the database to store task state and results.
CELERY_RESULT_BACKEND = get_secret("CELERY_RESULT_BACKEND")

CELERY_ACCEPT_CONTENT    = ['json']
CELERY_TASK_SERIALIZER   = 'json'
CELERY_RESULT_SERIALIZER = 'json'


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# rest-framework setting
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 'rest_framework.authentication.TokenAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    )
}


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'