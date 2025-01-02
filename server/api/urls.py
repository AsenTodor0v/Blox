from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('profile/', UserView.as_view(), name='user'),
    path('register/', RegisterUserView.as_view(), name='register-user'),

    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostDetailUpdateDeleteView.as_view(), name='post-detail'),
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path('categories/', CategoryListView.as_view(), name='category-list-create'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)