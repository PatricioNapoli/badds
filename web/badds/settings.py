"""
Django settings for badds project.

Generated by 'django-admin startproject' using Django 1.11.2.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

from celery.schedules import crontab
import mercadopago

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.environ.get("SECRET", 'z6zc!v@(a*nl^+5(@#5$h7hl%ocw%1synqij%v*pwc-j5n#vqt')

DEBUG = "DEBUG" in os.environ

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'landing',
    'ads',
    'rest_framework',
    'corsheaders'
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'ads.rest_permissions.IsAuthenticatedAndEmailConfirmed',
        #'rest_framework.permissions.AllowAny',
    ]
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

#CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'badds.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')]
        ,
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

WSGI_APPLICATION = 'badds.wsgi.application'

if "DEV" in os.environ:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': "badds",
            'USER': os.environ['POSTGRES_USER'],
            'HOST': 'localhost',
            'PORT': '5432'
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': "badds",
            'USER': os.environ['POSTGRES_USER'],
            'PASSWORD': os.environ['POSTGRES_PASSWORD'],
            'HOST': 'postgres',
            'PORT': '5432'
        }
    }

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

LANGUAGE_CODE = 'es-AR'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

EMAIL_USE_TLS = True
EMAIL_HOST = 'mail.privateemail.com'
EMAIL_HOST_USER = 'admin@geminis.io'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASSWORD', None)
EMAIL_PORT = 587

CELERY_BROKER_URL = 'redis://redis:6379'
CELERY_RESULT_BACKEND = 'redis://redis:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

CELERY_BEAT_SCHEDULE = {
    'contracts': {
        'task': 'ads.tasks.check_contracts_end',
        'schedule': crontab()
    },
    'auctions': {
        'task': 'ads.tasks.check_auctions_end',
        'schedule': crontab()
    }
}

STATIC_URL = '/static/'

if "DEV" in os.environ:
    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, "static/"),
    )
else:
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

IPSTACK_KEY = os.environ.get("IPSTACK_KEY", None)

CAPTCHA_SECRET = os.environ.get("CAPTCHA_SECRET", None)

MP = mercadopago.MP(os.environ.get("MP_CLIENT", None), os.environ.get("MP_SECRET", None))
MP.sandbox_mode(enable=True)
