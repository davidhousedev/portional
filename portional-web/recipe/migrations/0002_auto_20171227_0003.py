# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-27 00:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipeingredient',
            name='scale',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]