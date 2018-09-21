from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('ingredients/', views.IngredientList.as_view()),
    path('ingredients/<str:pk>/', views.IngredientDetail.as_view()),
    path('recipes/', views.RecipeList.as_view()),
    path('recipes/<str:pk>/', views.RecipeDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<str:pk>/', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
