**织布匹表面瑕疵识别系统**

作品演示： 
     ![image](https://user-images.githubusercontent.com/30195788/158136535-4fb91aa3-4409-4c73-801c-76dac9f3edc5.png)
     图1目标检测结果
 ![image](https://user-images.githubusercontent.com/30195788/158136553-7126a374-dcd7-415e-bc4a-42413b69346c.png)
图2瑕疵分类结果
注：QT:其他瑕疵  YW：油污
作品简介：
本团队基于计算机视觉的目标检测技术和深度学习中的残差神经网络设计开发了一套慧眼布匹瑕疵识别系统, 该系统功能主要包括以下模块：

（1）在线数据集打标
在布匹瑕疵识别系统界面中设立在线数据集打标模块，可以实现多用户在线对数据库中的布匹图片进行人工打标，系统自动存储各用户的标注图像并进行分析处理，选择绝大数用户标定的瑕疵类型作为该瑕疵的实际类型并更新至标签数据集中。

（2）瑕疵目标检测
使用计算机视觉技术对布匹图像进行处理，考虑光照不均、噪声干扰等因素，采用自适应直方图均衡法和中值滤波法进行光照校正和去噪，局部阈值分割法和区域生长法对瑕疵目标进行检测并分割。

（3）瑕疵分类
使用残差神经网络（Resnet）对分割的瑕疵区域图像进行分类。
残差神经网络是在卷积神经网络的基础上发展起来的一种应用于更深层次网络结构的深度学习模型。该模型解决了随着网络层数增加梯度消失导致准确率下降的弊端。本项目设计了单分类器和多分类器两种分类器，都采用152层的残差神经网络模型训练，其中单分类器主要实现对整张布匹图片快速地进行检测，判断其是否有瑕疵或主要瑕疵是什么，而多分类器则输入的是目标检测的分割图像，输出单个区域的布匹瑕疵类型和区域，可以实现存在多种瑕疵的单张图像的精确检测与定位功能。

（3）参数可调
在图像预处理和目标检测等环节有许多参数需要根据实际生产需要调节，以获得用户所需要的检测效果。因此，在系统功能界面设置参数设置窗口，用户可以修改滤波孔径和瑕疵面积两个参数来优化瑕点的检测和分类。

（4）数据挖掘
数据挖掘可以从大量的、模糊的实际数据中提取隐含其内的、人们实现所不知的，但又有潜在价值的信息和知识。本系统自动对每次布匹瑕疵识别的结果进行记录，保存至数据库中。数据挖掘模块将对记录信息进行大数据统计和可视化分析，从产品类别、产品规格、织机类别和瑕疵类型等方面挖掘重要的能够反映生产现状的信息，以支持决策者或技术人员作出有效的解决方案。





安装说明：
1.	程序核心组件
Python3
CUDA 8
CuDNN 6
Tensorflow 1.4.0
Djgango2.2.2
Anaconda3
Opencv-python3.4.2.16
Pymysql0.9.3
2.	开发环境配置流程
1)	安装Anaconda3
访问Python官网：https://www.anaconda.com，根据具体系统下载安装Anaconda3，安装过程可参考官方文档。
2)	安装 CUDA 8 与 cuDNN 6
如配有Nvidia系列显卡可参考本部分进行安装配置。
访问CUDA8下载页面https://developer.nvidia.com/cuda-80-download-archive，根据具体系统下载安装CUDA8.0。windows下建议安装exe[local]版本，ubuntu下建议安装deb[local]版本，其他系统环境参照官方手册进行安装。
访问https://developer.nvidia.com/cudnn，下载根据安装的CUDA版本下载安装cuDNN6。具体安装过程参考官方文档：
https://docs.nvidia.com/deeplearning/sdk/cudnn-install/index.html 。
3)	安装Python具体依赖包
Tensorflow 1.4.0
Djgango2.2.2
Anaconda3
Opencv-python3.4.2.16
Pymysql0.9.3
Matplotlib3.1.0
Pillow6.0.0
Numpy1.16.3
3.	Django-Web框架安装配置流程
1）启动数据库
使用win+R打开运行，输入services.msc，找到自己设置的mysql数据库的名称，然后启动数据库服务。
2）运行Web框架
在pycharm专业版中打开该工程文件，点击下方窗口中的Terminal，进入命令行，在命令行中输入python manage.py runserver 启动服务器。
3）软件使用
打开浏览器，输入 http://127.0.0.1:8000/index.html进入起始界面。
演示效果：
![image](https://user-images.githubusercontent.com/30195788/158136638-d3b7cdee-404c-44a0-8711-2eccf1d75965.png)
 
图3慧眼系统首页
       ![image](https://user-images.githubusercontent.com/30195788/158136660-ac319863-0262-4b71-8ad5-26826ea7a093.png)
图4在线打标界面
 ![image](https://user-images.githubusercontent.com/30195788/158136686-e17c6751-b1de-4ec5-843e-48133ee39276.png)
图5在线打标选择界面
![image](https://user-images.githubusercontent.com/30195788/158136728-ffb1153c-03d4-41cc-861c-b6ebaad4b129.png)
图6瑕疵样例及解释
![image](https://user-images.githubusercontent.com/30195788/158136763-d5368d1d-7fc8-4458-97be-bb5631b7b4b3.png)
图7选择待检图像
![image](https://user-images.githubusercontent.com/30195788/158136795-e25689a7-422c-4ffb-ad43-8a7a912e2442.png)
图8瑕疵识别结果

设计思路：
近年来，深度学习得到了前所未有的发展，自卷积神经网络在图像识别领域取得重大成果以来，各种网络架构更是层出不穷，为应对复杂的实际应用问题，网络模型也是越来越深，但是网络越深梯度消失的现象也就越明显，网络的训练效果也不会很好，而当前发展起来的残差神经网络ResNet很好的解决了这一问题。除此之外，传统的图像处理技术也在近年来得到了长足的发展，目标检测更是当前计算机视觉和机器学习领域的研究热点，目标检测技术显然将很好地应用于实际生产生活中来。基于此，本团队基于计算机视觉的目标检测技术和深度学习中的残差神经网络开发的新一代的智能化的纺织布匹表面瑕疵识别系统将大大减轻人工检测的劳动强度，提高生产过程织物质量监控的效率和精度，且结合大数据进行数据挖掘工作可以为决策者提供重要的布匹生产过程信息。
我们设计作品的思路如下：
（1）在线数据集打标
在线数据集打标功能为自制监督学习数据库所设计，在布匹瑕疵识别系统界面中用户可在线对数据集进行打标，数据滚动刷新，且支持多用户同时在线打标，系统自动存储各用户的标注图像并进行分析处理，选择绝大数用户标定的瑕疵类型作为该瑕疵的实际类型并更新至标签数据集中。
（2）瑕疵目标检测
该功能实现对布匹图像进行瑕疵的检测和定位功能，并将同一图像的不同瑕疵区域分割出来保存至数据库中，以便进行后续的分类处理。该过程主要分为图像预处理、瑕疵目标检测和瑕疵区域分割三个步骤，图像预处理采用自适应直方图均衡法对布匹图像进行光照校正和图像增强，再运用中值滤波去除图像噪声。通过局部阈值分割法将瑕疵区域二值化显现出来，再进行轮廓提取等操作，完成瑕疵区域的定位和分割。
（3）瑕疵分类
瑕疵分类模块使用残差神经网络（Resnet）对分割的瑕疵区域图像进行分类。分为三个主要过程：数据预处理、残差网络训练、验证调参。先对原始数据进行归一化、训练集测试集划分、格式转换等操作，再设计残差网络结构模型和参数，继而喂入处理好的大量标签数据进行训练，不断对训练结果进行验证和调节参数，直至满足要求，再将训练模型持久化为分类函数，实时对布匹瑕疵图像进行分类。
（4）参数可调
参数可调功能实现用户可以通过修改滤波孔径和瑕疵面积两个参数来优化瑕点的检测和分类。该模块通过在系统功能界面设置参数修改窗口，用户通过设置滤波孔径和瑕疵面积传入函数参数来实现优化过程。
（5）数据挖掘
数据挖掘功能可以从大量的瑕疵识别数据中提取隐含其内的但又有潜在价值的信息和知识。本系统自动对每次布匹瑕疵识别的结果进行记录，保存至数据库中。数据挖掘模块将对记录信息进行大数据统计和可视化分析，从产品类别、产品规格、织机类别和瑕疵类型等方面挖掘重要的能够反映生产现状的信息，以支持决策者或技术人员作出有效的解决方案。
设计重点与难点：
本团队基于目标检测技术和深度学习技术设计开发的纺织布匹瑕疵识别系统主要依赖于目标检测和瑕疵分类两大部分。其中目标检测算法往往容易受到噪声干扰，检测结果不稳定，目标区域的定位也难以达到高精度。而目前的瑕疵分类算法主要采用支持向量机等传统机器学习方法，分类效果受到限制，难以达到理想的检测效果。
本团队对这两个领域的相关算法进行了研究、分析和整合，采用机器视觉和深度学习结合的方法实现瑕疵识别。最终实现两大核心功能模块：基于计算机视觉算法的瑕疵目标检测和基于残差卷积神经网络ResNet算法的瑕疵分类。
本项目的设计重点与难点在于瑕疵的检测效果、定位精度、分类准确度以及检测速度。需要遵循以下原则：

（1）准确性
“布匹瑕疵识别系统”预期的瑕疵检测检出率应高于90%，瑕疵定位精度应在20像素以内，瑕疵分类准确率应高于90%，

（2）快速性
“布匹瑕疵识别系统”预期的瑕疵检测速度应快于5秒/张。

（3）操作简便性
“布匹瑕疵识别系统”的界面操作设计应本着操作便捷、人性化的原则，使用户在最短时间内对软件运用娴熟。

（5）界面美观性
“布匹瑕疵识别系统”的界面配色、字体搭配应符合大众审美，尽量清爽美观，给用户舒适的视觉体验。

为此，我们对待检图像进行光照校正、中值滤波等预处理操作，最小化降低光照不均和噪声干扰的影响。设计了区域生长算法，对邻近小瑕疵进行合并，最后分割出独立的瑕疵区域块。此外，分类模型采用152层的残差网络，并设计了单分类器和多分类器两种适用于不同场合的分类器。其中单分类器实现输入整张瑕疵图像输出是否存在瑕疵，若存在输出主要瑕疵类型。多分类器则是对目标检测分割出的瑕疵区域图像进行分类，给出其精确的瑕疵类型，配合目标检测模型，可以通过多次调用多分类器实现对包含多种瑕疵的整张布匹图像的精确识别。因此，单分类器检测速度较快，适用于用户主要关注布匹是否有瑕疵的场景，对具体有多少种瑕疵以及瑕疵位置不作要求。而多分类器则能够精确地检测定位并且分类出一张布匹图像中的各个瑕疵。

硬件环境
纺织布匹表面瑕疵识别系统的基本运行环境如下所示：
（1）操作系统Windows 7/8/10 (x86, x64)
（2）内存4.0G以上
纺织布匹表面瑕疵识别系统残差网络训练算法的基本运行环境如下所示：
（1）操作系统Ubuntu16.04
（2）GTX显卡（本系统单1080Ti）
（3）CPU(本系统16核v3)
软件环境
1.	程序核心组件
Python3
CUDA 8
CuDNN 6
Tensorflow 1.4.0
Djgango2.2.2
Anaconda3
Opencv-python3.4.2.16
Pymysql0.9.3
2.	开发环境配置流程
1)	安装Anaconda3
访问Python官网：https://www.anaconda.com，根据具体系统下载安装Anaconda3，安装过程请参考官方文档。
2)	安装 CUDA 8 与 cuDNN 6
如配有Nvidia系列显卡可参考本部分进行安装配置。访问CUDA8下载页面https://developer.nvidia.com/cuda-80-download-archive，根据具体系统下载安装CUDA8.0。windows下建议安装exe[local]版本，ubuntu下建议安装deb[local]版本，其他系统环境参照官方手册进行安装。
访问https://developer.nvidia.com/cudnn，下载根据安装的CUDA版本下载安装cuDNN6。具体安装过程参考官方文档：
https://docs.nvidia.com/deeplearning/sdk/cudnn-install/index.html。
3)	安装Python具体依赖包
Tensorflow 1.4.0
Djgango2.2.2
Anaconda3
Opencv-python3.4.2.16
Pymysql0.9.3
Matplotlib3.1.0
Pillow6.0.0
Numpy1.16.3
3.	Django-Web项目框架配置使用流程
1）启动数据库
使用win+R打开运行，输入services.msc，找到自己设置的mysql数据库的名称，然后启动数据库服务。
2）运行Web框架
在pycharm专业版中打开该工程文件，点击下方窗口中的Terminal，进入命令行，在命令行中输入python manage.py runserver 启动服务器。
3）软件使用
打开浏览器，输入 http://127.0.0.1:8000/index.html进入软件操作界面。4）功能介绍
点击左边导航栏中布匹瑕疵识别，按照右边页面显示，点击按钮上传本地图片，点击上传后，将进入识别功能界面，根据下拉框选择单分类和多分类，另外，在进行多分类时，可以通过调节面积大小和滤波孔径来忽略小的瑕疵的影响。点击确定之后可以输出单分类的显示结果，以及输出对图片中各个瑕疵的检测和定位结果。点击返回按钮，可以回到上传图片页面进行下一次的布匹瑕疵识别。对于在线布匹标记模块，用户通过点击进入，点开图片会有一个响应框，选择下拉框中的选项，点击确定即可对图片进行打标。对于大数据分析模块与成因追踪模块，大数据分析模块是针对某种类别布匹出现的瑕疵所展示的饼状图，该数据于数据库相连接，实时更新，有助于企业分析布匹生产过程中可能出现的问题，并能够有效地针对解决。成因追踪模块主要分析了瑕疵的特点和瑕疵产生的原因，能够有效地给企业在生产过程中提供重要信息 




