import pytest
from django.contrib.auth.models import User
from django.conf import settings

from ..models import (
    Recipe, RecipeIngredient, Ingredient, Instruction
)

BEEF_KEY = 'beef'
BUN_KEY = 'bun'
INGREDIENT_MAP = {
    BEEF_KEY: 'Beef',
    BUN_KEY: 'Bun',
}


@pytest.fixture
def ingredients(db):
    ings = {
        ing_key: Ingredient(orig_name=ing_name)
        for ing_key, ing_name in INGREDIENT_MAP.items()
    }
    for ing in ings.values():
        ing.save()

    return ings


@pytest.fixture
def recipe(db):
    user = User()
    user.save()

    rec = Recipe(name='Hamburger',
                 imported_by=user)
    rec.save()

    return rec


@pytest.fixture
def recipe_ingredients(db, recipe, ingredients):
    beef_rec_ing = RecipeIngredient(
        ingredient=ingredients[BEEF_KEY],
        amount=0.5,
        scale='lbs',
        recipe=recipe)
    bun_rec_ing = RecipeIngredient(
        ingredient=ingredients[BUN_KEY],
        amount=1,
        recipe=recipe)

    beef_rec_ing.save()
    bun_rec_ing.save()

    return {
        BEEF_KEY: beef_rec_ing,
        BUN_KEY: bun_rec_ing
    }


@pytest.fixture
def instructions(db, recipe, recipe_ingredients):
    beef_db_id = f'{settings.DB_ID_PREFIX}{recipe_ingredients[BEEF_KEY].id}'
    bun_db_id = f'{settings.DB_ID_PREFIX}{recipe_ingredients[BUN_KEY].id}'

    inst_1 = Instruction(
        orig_text='Grill burger to taste.',
        db_id_text=f'Grill {{{beef_db_id}}} '
                   f'to taste.',
        order=1,
        recipe=recipe)
    inst_2 = Instruction(
        orig_text='Place burger within toasted bun.',
        db_id_text=f'Place {{{beef_db_id}}} '
                   f'within toasted '
                   f'{{{bun_db_id}}}.',
        order=2,
        recipe=recipe)
    inst_3 = Instruction(
        orig_text='Serve immediately with your choice of '
                  'condiments.',
        db_id_text=f'Serve immediately with your choice of '
                  'condiments.',
        order=3,
        recipe=recipe)

    insts = [inst_1, inst_2, inst_3]
    for inst in insts:
        inst.save()

    inst_1.ingredients = (recipe_ingredients[BEEF_KEY],)
    inst_2.ingredients = (
        recipe_ingredients[BEEF_KEY],
        recipe_ingredients[BUN_KEY],
    )
    for inst in insts:
        inst.save()

    return insts


@pytest.fixture
def hamburger_recipe(db, recipe, instructions):
    """Ensure that all db objects are created prior to beginning tests."""
    return recipe
