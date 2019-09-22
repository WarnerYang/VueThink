<template>
  <el-row class="">
    <el-col :span="24">
      <el-menu
        :default-active="menu"
        background-color="#304156"
        text-color="#f5f7fa"
        style="border:none;"
      >
        <div v-for="(firstMenu, idx) in topMenu" :key="firstMenu.id">
          <div v-if="firstMenu.child">
            <el-submenu :index="idx+filling">
              <div slot="title">
                <i :class="firstMenu.icon"></i>
                {{firstMenu.title}}
              </div>
              <div v-for="(item, idx2) in firstMenu.child" :key="idx2">
                <el-menu-item :index="item.menu" @click="routerChange(item)">{{item.title}}</el-menu-item>
              </div>
            </el-submenu>
          </div>
          <div v-else>
            <el-menu-item :index="firstMenu.menu" @click="routerChange(firstMenu)">
              <i :class="firstMenu.icon"></i>
              {{firstMenu.title}}
            </el-menu-item>
          </div>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["menuData", "menu", "topMenu"],
  data() {
    return {
      filling: "0000"
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