---
title: vue+element+阿里云oss图片上传
tags:
  - vue
categories: vue
abbrlink: 63894
date: 2020-09-24 10:00:00
expires: 2020-09-24 10:00:00
---

### vue+element+阿里云oss图片上传

#### 1、npm安装ali-oss

```
npm install ali-oss
```

#### 2、使用element的 upload 组件进行上传

*html部分如下*

```html
<template>
  <div class="home">
    <el-upload
      class="upload-demo"
      action
      :http-request="fnUploadRequest"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
```

*js部分如下*

```javascript
import OSS from "ali-oss";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loading: false,
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async fnUploadRequest(option) {
      try {
        console.log("参数", option);
        // 获取OSS配置信息
        let client = new OSS({
          secure: true,
          accessKeyId: "", //阿里云AccessKey ID
          accessKeySecret: "", //阿里云accessKeySecret
          bucket: "", //bucket域名
          region: "", //oss地区，如：oss-cn-beijing。（注：不用加.aliyun.com）
        });
        this.loading = true;
          
          //获取当前时间（为了保证不出现重复文件名导致文件覆盖）
        function getFormatDate() {
          var date = new Date();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentDate =
            date.getFullYear() +
            "-" +
            month +
            "-" +
            strDate +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
          return currentDate;
        }

        let file = option.file;
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let fileName = file.name.substr(0, point);
        let date = getFormatDate();
        let fileNames = `${fileName}_${date}${suffix}`;
        let relativePath = "blog/";
        console.log("oss客户端", client);
        console.log("文件", file);
        // 分片上传文件
        let ret = await client.multipartUpload(relativePath + fileNames, file, {
          progress: async function(p) {
            let e = {};
            e.percent = p * 100;
            option.onProgress(e);
          },
        });

        if (ret.res.statusCode === 200) {
          console.log("上传成功", ret);
        } else {
          option.onError("上传失败");
        }
      } catch (error) {
        console.error(error);
        option.onError("上传失败");
      }
      this.loading = false;
    },
  },
};
```

**全部代码**

```html
<template>
  <div class="home">
    <el-upload
      class="upload-demo"
      action
      :http-request="fnUploadRequest"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import OSS from "ali-oss";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      loading: false,
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async fnUploadRequest(option) {
      try {
        console.log("参数", option);
        // 获取OSS配置信息
        let client = new OSS({
          secure: true,
          accessKeyId: "", //阿里云AccessKey ID
          accessKeySecret: "", //阿里云accessKeySecret
          bucket: "", //bucket域名
          region: "", //oss地区，如：oss-cn-beijing。（注：不用加.aliyun.com）
        });
        this.loading = true;
        function getFormatDate() {
          var date = new Date();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var currentDate =
            date.getFullYear() +
            "-" +
            month +
            "-" +
            strDate +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds();
          return currentDate;
        }

        let file = option.file;
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let fileName = file.name.substr(0, point);
        let date = getFormatDate();
        let fileNames = `${fileName}_${date}${suffix}`;
        let relativePath = "blog/";
        console.log("oss客户端", client);
        console.log("文件", file);
        // 分片上传文件
        let ret = await client.multipartUpload(relativePath + fileNames, file, {
          progress: async function(p) {
            let e = {};
            e.percent = p * 100;
            option.onProgress(e);
          },
        });

        if (ret.res.statusCode === 200) {
          console.log("上传成功", ret);
        } else {
          option.onError("上传失败");
        }
      } catch (error) {
        console.error(error);
        option.onError("上传失败");
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.home {
  width: 100%;
  height: 100vh;
  position: relative;
}

.upload-demo {
  width: 30%;
  height: 30%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
}
</style>

```
