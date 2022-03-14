import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt
import os

def gzjz(img):
##光照矫正：自适应直方图均衡法
    clahe = cv.createCLAHE(clipLimit = 2.0)
    cll = clahe.apply(img)
    return cll

def zzlb(cll,size=5):
##去噪：中值滤波
    median = cv.medianBlur(cll, size)
    return median

def yzfg(median):
##分割二值化：局部阈值分割
    th1 = cv.adaptiveThreshold(median,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,cv.THRESH_BINARY_INV,101,8)
    th2 = cv.adaptiveThreshold(median,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,cv.THRESH_BINARY,101,-6)
    if th1 is None and th2 is None:
        th3=[]
    else:
        th3 = th1 | th2
    return th3

def tqlk(th3):
##提取轮廓
    kernel2 = np.ones((9,9),np.uint8)
    dilation = cv.dilate(th3,kernel2,iterations=1)
    kernel1 = np.ones((11,11),np.uint8)
    erosion = cv.erode(dilation,kernel1,iterations=1)
    return erosion


def distance(rect1,rect2):
    #求矩形距离
    if(rect1[1]<rect2[1]):
        if(rect1[0]<rect2[0]):
            tx = rect2[0]-(rect1[0]+rect1[2])
            ty = rect2[1]-(rect1[1]+rect1[3])
            if(tx<0 and ty<0):
                juli = 0
            else:juli = np.sqrt(np.square(tx)+np.square(ty))
        else:
            tx = rect2[0]+rect2[2]-rect1[0]
            ty = rect2[1]-(rect1[1]+rect1[3])
            if(tx>0 and ty<0):
                juli = 0
            else:juli = np.sqrt(np.square(tx)+np.square(ty))
    else:
        if(rect1[0]>rect2[0]):
            tx = rect1[0]-(rect2[0]+rect2[2])
            ty = rect1[1]-(rect2[1]+rect2[3])
            if(tx<0 and ty<0):
                juli = 0
            else:juli = np.sqrt(np.square(tx)+np.square(ty))
        else:
            tx = rect1[0]+rect1[2]-rect2[0]
            ty = rect1[1]-(rect2[1]+rect2[3])
            if(tx>0 and ty<0):
                juli = 0
            else:juli = np.sqrt(np.square(tx)+np.square(ty))
    return juli


def draw_and_cut(img,box,area=900):
    num = len(box)
    crop_img = []
    area_array = []
    box_temp = []
    box_result = []
    len_crop = 0
    for i in range(num):
        Xs = [j[0] for j in box[i]]
        Ys = [j[1] for j in box[i]]
        x1 = max(min(Xs),0)
        x2 = max(Xs)
        y1 = max(min(Ys),0)
        y2 = max(Ys)
        hight = y2-y1
        width = x2-x1
        area_array.append(hight*width)
        crop_img.append(img[y1:y1+hight,x1:x1+width])
        box_temp.append([x1,x2,y1,y2])
    #area saixuan
    for i in range(len(crop_img)):
        if (area_array[i] > area):
            cv.imwrite('./static/fenlei/crop/' + str(len_crop) + '.jpg', crop_img[i])
            box_result.append(box_temp[i])
            len_crop = len_crop + 1
        else:
            pass
    return box_result,len_crop


def ishebing(box):
    jx = []
    for i in box:
        xs = [j[0] for j in i]
        ys = [j[1] for j in i]
        x1 = min(xs)
        x2 = max(xs)
        y1 = min(ys)
        y2 = max(ys)
        height = y2 - y1
        width = x2 - x1
        jx.append([x1, y1, width, height])
    hebing_list = []
    for i in range(len(box)):
        # print(i)
        for j in range(i + 1, len(box)):
            juli = distance(jx[i], jx[j])
            # print(juli)
            if (juli < 100):#100
                hebing_list.append([i, j])
    sum = len(hebing_list)
    # print(box)
    return sum,hebing_list

