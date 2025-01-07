from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .paginator import PostPagination

from .models import Post, Category, Comment, Profile
from .serializers import PostSerializer, CategorySerializer, CommentSerializer, RegisterUserSerializer, UserSerializer

# Create your views here.

class UserView(ListAPIView):
    permission_classes = [IsAuthenticated] 
    def get(self, request):
        user = request.user
        data = {
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            
        }
        return Response(data)
    
class UserPosts(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)

class UserUpdateView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.delete()
        return Response({"detail": "Profile deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class RegisterUserView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

class PostListCreateView(ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at') 
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
   # pagination_class = PostPagination

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

class CommentListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

