<template>
  <div>
    <div class="m-b-20">
      <router-link class="btn-link-large add-btn" to="add">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;添加岗位
      </router-link>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="岗位名称" prop="name"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <listStatus></listStatus>
      <listActions :toRouter="'positionEdit'" :delApi="'admin/posts/'"></listActions>
    </el-table>
    <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'posts'"></btnGroup>
    </div>
  </div>
</template>

<script>
import btnGroup from "../../../Common/btnGroup.vue";
import listStatus from "../../../Common/listStatus.vue";
import listActions from "../../../Common/listActions.vue";
import http from "../../../../assets/js/http";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: []
    };
  },
  methods: {
    selectItem(val) {
      this.multipleSelection = val;
    },
    getPositions() {
      this.apiGet("admin/posts").then(res => {
        this.handelResponse(res, data => {
          this.tableData = data;
        });
      });
    }
  },
  created() {
    this.getPositions();
  },
  computed: {
    addShow() {
      return _g.getHasRule("posts-save");
    },
    editShow() {
      return _g.getHasRule("posts-update");
    },
    deleteShow() {
      return _g.getHasRule("posts-delete");
    }
  },
  components: {
    btnGroup,
    listStatus,
    listActions
  },
  mixins: [http]
};
</script>