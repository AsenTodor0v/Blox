from django.contrib import admin
from .models import Post, Category, Comment, Profile

# Register your models here.

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'content', 'created_at')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):    
    list_display = ['user', 'bio', 'profile_picture']