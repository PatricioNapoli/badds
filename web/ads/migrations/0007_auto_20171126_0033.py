# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-26 00:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0006_auto_20171126_0022'),
    ]

    operations = [
        migrations.AlterField(
            model_name='space',
            name='application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spaces', to='ads.Application'),
        ),
    ]
