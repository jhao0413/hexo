---
title: vue cli 解决跨域 线上 nginx 反向代理配置
tags:
  - Vue
  - Nginx
  - 跨域
  - 反向代理
categories: 前端开发
abbrlink: 61269
date: 2020-05-03 10:00:00
expires: 2020-05-03 10:00:00
---

## vue cli 解决跨域 线上 nginx 反向代理配置

#### 1、开发环境跨域

在**vue cli2**中，在/config/index.js里找到proxyTable开启代理changeOrigin:ture;

```javascript
proxyTable: {
    //解决
    publicPath: "./",
      '/api':{
        target:'http://xx.com',
        changeOrigin:true,
        pathRewrite:{
            '^/api':'/api'
        }
      }
    },
```

在**vue cli3**中的vue.config.js（如果没有可以自行创建。注：与package.json同级目录）修改

```javascript
module.exports = {
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: "http://xx.com",
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
```

#### 2、nginx反向代理设置

如果使用宝塔控制面板，请在当前站点文件夹下进行配置（位置如下图所示）

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200924151731.png)

在配置文件（xx.conf）的server{}中按需加入如下代码：

```javascript
location /api/ {
        # 把 /api 路径下的请求转发给真正的后端服务器
        proxy_pass http://xx.xx.xx.xx:3000/;
        #注意端口后需加/

        # 把host头传过去，后端服务程序将收到your.domain.name, 否则收到的是localhost:8080
        proxy_set_header Host $http_host;

        # 把cookie中的path部分从/api替换成/service
        proxy_cookie_path /api /;

        # 把cookie的path部分从localhost:8080替换成your.domain.name
        proxy_cookie_domain localhost:80 http://xx.xx.xx.xx:3000/;
    }
```
