from fenge_result import fenge_result
import single_classify_result
from matplotlib import pyplot as plt
import os
import cv2 as cv

def jiance(image_path,size=5,area=900):
    box_result,len_crop = fenge_result(image_path,size,area)
    # print(len_crop,box_result)
    img = cv.imread(image_path, 0)
    for i in range(len_crop):
        x1 = box_result[i][0]
        x2 = box_result[i][1]
        y1 = box_result[i][2]
        y2 = box_result[i][3]
        result = single_classify_result.single_classify('./crop/' + str(i) + '.jpg')
        if result != 'QW' and result !='ZC':
            cv.rectangle(img,(x1,y2),(x2,y1),(255,255,255),4)
            font = cv.FONT_HERSHEY_COMPLEX
            cv.putText(img,result,(x1,int((y1+y2)/2)),font,1,(255,255,255),2)
    plt.imshow(img,cmap='gray')
    plt.xticks([]),plt.yticks([])
    plt.show()
    return 0


def main():
    # jiance('./our_data/test/test_one/停车痕紧2.jpg',5,900)
    jiance('/home/xdjf/end_llhj/zs_data/004336_1_5YYA1.jpg', 5, 900)

if __name__ == '__main__':
    main()