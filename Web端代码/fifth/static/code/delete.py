# coding=utf-8
import shutil, os


"""
class DeleteFiles(object):
    def __init__(self, pathDir):
        self.pathDir = pathDir

    def delete_files(self):
        os.chdir(self.pathDir)
        fileList = list(os.listdir())
        for file in fileList:
            if os.path.isfile(file):
                os.remove(file)
                print("delete successfully")
            else:
                shutil.rmtree(file)
"""
# delete = DeleteFiles(r'D:\Python\ftd_fourth\static\fenge\crop')
# delete.delete_files()
def del_file(path):
    for i in os.listdir(path):
        path_file = os.path.join(path, i)
        if os.path.isfile(path_file):
            os.remove(path_file)
        else:
            del_file(path_file)
