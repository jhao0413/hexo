---
title: axios get与post请求
tags:
  - Vue
  - Axios
  - HTTP
categories: 前端开发
abbrlink: 9143
date: 2020-02-18 10:00:00
expires: 2020-02-18 10:00:00
---

## axios get与post请求

#### get请求

 */api*:url地址

*params*:{}中写参数

*response*:处理返回结果

```javascript
axios.get('/api', {
                params: {
                    content:''
                },
            }).then(
                response => {
                    console.log(response)
                })
```

#### post请求

qs.stringify()将对象 序列化成URL的形式，以&进行拼接（需要导入qs模块）

```javascript
axios.post('/api/api/login', qs.stringify(
                                {
                                        content:""
                                }),
                                {
                                    headers: {
                                        "CSRF-token":""
                                        //headers发送cookies信息
                                    }
                                }, )
                            .then(response => {
                                //处理返回信息
                            });
```
