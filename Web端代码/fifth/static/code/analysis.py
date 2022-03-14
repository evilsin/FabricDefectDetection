from myweb import models
import matplotlib.pyplot as plt
import matplotlib as mpl
import cv2 as cv

def draw():
    mpl.rcParams["font.sans-serif"] = ["SimHei"]
    mpl.rcParams["axes.unicode_minus"] = False
    bupi_leibie = ['尼丝纺','塔丝隆','春亚纺','桃皮绒','锦涤纺','麂皮绒','涤塔夫']
    elements = ['并纬', '擦伤', '错花', '浆斑', '其他', '缺经', '缺纬', '缩纬', '停车痕紧', '停车痕松', '油污', '折返']
    explode = 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05
    colors = ['lightgreen', 'gold', 'green', 'lightskyblue', 'lightcoral', 'aqua', 'bisque', 'fuchsia', 'brown',
              'coral', 'cyan', 'deepskyblue']
    # labels= '并纬','擦伤','错花','浆斑','缺经','缺纬','缩纬','停车痕紧','停车痕松','油污','折返','其他'
    mark=models.fault_num.objects.values_list("num").all()
    mark_list = list(mark)
    # print(type(mark_list[0][0]),len(mark_list))
    for i in range(7):
        temp_list = []
        for j in range(12):
            print(j)
            temp_list.append(mark_list[12*i+j][0])
        wedges, texts, autotexts = plt.pie(temp_list, explode=explode, autopct="%3.1f%%", colors=colors, startangle=50)
        plt.legend(wedges,
                   elements,
                   fontsize=8,
                   title="瑕疵图例",
                   loc="center left",
                   bbox_to_anchor=(0.92, 0, 0.5, 1))
        plt.setp(autotexts, size=15, weight="bold")
        plt.setp(texts, size=12)
        plt.title(bupi_leibie[i]+"瑕疵分布饼状图")
        plt.savefig(r'./static/analysis/images/'+str(i)+'.jpg')
        plt.close()

draw()



