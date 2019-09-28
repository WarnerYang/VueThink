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
      <leftMenu :menuData="menuData" :activeMenu="activeMenu" ref="leftMenu"></leftMenu>
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
      active: null
    };
  },
  methods: {
    logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
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
    // switchTopMenu(item) {
    //   if (!item.child) {
    //     router.push(item.url);
    //   } else {
    //     router.push(item.child[0].child[0].url);
    //   }
    // },
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
          this.img = data.SYSTEM_LOGO;
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
    this.activeMenu = this.$route.meta.activeMenu;
    this.menuData = Lockr.get("menus");
  },
  computed: {
    // routerShow() {
    //   return store.state.routerShow;
    // },
    // showLeftMenu() {
    //   this.hasChildMenu = store.state.showLeftMenu;
    //   return store.state.showLeftMenu;
    // }
  },
  components: {
    leftMenu,
    changePwd
  },
  watch: {
    $route(to, from) {
      this.activeMenu = to.meta.activeMenu;
    }
  },
  mixins: [http]
};
</script>
