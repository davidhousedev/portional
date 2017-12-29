import uuid

from django.db import models
from django.contrib.auth.models import User


class UUIDModel(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)


class Recipe(UUIDModel):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    imported_by = models.ForeignKey(User,
                                    on_delete=models.CASCADE,
                                    related_name='imported_recipes')

    def __str__(self):
        return f'{self.name}'


class Ingredient(UUIDModel):
    orig_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f'{self.orig_name}'


class RecipeIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient,
                                   on_delete=models.CASCADE,
                                   related_name='uses')
    amount = models.FloatField()
    scale = models.CharField(max_length=20, blank=True)
    recipe = models.ForeignKey(Recipe,
                               on_delete=models.CASCADE,
                               related_name='ingredients')

    def __str__(self):
        return f'{self.amount} {self.scale} {self.ingredient}'

    def __repr__(self):
        return f'Recipe Ingredient: {self} used in {self.recipe}'


class Instruction(models.Model):
    orig_text = models.TextField()
    db_id_text = models.TextField(blank=True)
    order = models.SmallIntegerField()
    recipe = models.ForeignKey(Recipe,
                               on_delete=models.CASCADE,
                               related_name='instructions')
    ingredients = models.ManyToManyField(RecipeIngredient, blank=True)

    def compile(self, prefix='', suffix=''):
        if not self.ingredients.all():
            return  self.orig_text  # No compilation required
        ingredient_id_map = {
            ing.id: f'{prefix}{str(ing)}{suffix}'
            for ing in self.ingredients.all()
        }
        self.db_id_text = self.db_id_text.format(**ingredient_id_map)
        return self.db_id_text

    def __str__(self):
        return f'{self.recipe} {self.order}: {self.orig_text}'


class Author(models.Model):
    pass
