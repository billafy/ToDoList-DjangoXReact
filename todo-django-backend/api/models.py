from django.db import models

# Create your models here.

class Task(models.Model) :
	title = models.CharField(max_length=256)
	completed = models.BooleanField(default=False,blank=True,null=True)
	username = models.CharField(max_length=256)

	def __str__(self) :
		return self.title
