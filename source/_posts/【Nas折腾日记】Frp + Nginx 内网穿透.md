---
title: 【Nas折腾日记】Frp + Nginx 内网穿透
tags:
    - Nas
categories: Nas
abbrlink: nas-note-frp-nginx
date: 2025-03-22
---

目前的主要需求是外网通过对应服务的域名访问 Nas 上的服务，所以需要做内网穿透。

其实 IPv6 + DDNS 也可以解决，也不需要再自行购买服务器了，但是有个弊端是家用宽度屏蔽了 80 和 443 端口，所以访问的时候需要加上端口号，不太方便。

### 所需设备

-   一台公网服务器（如果是国内服务器需要备案）
-   一台在内网的 Nas

### 公网服务器配置

#### Frps

从 Frp 的 [Github Release](https://github.com/fatedier/frp/releases) 页面下载对应的版本，然后解压。

```bash
wget https://github.com/fatedier/frp/releases/download/v0.61.2/frp_0.61.2_linux_amd64.tar.gz

tar -zxvf frp_0.61.2_linux_amd64.tar.gz

cd frp_0.61.2_linux_amd64
```

打开解压后的文件夹后，可以看到 `frps.toml` 文件，这个文件是 Frps 的配置文件。

> 需要注意的是，在 Frp 官网中提到，目前支持的文件格式包括 TOML/YAML/JSON，旧的 INI 格式仍然支持，但已经不再推荐。但网络中的大多数教程都是使用的 INI 格式，参照时需注意格式转换。

```toml
# frps绑定的端口
bindPort = 7000
# 指定HTTP请求的监听地址，这里推荐设置80端口以外的端口，因为80端口后续要在Nginx中使用
vhostHTTPPort = 8080
# 二级域名后缀，需要将 *.your_domain.com 解析到公网服务器地址
# 参考文档：https://gofrp.org/zh-cn/docs/features/http-https/subdomain/
subdomainHost = "your_domain.com"

# 启用 dashboard,访问7500端口可以看到frps的状态
webServer.addr = "0.0.0.0"
webServer.port = 7500
# dashboard 用户名密码，可选，默认为空
webServer.user = "admin"
webServer.password = "admin"
```

编写完配置文件后，即可启动 Frps。

```bash
./frps -c frps.toml
```

这里推荐使用 `systemd` 来管理 Frps 服务，具体不再赘述。

#### acme.sh

> 如果不需要 HTTPS 可以跳过这一步。

```bash
# 安装 acme.sh
curl https://get.acme.sh | sh -s email=my@example.com

# 这里以CF为例，其他DNS服务商请参考官方文档
# 设置CloudFlare的API Key
export CF_Key="xxxxxxxxxxxxxxxxxxxxxxxxxx"

# DNS验证
/root/.acme.sh/acme.sh --issue --dns dns_cf -d *.your_domain.com

# 复制证书
# /ssl/key.pem和/ssl/crt.pem存放证书的路径，可以自行修改
# 最后的reloadcmd是证书更新后的重启命令，这里是重启frps，如果是其他服务可以自行修改
/root/.acme.sh/acme.sh --install-cert -d *.your_domain.com --key-file       /ssl/key.pem  --fullchain-file /ssl/crt.pem --reloadcmd     "service frps restart"
```

#### Nginx

```bash
# 安装 Nginx
sudo apt install nginx -y

sudo systemctl start nginx

sudo systemctl enable nginx

systemctl status nginx
```

配置 Nginx

> /etc/nginx/default.conf 或者自行新建一个 conf 文件

```nginx
# 子域名通配配置
server {
    listen 443 ssl;
    server_name *.your_domian.com;  # 匹配所有子域名
    ssl_certificate /ssl/crt.pem; # 证书路径
    ssl_certificate_key /ssl/key.pem; # 私钥路径

    location / {
        # 代理到frps的vhostHTTPPort端口
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# HTTP统一跳转
server {
    listen 80;
    server_name *.your_domian.com;

    # 带端口重定向（防止端口丢失）
    return 301 https://$host:443$request_uri;
}

```

### Nas 配置

Nas 的配置比较简单，只需要下载对应的 Frpc 版本，然后配置 Frpc 的配置文件即可。

```toml
# 公网服务器地址
serverAddr = "xxx.xxx.xxx.xxx"
# 公网服务器端口
serverPort = 7000
# 连接失败后退出
loginFailExit=false


[[proxies]]
name = "test1"
type = "http"
# 本地服务地址，也有可能需要填写192.168.xxx.xxx的内网地址
localIp = "127.0.0.1"
localPort = 1111
# 子域名配置
subdomain = "test1"

[[proxies]]
name = "test1"
type = "http"
localIp = "127.0.0.1"
localPort = 13210
# 子域名配置
subdomain = "test2"
```

填写完配置文件后，启动 Frpc 即可（填写了 subdomian 后，不需要在 dns 服务商中再去解析）。

> 参考链接

-   [Frp](https://gofrp.org/zh-cn/docs/overview/)
-   [acme.sh](https://github.com/acmesh-official/acme.sh)
