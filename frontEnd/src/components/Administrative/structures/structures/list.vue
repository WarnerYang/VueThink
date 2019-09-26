<template>
  <div>
    <div class="m-b-20">
      <router-link class="btn-link-large add-btn" to="add">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;添加部门
      </router-link>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="部门结构" prop="title"></el-table-column>
      <el-table-column label="部门名称" prop="name"></el-table-column>
      <listStatus></listStatus>
      <listActions :toRouter="'structuresEdit'"></listActions>
    </el-table>
    <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'structures'"></btnGroup>
    </div>
  </div>
</template>

<script>
import btnGroup from "../../../Common/btn-group.vue";
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
    getStructures() {
      this.apiGet("admin/structures").then(res => {
        this.handelResponse(res, data => {
          this.tableData = data;
        });
      });
    }
  },
  created() {
    this.getStructures();
  },
  computed: {
    addShow() {
      return _g.getHasRule("structures-save");
    },
    editShow() {
      return _g.getHasRule("structures-update");
    },
    deleteShow() {
      return _g.getHasRule("structures-delete");
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