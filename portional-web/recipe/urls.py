from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'recipes', views.RecipeViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'recipe_ingredient', views.RecipeIngredientViewSet)
router.register(r'ingredient', views.IngredientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# urlpatterns = [
#     path('ingredients/',
#          views.IngredientList.as_view(),
#          name='ingredients-list'),
#     path('ingredients/<str:pk>/',
#          views.IngredientDetail.as_view(),
#          name='ingredients-detail'),
#     path('recipes/', views.RecipeList.as_view(), name='recipe-list'),
#     path('recipes/<str:pk>/',
#          views.RecipeDetail.as_view(),
#          name='recipe-detail'),
#     path('users/', views.UserList.as_view(), name='user-list'),
#     path('users/<str:pk>/', views.UserDetail.as_view(), name='user-detail'),
#     path('', views.api_root),
# ]
#
# urlpatterns = format_suffix_patterns(urlpatterns)
