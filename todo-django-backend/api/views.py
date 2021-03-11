from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import TaskSerializer
from api.models import Task
# Create your views here.

@api_view(['GET'])
def apiOverview(request) :
	api_urls = {
		'List' : '/task-list/',
		'Detailed' : '/<int:id>/',
		'Create' : '/task-create/',
		'Update' : '/<int:id>/update/',
		'Delete' : '/<int:id>/delete/',
	}
	return Response(api_urls)

@api_view(['GET'])
def taskListView(request) :
	tasks = Task.objects.all()
	serializer = TaskSerializer(tasks, many=True)
	return Response(serializer.data)

@api_view(['GET'])
def taskDetailedView(request, id) :
	try :
		task = Task.objects.get(id=id)
	except:
		return Response(False)
	serializer = TaskSerializer(task, many=False)
	return Response(serializer.data)

@api_view(['POST'])
def taskCreateView(request) :
	serializer = TaskSerializer(data=request.data)
	if serializer.is_valid() :
		serializer.save()
	return Response(serializer.data)

@api_view(['POST'])
def taskUpdateView(request, id) :
	try :
		task = Task.objects.get(id=id)
	except:
		return Response(False)
	serializer = TaskSerializer(instance=task, data=request.data)
	if serializer.is_valid() :
		serializer.save()
	return Response(serializer.data)

@api_view(['GET'])
def taskDeleteView(request, id) :
	try :
		task = Task.objects.get(id=id)
	except:
		return Response(False)
	task.delete()
	return Response(True)
