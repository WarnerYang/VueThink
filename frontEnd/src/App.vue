<template>
  <div id="app">
    <el-collapse-transition>
      <router-view></router-view>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>