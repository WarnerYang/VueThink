<template>
  <el-table-column :label="label||'操作'" :width="width">
    <template scope="scope">
      <router-link :to="{ name: toRouter, params: { id: scope.row.id }}" class="p-r-10">
        <el-link type="primary" icon="el-icon-edit">编辑</el-link>
      </router-link>
      <el-link type="danger" icon="el-icon-delete" @click="confirmDelete(scope.row)">删除</el-link>
    </template>
  </el-table-column>
</template>

<script>
import http from "../../assets/js/http";
export default {
  props: ["label", "width", "toRouter", "delApi"],
  methods: {
    confirmDelete(item) {
      const title = item.else || item.name || item.title || item.username || "";
      const tips = `确认删除 ${title} ?`;
      const url = this.delApi;
      this.$confirm(tips, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _g.openGlobalLoading();
          this.apiDelete(url, item.id).then(res => {
            _g.closeGlobalLoading();
            this.handelResponse(res, data => {
              _g.toastMsg("success", "删除成功");
              setTimeout(() => {
                _g.shallowRefresh(this.$route.name, this.$route.query);
              }, 1500);
            });
          });
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  mixins: [http]
};
</script>