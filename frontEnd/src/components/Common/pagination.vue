<template>
  <el-pagination
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :page-sizes="[10, 15, 20, 50, 100]"
    :page-size="limit"
    :current-page="currentPage"
    :total="total"
    background
    layout="total, sizes, prev, pager, next"
  ></el-pagination>
</template>

<script>
export default {
  props: ["total"],
  data() {
    return {
      currentPage: 1,
      limit: 15
    };
  },
  methods: {
    handleCurrentChange(page) {
      const query = { ...this.$route.query, ...{ page: page } };
      router.push({
        path: this.$route.path,
        query: query
      });
    },
    handleSizeChange(limit) {
      _g.openGlobalLoading();
      this.currentPage = 1;
      this.limit = limit;
      this.$parent.init();
    },
    getCurrentPage() {
      let query = this.$route.query;
      if (query) {
        if (query.page) {
          this.currentPage = parseInt(query.page);
        } else {
          this.currentPage = 1;
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getCurrentPage();
    }
  }
};
</script>
