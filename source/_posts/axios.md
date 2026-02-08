---
title: axios的基本使用
tags:
  - Vue
  - Axios
  - 跨域
categories: 前端开发
abbrlink: 55319
date: 2020-01-12 10:00:00
expires: 2020-01-12 10:00:00
---

## axios的基本使用

Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。

最简单的axios写法如下

```javascript
axios.get('url')
  .then(res => {
    console.log(response);
  })
  .catch(err => {
    console.log(error);
  });
```

这样我们就可以完成一个简单的get请求，但是在大多数情况下，我们总是会遇到跨域相关的问题。

### 什么是跨域

跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器施加的安全限制。

最常见的就是当域名不同时（如下）

```
www.abc.com 访问 www.def.com
```

有的网站会在服务端写好，这样我们请求接口时就不会遇到跨域的问题，但是大多数并不会，也就是为什么在看相关教程时看着老师可以直接请求数据，但是自己照着写时却突然蹦出来了跨域的问题（老师自己写的接口，在服务端就解决了跨域的问题）。

### 如何解决跨域问题

这里分为vue cli2与 vue cli3/4的解决方法，因为配置文件发生了相应的改变所以有一些小的变动，网上大多数的解决方法都是cli2放在cli3/4是不可行的。

#### STEP1

修改/创建配置文件

##### vue cli2

将config文件夹下的index.js打开，写入代码如下

注意这里不要改成es6语法，具体为啥我还不是特别清楚，官方文档是这样写的，我改成es6是没法正常运行的。。。详情见：[Vue官方文档：配置参考](https://cli.vuejs.org/zh/config/)

注意devServe，也就是说只能在开发环境下实现跨域，打包后在生产环境下无法实现跨域

为什么这样写可以实现跨域？上面的链接中devServer.proxy有详细说到~

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://url.com', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
        //这里的名字可以自定义（api）
      }
    }
  }
}
```

##### vue cli3/4

直接在根目录下修改或者创建vue.config.js（名字是固定的！官方就是这么规定的，其他名字不会生效），写入的代码同上

#### STEP2

创建一个js文件名字随意，大致代码如下

axios更多的实例请求配置详见：[Axios中文说明](https://www.kancloud.cn/yunye/axios/234845)

```javascript
import axios from "axios";

export function request(config) {
  创建一个axios实例
    var instance = axios.create({
        method: 'get',//传输方式（get/post）
        params: {
          //需要传递的参数写在这里
          name:'jhao'
        },
        headers: {
            'content-type': 'text/plain:charset=UTF-8'
        }
    });

    return instance(config)//返回参数
}
```

#### STEP3

在main.js中导入STEP2的文件

```javascript
import { request } from './api/request'
//换成自己的js文件

request('/api/cgi-bin/musicu.fcg').then(res =>{
  console.log(res);
})
```

#### 结束

到这里在开发环境中的跨域请求就解决了，要在生产环境中使用还需要一点其他的配置，以后再写。小白个人的学习总结，可能会存在一些技术知识上的认知错误，欢迎指出，大佬轻喷、轻喷~
