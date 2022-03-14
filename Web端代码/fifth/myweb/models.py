# coding=utf-8
from django.db import models

# Create your models here.
class PictureModel(models.Model):
    pic_url=models.ImageField()
    class Meta:
        db_table='picture'

class Cloth_Type(models.Model):
    mark=models.CharField(max_length=20)
    name=models.CharField(max_length=40)
    class Meta:
        db_table='cloth_type'

class Fault_Tpye(models.Model):
    mark=models.CharField(max_length=20)
    name=models.CharField(max_length=40)
    class Meta:
        db_table='fault_type'

class fault_num(models.Model):
    cloth_mark=models.CharField(max_length=20)
    fault_mark=models.CharField(max_length=20)
    num=models.IntegerField()
    class Meta:
        db_table='fault_num'

