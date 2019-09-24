<template>
  <el-container class="home-container">
    <el-aside class="home-left">
      <el-col class="sys-title">
        <template v-if="logo_type == '1'">
          <img :src="img" class="logo" />
        </template>
        <template v-else>
          <h3>{{title}}</h3>
        </template>
      </el-col>
      <leftMenu
        v-show="!showLeftMenu"
        :menuData="menuData"
        :menu="menu"
        :topMenu="topMenu"
        :activeMenu="activeMenu"
        ref="leftMenu"
      ></leftMenu>
    </el-aside>

    <el-container class="home-right">
      <el-header class="home-header">
        <el-col :span="20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">活动管理</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="4" class="user">
          <el-dropdown trigger="click" @command="handleMenu" class="user-menu2">
            <span class="el-dropdown-link" style="cursor: pointer">
              {{username}}
              <i class="el-icon-arrow-down" aria-hidden="true"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>

      <el-main class="home-main">
        <section :class="{'hide-leftMenu': hasChildMenu}">
          <el-col :span="24" class="bg-wh content-container">
            <transition name="fade" mode="out-in" appear>
              <router-view v-loading="showLoading"></router-view>
            </transition>
          </el-col>
        </section>
      </el-main>

      <changePwd ref="changePwd"></changePwd>
    </el-container>
  </el-container>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.panel {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.panel-top {
  height: 60px;
  line-height: 60px;
  background: #324057;
  color: #c0ccda;
  border-bottom: 1px solid #1f2d3d;
}

.panel-center {
  background: #324057;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}

.panel-c-c {
  background: #f1f2f7;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  left: 180px;
  overflow-y: scroll;
  padding: 20px;
}

.logout {
  background: url(../assets/images/logout_36.png);
  background-size: contain;
  width: 20px;
  height: 20px;
  float: left;
}

.logo {
  width: 150px;
  float: left;
  margin: 10px 10px 10px 18px;
}

.tip-logout {
  float: right;
  margin-right: 20px;
  padding-top: 5px;
  cursor: pointer;
}

.admin {
  color: #c0ccda;
  text-align: center;
}
.hide-leftMenu {
  left: 0px;
}
.sys-title {
  min-height: 60px;
  text-align: center;
  background-color: #304156;
  color: #fff;
}
.home-container {
  height: 100%;
}
.home-left {
  height: 100%;
  width: 200px !important;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
}
.home-right {
  margin-left: 200px;
  height: 100%;
}
.home-right .user {
  text-align: right;
  padding-right: 20px;
}
.home-header {
  height: 60px;
  background: #fff;
  line-height: 60px;
  border-bottom: 1px solid #d8dce5;
  background-color: #fff;
}
.home-header .el-breadcrumb {
  line-height: 60px;
}
.home-main {
  background-color: #f1f2f7;
}
.home-footer {
  text-align: center;
  line-height: 30px;
  height: 30px;
  color: #eee;
}
.content-container {
  padding: 15px;
}
</style>
<script>
import leftMenu from "./Common/leftMenu.vue";
import changePwd from "./Account/changePwd.vue";
import http from "../assets/js/http";

export default {
  data() {
    return {
      username: "",
      topMenu: [],
      childMenu: [],
      menuData: [],
      hasChildMenu: false,
      menu: null,
      module: null,
      img: "",
      title: "",
      logo_type: null,
      active:null
    };
  },
  methods: {
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          _g.openGlobalLoading();
          let data = {
            authkey: Lockr.get("authKey"),
            sessionId: Lockr.get("sessionId")
          };
          this.apiPost("admin/base/logout", data).then(res => {
            _g.closeGlobalLoading();
            this.handelResponse(res, data => {
              Lockr.rm("menus");
              Lockr.rm("authKey");
              Lockr.rm("rememberKey");
              Lockr.rm("authList");
              Lockr.rm("userInfo");
              Lockr.rm("sessionId");
              Cookies.remove("rememberPwd");
              _g.toastMsg("success", "退出成功");
              setTimeout(() => {
                router.replace("/");
              }, 1500);
            });
          });
        })
        .catch(() => {});
    },
    switchTopMenu(item) {
      if (!item.child) {
        router.push(item.url);
      } else {
        router.push(item.child[0].child[0].url);
      }
    },
    handleMenu(val) {
      switch (val) {
        case "logout":
          this.logout();
          break;
        case "changePwd":
          this.changePwd();
          break;
      }
    },
    changePwd() {
      this.$refs.changePwd.open();
    },
    getTitleAndLogo() {
      this.apiPost("admin/base/getConfigs").then(res => {
        this.handelResponse(res, data => {
          document.title = data.SYSTEM_NAME;
          this.logo_type = data.LOGO_TYPE;
          this.title = data.SYSTEM_NAME;
          this.img = window.HOST + data.SYSTEM_LOGO;
        });
      });
    },
    getUsername() {
      this.username = Lockr.get("userInfo").username;
    }
  },
  created() {
    this.getTitleAndLogo();
    let authKey = Lockr.get("authKey");
    let sessionId = Lockr.get("sessionId");
    if (!authKey || !sessionId) {
      _g.toastMsg("warning", "您尚未登录");
      setTimeout(() => {
        router.replace("/");
      }, 1500);
      return;
    }
    this.getUsername();
    let menus = Lockr.get("menus");
    // this.menu = this.$route.meta.menu;
    // this.module = this.$route.meta.module;
    this.activeMenu = this.$route.meta.activeMenu;
    this.topMenu = menus;
    // _(menus).forEach(res => {
    //   if (res.module == this.module) {
    //     this.menuData = res.child;
    //     res.selected = true;
    //   } else {
    //     res.selected = false;
    //   }
    // });
  },
  computed: {
    routerShow() {
      return store.state.routerShow;
    },
    showLeftMenu() {
      this.hasChildMenu = store.state.showLeftMenu;
      return store.state.showLeftMenu;
    }
  },
  components: {
    leftMenu,
    changePwd
  },
  watch: {
    $route(to, from) {
      _(this.topMenu).forEach(res => {
        if (res.module == to.meta.module) {
          res.selected = true;
          if (!to.meta.hideLeft) {
            this.menu = to.meta.menu;
            this.menuData = res.child;
          }
        } else {
          res.selected = false;
        }
      });
    }
  },
  mixins: [http]
};
</script>
