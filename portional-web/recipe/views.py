import logging

from django.contrib.auth.models import User
from rest_framework import generics, permissions, viewsets

from recipe import models
from recipe.serializers import (
    IngredientSerializer,
    RecipeIngredientSerializer,
    RecipeSerializer,
    UserSerializer,
    EquipmentSerializer,
    InstructionSerializer,
)
from recipe.permissions import IsOwnerOrReadOnly

logger = logging.getLogger(__name__)


class IngredientViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    queryset = models.Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RecipeIngredientViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    queryset = models.RecipeIngredient.objects.all()
    serializer_class = RecipeIngredientSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EquipmentViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.Equipment.objects.all()
    serializer_class = EquipmentSerializer


class InstructionViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = models.Instruction.objects.all()
    serializer_class = InstructionSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
