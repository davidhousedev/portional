from rest_framework import serializers
from rest_framework import permissions
from recipe.models import Recipe, Ingredient, RecipeIngredient
from django.contrib.auth.models import User


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('id', 'name')


class RecipeSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Recipe
        fields = ('created', 'id', 'name', 'owner')


class UserSerializer(serializers.ModelSerializer):
    recipes = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Recipe.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'recipes')
