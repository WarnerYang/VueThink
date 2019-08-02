<template>
	<div>
        <el-menu :default-active=menu class="el-menu-vertical-demo" theme="dark">
            <div v-for="(secMenu, idx) in menuData" :key='idx'>
                <el-submenu :index=idx+filling>
                    <template slot="title">{{secMenu.title}}</template>
                    <div v-for="(item, idx2) in secMenu.child" :key='idx2'>
                        <el-menu-item :index=item.menu :class="item.menu == menu ? 'is-active':''" @click="routerChange(item)">{{item.title}}</el-menu-item>
                    </div>
                </el-submenu>
            </div>
        </el-menu>
	</div>
</template>

<script>
export default {
  props: ['menuData', 'menu'],
  data() {
    return {
      filling: '0000'
    }
  },
  methods: {
    routerChange(item) 	{
      // 与当前页面路由相等则刷新页面
      if (item.url != this.$route.path) {
        router.push(item.url)
      } else {
        _g.shallowRefresh(this.$route.name)
      }
    }
  }
}
</script>