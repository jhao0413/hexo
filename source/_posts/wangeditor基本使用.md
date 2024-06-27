---
title: wangeditor
tags:
  - vue
categories: vue
abbrlink: 28431
date: 2021-04-15 10:00:00
expires: 2021-04-15 10:00:00
---

## wangeditor基本使用

最近做公安项目的时候需要做一个富文本编辑器实现文章编辑，图片上传等功能。一开始选择了quill，但是做到最后在图片上传的时候出现了跨域的问题（现在回想起来应该是当时后端接口没有写好），当时就想换个别的富文本编辑器试试，最后找到了wangeditor，主要看上了它的轻量，中文文档等等。

##### 1、vue中安装wangEditor

使用npm安装：npm install wangeditor --save

##### 2、创建公共组件

在components中创建wangEnduit.vue文件

```vue
<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'editoritem',
    data() {
      return {
        // uploadPath,
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function(value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      }
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods: {
      seteditor() {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        console.log(this.editor);
      //editor.config这里我使用的是wangeditor4，如果你使用的是wangeditor3将editor.config改为editor.customConfig即可
        this.editor.config.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.config.uploadImgServer = 'http://127.0.0.1:8081/upload/img'// 配置服务器端地址
        this.editor.config.uploadImgHeaders = { }// 自定义 header
        this.editor.config.uploadFileName = 'img' // 后端接受上传文件的参数名
        this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.config.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
        this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间

        // 配置菜单
        this.editor.config.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', // 插入视频
          'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]

        this.editor.config.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
            // console.log(result.data[0].url)
            //insertImg()为插入图片的函数
             //循环插入图片
            // for (let i = 0; i < 1; i++) {
              console.log(result.data.url)
              let url = result.data.url
              insertImg(url)
            // }
          }
        }
        this.editor.config.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      }
    }
  }
</script>

<style lang="css">
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>
```

##### 3.在父组件中调用

```vue
<template>
<div>
<editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
</div>
</template>

<script>
import EditorBar from '../components/wangEnduit'
export default {
components: { EditorBar },
data() {
      return {
        isClear: false,
        detail:""
        }
      },  
methods: {
  change(val) {
      console.log(val)
      
    },
 }
}
</script>

```

到这里前端代码就完成了，接下来是后端代码

##### 4、nodejs代码

下面是我所使用的包

```javascript
const express = require("express");
const server = express();
const cors = require("cors");
var bodyParser = require("body-parser");
var multer = require("multer");
```

```javascript
var express = require('express');
var multer = require("multer");
var app = express();
var bodyParse = require('body-parser');
 
// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// 添加配置文件到muler对象。
var upload = multer({
  storage: storage
});
var imgBaseUrl = '../'

// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

//1.获取路由中间件对象
let router = express.Router();
server.use(cors());

//图片，express设置文件相对路径
server.use(express.static('images'));

// 解决跨域问题
server.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
 
// 文件上传请求处理，upload.array 支持多文件上传，第二个参数是上传文件数目
.post('/upload/img', upload.array('img', 2), function (req, res) {
    // 读取上传的图片信息
    var files = req.files;

    // 设置返回结果
    var result = {};
    if (!files[0]) {
      result.code = 1;
      result.errMsg = '上传失败';
    } else {
      result.code = 0;
      result.data = {
        url: "http://127.0.0.1:8081" + files[0].path.split("images")[1]
      }
      result.errMsg = '上传成功';
    }
    res.end(JSON.stringify(result));
  })


server.use(router);
server.listen(8081, function () {
  console.log("服务已运行在：http://127.0.0.1:8081/");
});
```

大功告成~

这里可以参考两篇文章：

https://blog.csdn.net/qq_33594380/article/details/80164381

https://blog.csdn.net/ciwei0605/article/details/104402138
