VueThink
===============

## 项目介绍
VueThink是一套基于Vue全家桶（Vue2.x + Vue-router2.x + Vuex）+ Thinkphp的前后端分离框架。
脚手架构建也可以通过vue官方的vue-cli脚手架工具构建
实现了一般后台所需要的功能模块

VueThink不仅适用于管理后台或管理系统开发，且广泛适用于B/S架构的项目开发。VueThink是对前后端分离技术的应用实践，2016年由洪睿科技的技术团队研发并投入商业开发使用，已有许多的商业项目实践。而今框架开源，希望能有更多志同道合的伙伴参与VueThink的迭代 ^_^

## 使用许可：
VueThink是基于MIT协议的开源框架，它完全免费。你可以免费下载VueThink，用来搭建自己的或者团体的软件。

## 主要适用技术栈
* 后端框架：ThinkPHP 5.0.x/ThinkPHP 5.1.x
* 前端MVVM框架：Vue.JS 2.x
* 开发工作流：Webpack 1.x
* 路由：Vue-Router 2.x
* 数据交互：Axios
* 代码风格检测：Eslint
* UI框架：Element-UI 1.1.6
* JS函数库：Lodash

> VueThink的运行环境要求PHP5.6以上。

详细开发文档参考 [ThinkPHP5完全开发手册](http://www.kancloud.cn/manual/thinkphp5)

## 系统功能

* 登录、退出登录
* 修改密码、记住密码
* 菜单管理
* 系统参数
* 权限节点
* 岗位管理
* 部门管理
* 用户组管理
* 用户管理

### Demo

演示地址：<http://demo.vuethink.com>

用户名：user01

密码：user01

### QQ群交流

欢迎加入qq群：340506819

### 开发依赖

* vue <https://vuefe.cn/v2/guide/>
* element-ui@1.1.3  <http://element.eleme.io/1.1/#/zh-CN/component/installation>
* axios  <https://github.com/mzabriskie/axios>
* fontawesome <http://fontawesome.io/icons/>
* js-cookie  <https://github.com/js-cookie/js-cookie>
* lockr  <https://github.com/tsironis/lockr>
* lodash  <http://lodashjs.com/docs/>
* moment  <http://momentjs.cn/>


## 数据交互

数据交互通过axios以及RESTful架构来实现

用户校验通过登录返回的auth_key放在header

值得注意的一点是：跨域的情况下，会有预请求OPTION的情况

附上接口文档：<http://api.vuethink.com>

## Server搭建
服务端使用的框架为thinkphp5.搭建前请确保拥有lamp/lnmp/wamp环境。

集成环境推荐使用phpstudy：<http://www.phpstudy.net/>
或者phpset：<http://www.phpset.cn/>

这里所说的搭建其实就是把server框架放入WEB运行环境，并使用80端口。

导入服务端根文件夹数据库文件install.sql，(数据库内用户表账号root,数据库名vuethink，密码123456)并修改config/database.php配置文件。

* PHP >= 5.6.0
* PDO PHP Extension
* MBstring PHP Extension
* CURL PHP Extension

服务端开发手册请参考：<http://www.kancloud.cn/manual/thinkphp5/118003>

当访问 <http://localhost>, 出现“vuethink接口”即代表后端接口搭建成功。

## 服务端重写配置
```
请参考[ThinPHP重写](https://www.kancloud.cn/manual/thinkphp5_1/353955)
```

### 前端搭建
```
请参考frontEnd里的README文件
```

## 部署 Linux
### 方式一. 前后端独立域名
- 后端 api.example.com
- 前端 admin.example.com
比较简单，注意跨域问题


### 方式二. 前后端同一域名
- example.com
- 后端 example.com/api/
- 前端 example.com/admin/

修改`src/main.js` ，把`history`改成`hash`，避免页面空白。`hash`模式`url`会带上`#`号
```
const router = new VueRouter({
  mode: 'hash',
```

nginx vhost 配置示例，路由重写和资源加载设置
example.com.conf
```
server
    {
        listen 443 ssl http2;
        #listen [::]:443 ssl http2;
        server_name example.com ;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/vuethink;
        
        #ssl on;
        #ssl config

        include enable-php.conf;

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|woff|woff2|ttf)$
        {
	          root  /home/wwwroot/vuethink/frontEnd/dist;
            expires      30d;
        }

        location ~ .*\.(js|css)?$
        {
	          root  /home/wwwroot/vuethink/frontEnd/dist;
            expires      12h;
        }

        location ~ /.well-known {
            allow all;
        }

        location ~ /\.
        {
            deny all;
        }

        #vue config
        location /admin/ {
             try_files $uri $uri/  /frontEnd/dist/index.html last;
        }
        
        #thinkphp config
        location /api/ {
           if (!-e $request_filename){
              rewrite  ^/api/(.*)$  /php/index.php?s=$1  last;
              break;
           }
        }

        access_log  /home/wwwlogs/example.com.log;
    }
```




