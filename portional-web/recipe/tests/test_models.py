import uuid

import pytest

from ..models import (
    Recipe, RecipeIngredient, Ingredient, Instruction
)


@pytest.mark.django_db
class TestRecipeModels:

    def test_recipe_interface(self, hamburger_recipe):
        """Ensure that Recipe db model has the expected interface."""
        assert isinstance(hamburger_recipe.name, str)
        assert isinstance(hamburger_recipe.id, type(uuid.uuid4()))
        assert hamburger_recipe.ingredients.all()
        assert hamburger_recipe.instructions.all()

    def test_recipe_ingredient_interface(self, recipe_ingredients):
        """Ensure that RecipeIngredient db model has the expected interface."""
        for ingredient in recipe_ingredients.values():
            assert ingredient.ingredient
            assert ingredient.amount
            assert isinstance(ingredient.scale, str)
            assert ingredient.recipe

    def test_ingredient_interface(self, ingredients, recipe_ingredients):
        """Ensure that Ingredient db model has the expected interface."""
        for ingredient in ingredients.values():
            assert isinstance(ingredient.id, type(uuid.uuid4()))
            assert ingredient.orig_name
            assert ingredient.uses

    def test_instruction_interface(self, instructions):
        for instruction in instructions:
            assert instruction.orig_text
            assert instruction.db_id_text
            assert instruction.order
            assert instruction.recipe

    def test_instruction_compile(self, instructions):
        for instruction in instructions:
            instruction.compile('<b>', '</b>')
            for rec_ing in instruction.ingredients.all():
                assert str(rec_ing.ingredient) in instruction.db_id_text
