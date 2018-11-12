import uuid

from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User,
                              on_delete=models.CASCADE,
                              related_name='recipes')
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False,
                           primary_key=True)

    def __str__(self):
        return f'{self.name}'


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False,
                           primary_key=True)

    def __str__(self):
        return f'{self.name}'


class RecipeIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient,
                                   on_delete=models.CASCADE,
                                   related_name='uses')
    amount = models.FloatField()
    owner = models.ForeignKey(User,
                              on_delete=models.CASCADE,
                              related_name='recipe_ingredients')
    scale = models.CharField(max_length=20, blank=True)
    recipe = models.ForeignKey(Recipe,
                               on_delete=models.CASCADE,
                               related_name='ingredients')
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False,
                           primary_key=True)

    def __str__(self):
        return f'{self.quantity or self.volume} ' \
               f'{self.ingredient}'

    def __repr__(self):
        return f'Recipe Ingredient: {self} used in {self.recipe}'


class Equipment(models.Model):
    name = models.CharField(max_length=100, unique=True)
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False,
                           primary_key=True)


class Instruction(models.Model):
    text = models.TextField()
    order = models.SmallIntegerField()
    recipe = models.ForeignKey(Recipe,
                               on_delete=models.CASCADE,
                               related_name='instructions')
    ingredients = models.ManyToManyField(RecipeIngredient, blank=True)
    equipment = models.ManyToManyField(Equipment, blank=True)
    uid = models.UUIDField(default=uuid.uuid4,
                           editable=False,
                           primary_key=True)

    def __str__(self):
        return f'{self.order}: {self.text}'

    def __repr__(self):
        return f'Instruction: {self}. ' \
               f'Ingredients: {self.ingredients}. ' \
               f'Equipment: {self.equipment}. ' \
               f'Recipe: {self.recipe}'
