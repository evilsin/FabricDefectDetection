该文件夹下代码实现残差神经网络的数据预处理、训练、测试、持久化模型；
fenge_result.py为目标检测函数，实现对布匹图像的瑕疵检测与定位，并进行分割；
qysz.py:为fenge_result.py的子函数，实现区域生长功能
crop:存储目标检测算法分割出来的图像，每次检测会进行更新
resnet_v1.py；为使用的残差神经网络模型
其中all_classify_net_train文件夹下是训练全分类器代码及结果，该全分类器输入为整张布匹图像，快速给出输出是否有缺陷或主要缺陷的全分类器；
其中sigle_classify_net_train文件夹下是训练部分瑕疵区域的单分类器代码及结果，该单分类器输入为目标检测出的区域块图片，能够精确地识别的该区域块的瑕疵类型，并且配合目标检测算法能够精确地给出瑕疵坐标；
checkpoint:存储了两个分类器的网络持久化模型，用于持久化输出结果，在single_classify_result.py和all_classify_result.py中被调用；
zs_data：为测试数据
用户只需要调用jiance.py来测试布匹识别效果，注意修改图像路径，本工程在Ubuntu16.04下运行，需要安装Anaconda3,opencv3.4.2,numpy,matpyplot,tensorflow1.4.0等python库。