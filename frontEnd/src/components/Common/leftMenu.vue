<template>
  <el-row>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-col :span="24">
      <el-menu
        :default-active="menu"
        background-color="#304156"
        text-color="#f5f7fa"
        style="border:none;"
        :collapse="isCollapse"
      >
        <template v-for="(firstMenu, key) in topMenu">
          <el-submenu v-if="firstMenu.child" :index="key+filling" :key="key">
            <template slot="title">
              <i :class="firstMenu.icon"></i>
              <span slot="title">{{firstMenu.title}}</span>
            </template>
            <el-menu-item-group>
              <template v-for="(item, key2) in firstMenu.child">
                <el-menu-item
                  :index="item.menu"
                  :key="key2"
                  @click="routerChange(item)"
                >{{item.title}}</el-menu-item>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="firstMenu.menu" :key="key" @click="routerChange(firstMenu)">
            <i class="el-icon-setting"></i>
            <span slot="title">{{firstMenu.title}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["menuData", "menu", "topMenu"],
  data() {
    return {
      filling: "0000",
      isCollapse: false
    };
  },
  methods: {
    routerChange(item) {
      // 与当前页面路由相等则刷新页面
      if (item.url != this.$route.path) {
        router.push(item.url);
      } else {
        _g.shallowRefresh(this.$route.name);
      }
    }
  }
};
</script>