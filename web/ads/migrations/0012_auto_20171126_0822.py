# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-11-26 08:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ads', '0011_auto_20171126_0719'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contract',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prints', models.IntegerField()),
                ('ppp_usd', models.FloatField()),
                ('active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('advertisement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Advertisement')),
            ],
        ),
        migrations.CreateModel(
            name='ContractIpRegistry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('contract', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ips', to='ads.Contract')),
            ],
        ),
        migrations.CreateModel(
            name='Ip',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.TextField(max_length=64)),
            ],
        ),
        migrations.RenameField(
            model_name='bidding',
            old_name='price_usd',
            new_name='ppp_usd',
        ),
        migrations.RemoveField(
            model_name='space',
            name='price',
        ),
        migrations.RemoveField(
            model_name='space',
            name='prints',
        ),
        migrations.AddField(
            model_name='contractipregistry',
            name='ip',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Ip'),
        ),
        migrations.AddField(
            model_name='contract',
            name='space',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ads.Space'),
        ),
    ]
