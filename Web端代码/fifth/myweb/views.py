from django.shortcuts import render
from static.code import delete
from .models import *
from static.fenlei import classify_result
from static.fenlei import jiance

# Create your views here.
def index(request):
    return render(request,'index.html')

def label(request):
    return render(request ,'label.html')

def new2(request):
    return render(request,'new2.html')

def bigdata(request):
    return render(request,'bigdata.html')

def new3(request):
    return render(request,'new3.html')

def causes(request):
    return  render(request,'causes.html')

def new4(request):
    return render(request,'new4.html')

def information(request):
    return render(request,'information.html')

def shibie(request):
    return render(request,'shibie.html')

def new5(request):
    delete.del_file(r'D:\Python\fifth\static\fenlei\crop')
    delete.del_file(r'D:\Python\fifth\static\fenlei\result')
    if request.method=='GET':
        return render(request,'new5.html')
    else:
        pic = request.FILES.get('picture')
        # url = settings.MEDIA_ROOT + 'images/' + pic.name

        # 1. 创建Model对象，保存图片路径到数据库
        model = PictureModel()
        # model.pic_url = pic.name
        model.pic_url = pic.name
        model.save()

        # delete.DeleteFiles(r'D:\Python\ftd_fourth\static\fenge\result').delete_files()

        # 2. 开始处理图片，将图片写入到指定目录。(/static/media/images/)
        # 拼接图片路径
        url = './static/media/' + 'images/' + 'test.jpg'
        with open(url, 'wb') as f:
            # pic.chunks()循环读取图片内容，每次只从本地磁盘读取一部分图片内容，加载到内存中，并将这一部分内容写入到目录下，写完以后，内存清空；下一次再从本地磁盘读取一部分数据放入内存。就是为了节省内存空间。
            for data in pic.chunks():
                f.write(data)
        # delete.DeleteFiles(r'D:\Python\ftd_fourth\static\fenge\crop').delete_files()
        # delete.DeleteFiles(r'D:\Python\ftd_fourth\static\fenge\result').delete_files()
        return render(request, 'show.html')

def show(request):
    if request.method=='GET':
        return render(request,'show.html')
    else:
        test = request.POST.get('select')
        area = request.POST.get('a')
        size = request.POST.get('b')
        if area == '':
            area = 900
        else:
            area = int(area)
        if size == '':
            size = 5
        else:
            size = int(size)
        result = classify_result.all_classify('D:/Python/fifth/static/media/images/test.jpg')
        if test == 'single':
            # result = classify_result.classify('./static/media/images/test.jpg')
            # return render(request,'show.html')

            # result='yzh'
            # print(result)
            return render(request, 'show.html', {"result": result})
        else:
            # print(result)
            jiance.jiance('./static/media/images/test.jpg',size,area)
            return render(request, 'show.html',{"result":result})

