from rest_framework import mixins, serializers
from recipe import models
from django.contrib.auth.models import User

#
# class OwnerFieldMixin(serializers.ModelSerializer):
#     owner = serializers.HyperlinkedRelatedField(
#         view_name='user-detail', read_only=True
#     )
#
#     def validate_owner(self, value):
#         req = self.context['request']


class IngredientSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = models.Ingredient
        fields = '__all__'


class RecipeIngredientSerializer(serializers.HyperlinkedModelSerializer):
    ingredient = serializers.SlugRelatedField(
        slug_field='name',
        queryset=models.Ingredient.objects.all())
    recipe = serializers.HyperlinkedRelatedField(
        view_name='recipe-detail',
        queryset=models.Recipe.objects.all())

    class Meta:
        model = models.RecipeIngredient
        exclude = ('owner',)


class NestedRecipeIngredientSerializer(RecipeIngredientSerializer):
    recipe = None

    class Meta:
        model = models.RecipeIngredient
        exclude = ('owner', 'recipe',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    recipes = serializers.HyperlinkedRelatedField(
        many=True, view_name='recipe-detail', read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Equipment
        fields = '__all__'


class InstructionSerializer(serializers.HyperlinkedModelSerializer):
    recipe = serializers.HyperlinkedRelatedField(
        view_name='recipe-detail',
        queryset=models.Recipe.objects.all())
    ingredients = serializers.HyperlinkedRelatedField(
        view_name='recipeingredient-detail',
        queryset=models.RecipeIngredient.objects.all(),
        many=True)
    equipment = serializers.SlugRelatedField(
        slug_field='name',
        queryset=models.Equipment.objects.all(),
        many=True)
    class Meta:
        model = models.Instruction
        fields = '__all__'


class NestedInstructionSerializer(InstructionSerializer):
    recipe = None

    class Meta:
        model = models.Instruction
        exclude = ('recipe',)


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(
        view_name='user-detail', read_only=True
    )
    ingredients = NestedRecipeIngredientSerializer(
        read_only=True,
        many=True)
    instructions = NestedInstructionSerializer(
        read_only=True,
        many=True)

    class Meta:
        model = models.Recipe
        fields = '__all__'
