# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-25 21:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ads', '0002_auto_20171031_2203'),
    ]

    operations = [
        migrations.CreateModel(
            name='Advertisement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=256)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.TextField(max_length=256)),
                ('data_type', models.TextField(max_length=8)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('advertisment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='ads.Advertisement')),
            ],
        ),
        migrations.RenameModel(
            old_name='SpaceCategory',
            new_name='AdvertisementCategory',
        ),
        migrations.AddField(
            model_name='auction',
            name='status',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='ads.AuctionStatus'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='advertisement',
            name='advertisement_category',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='ads.AdvertisementCategory'),
        ),
        migrations.AddField(
            model_name='advertisement',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]