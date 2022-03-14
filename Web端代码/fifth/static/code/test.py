import matplotlib.pyplot as plt

if __name__=='__main__':
    labels= 'Aq','Bq','Cq','Dq'
    print(type(labels))
    fracs=[15,30,45,10]
    explode=[0,0,1,0,0]
    plt.axes(aspect=1)
    plt.pie(x=fracs,labels=labels,autopct='%.0f%%',shadow=True)
    plt.show()