def hebing(new_c,hebing_list):
    for i in range(len(hebing_list)):
        for j in range(len(hebing_list)):
            x = list(set(hebing_list[i] + hebing_list[j]))
            y = len(hebing_list[j]) + len(hebing_list[i])
            if i == j or hebing_list[i] == 0 or hebing_list[j] == 0:
                break
            elif len(x) < y:
                hebing_list[i] = x
                hebing_list[j] = [0]
    hebing_list = [i for i in hebing_list if i != [0]]
    # for i in range(len(hebing)):
    #     temp = hebing[i]
    #     len_temp = len(temp)
    #     temp_lb = []
    #     for i in range(len_temp):
    #         temp_lb.extend(new_c[temp[i]])
    #     for i in range(len_temp):
    #         new_c[temp[i]] = np.array(temp_lb)
    for i in range(len(hebing_list)):
        temp = hebing_list[i]
        len_temp = len(temp)
        temp_lb = []
        for j in range(len_temp):
            temp_lb.extend(new_c[temp[j]])
        for k in range(len_temp):
            if k == 0:
                new_c[temp[k]] = np.array(temp_lb)
            else:
                new_c[temp[k]] = []
    #去重
    new_c2 = []
    for i in range(len(new_c)):
        if (new_c[i] != []):
            new_c2.append(new_c[i])
    return new_c2


def qyjc(img,erosion,area=900):
##区域检测
    img2, contours, hierarchy = cv.findContours(erosion,cv.RETR_TREE,cv.CHAIN_APPROX_SIMPLE)
    c = sorted(contours,key=cv.contourArea,reverse=True)
    new_c = []
    for i in c:
        if(np.size(i)>50):#50
            new_c.append(i)
    # print(np.size(new_c))
    rect = []
    box = []
    for i in range(len(new_c)):
        rect.append(cv.minAreaRect(new_c[i]))
        box.append(np.int0(cv.boxPoints(rect[i])))
    ##迭代合并
    sum,hebing_list = ishebing(box)
    while(sum>0):
        # print(sum,hebing_list)
        new_c = hebing(new_c,hebing_list)
        rect2 = []
        box2 = []
        # print('a',np.size(new_c))
        for i in range(len(new_c)):
            # print('b',i,np.size(new_c))
            rect2.append(cv.minAreaRect(new_c[i]))
            box2.append(np.int0(cv.boxPoints(rect2[i])))
        sum,hebing_list = ishebing(box2)

    ##裁剪瑕疵图像
    # print(np.size(rect2))
    # print(box2)
    rect3 = []
    box3 = []
    for i in range(len(new_c)):
        rect3.append(cv.minAreaRect(new_c[i]))
        box3.append(np.int0(cv.boxPoints(rect3[i])))
    # draw_img = cv.drawContours(img.copy(),box3,-1,(0,0,225),3)

    box_result,len_crop = draw_and_cut(img,box3,area)
    return box_result,len_crop
    # for i in range(len(crop_img)):
    #     if(area[i]>area):
    #         cv.imwrite('./crop/'+str(i)+'.jpg',crop_img[i])
    #
    #     else:
    #         pass
    # plt.imshow(draw_img,cmap='gray')
    # plt.xticks([]),plt.yticks([])
    # plt.show()


def del_file(path):
    for i in os.listdir(path):
        path_file = os.path.join(path, i)
        if os.path.isfile(path_file):
            os.remove(path_file)
        else:
            del_file(path_file)


def fenge_result(image_path,size=5,area=900):
    del_file(r'D:\Python\fifth\static\fenlei\crop')
    img = cv.imread(image_path,0)
    cll = gzjz(img)
    median = zzlb(cll,size)
    th3 = yzfg(median)
    # plt.imshow(th3, cmap='gray')
    # plt.xticks([]), plt.yticks([])
    # plt.show()
    erosion = tqlk(th3)
    box_result,len_crop = qyjc(img,erosion,area)
    return box_result,len_crop

# if __name__ == '__main__':
#     box_result,len_crop = fenge_result('/home/xdjf/end_llhj/our_data/test/test_one/并纬2.jpg')
#     print(len_crop)
#     print(box_result)

