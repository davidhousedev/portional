# Generated by Django 2.1.3 on 2018-11-10 18:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orig_text', models.TextField()),
                ('db_id_text', models.TextField(blank=True)),
                ('order', models.SmallIntegerField()),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False)),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecipeIngredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('scale', models.CharField(blank=True, max_length=20)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False)),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='uses', to='recipe.Ingredient')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_ingredients', to=settings.AUTH_USER_MODEL)),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipe.Recipe')),
            ],
        ),
        migrations.AddField(
            model_name='instruction',
            name='ingredients',
            field=models.ManyToManyField(blank=True, to='recipe.RecipeIngredient'),
        ),
        migrations.AddField(
            model_name='instruction',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructions', to='recipe.Recipe'),
        ),
    ]
