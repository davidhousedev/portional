# Generated by Django 2.1.3 on 2018-11-12 02:15

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
            name='Equipment',
            fields=[
                ('name', models.CharField(max_length=100, unique=True)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('name', models.CharField(max_length=100, unique=True)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Instruction',
            fields=[
                ('text', models.TextField()),
                ('order', models.SmallIntegerField()),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('equipment', models.ManyToManyField(blank=True, to='recipe.Equipment')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('name', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RecipeIngredient',
            fields=[
                ('amount', models.FloatField()),
                ('scale', models.CharField(blank=True, max_length=20)),
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('ingredient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='uses', to='recipe.Ingredient')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipe_ingredients', to=settings.AUTH_USER_MODEL)),
                ('recipeSchema', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ingredients', to='recipe.Recipe')),
            ],
        ),
        migrations.AddField(
            model_name='instruction',
            name='ingredients',
            field=models.ManyToManyField(blank=True, to='recipe.RecipeIngredient'),
        ),
        migrations.AddField(
            model_name='instruction',
            name='recipeSchema',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructions', to='recipe.Recipe'),
        ),
    ]
