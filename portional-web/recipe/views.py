from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets

from recipe.models import Ingredient, Recipe, RecipeIngredient
from recipe.serializers import (
    IngredientSerializer,
    RecipeIngredientSerializer,
    RecipeSerializer,
    UserSerializer,
)
from recipe.permissions import IsOwnerOrReadOnly


class IngredientViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RecipeIngredientViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    queryset = RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
