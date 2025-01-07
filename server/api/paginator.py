from rest_framework.pagination import PageNumberPagination

class PostPagination(PageNumberPagination):
    page_size = 5  # Number of posts per page
    page_size_query_param = 'page_size'  # Allows the client to adjust the page size
    max_page_size = 100  # Limit the maximum page size