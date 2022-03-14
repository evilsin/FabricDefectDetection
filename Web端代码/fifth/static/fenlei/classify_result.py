import tensorflow as tf
import numpy as np
from static.fenlei import resnet_v1
import tensorflow.contrib.slim as slim
from PIL import Image
np.set_printoptions(suppress=True)
# defect_classes = ['norm', 'defect_1', 'defect_2', 'defect_3', 'defect_4','defect_5', 'defect_6']
defect_classes = ['并纬','擦伤', '错花', '浆斑', '其他', '缺经', '缺纬','缩纬','停车痕紧','停车痕松','油污','折返','正常']


def all_classify(path):
    image = Image.open(path)
    image = image.resize([400,400])
    image_array = np.array(image)
    image_array = image_array.astype(float)
    image = np.reshape(image_array,[400,400,1])
    image = tf.image.per_image_standardization(image)
    # 声明占位符
    x = tf.placeholder(tf.float32, [None, 400, 400, 1], name="x")

    # 获得网络结果
    net, _ = resnet_v1.resnet_v1_152(x)
    net = tf.squeeze(net, axis=[1, 2])  # 去除第一、第二个维度
    logits = slim.fully_connected(net, num_outputs=len(defect_classes),
                  activation_fn=None, scope='predict')
    logits = tf.nn.softmax(logits)
    logits = tf.clip_by_value(logits, 1e-10, 1)
    logits = tf.argmax(logits,1)
    # 初始化回话
    sess = tf.Session()
    saver = tf.train.Saver()
    saver.restore(sess, 'D:/Python/fifth/static/fenlei/checkpoint/20_5000resnet_3000.ckpt')
    image = sess.run(image)
    image = np.reshape(image,[1,400,400,1])
    value = sess.run(logits, feed_dict={x: image})  # 传入网络得到结果
    result = defect_classes[value[0]]
    sess.close()
    return result


# result = classify('./our_data/test/test_one/缺经2.jpg')
# print(result)











