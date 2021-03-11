from django.urls import path
from api.views import apiOverview, taskListView, taskDetailedView, taskCreateView, taskUpdateView, taskDeleteView

urlpatterns = [
	path('',apiOverview,name='API-Overview'),
	path('task-list/',taskListView,name='TaskList'),
	path('<int:id>/',taskDetailedView,name='TaskDetailed'),
	path('task-create/',taskCreateView,name='TaskCreate'),
	path('<int:id>/task-update/',taskUpdateView,name='TaskUpdate'),
	path('<int:id>/task-delete/',taskDeleteView,name='TaskDelete'),
]
