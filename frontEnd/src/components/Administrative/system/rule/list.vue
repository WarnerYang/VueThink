<template>
  <div>
    <div class="m-b-20">
      <router-link class="btn-link-large add-btn" to="add">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;添加节点
      </router-link>
    </div>
    <el-table :data="tableData" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="p_title" label="节点结构"></el-table-column>
      <el-table-column prop="title" label="显示名"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <listStatus></listStatus>
      <listActions :toRouter="'ruleEdit'" :deleteUrl="'admin/rules/'"></listActions>
    </el-table>
    <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'rules'"></btnGroup>
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
    }
  },
  created() {
    this.apiGet("admin/rules").then(res => {
      this.handelResponse(res, data => {
        this.tableData = data;
      });
    });
  },
  computed: {
    addShow() {
      return _g.getHasRule("rules-save");
    },
    editShow() {
      return _g.getHasRule("rules-update");
    },
    deleteShow() {
      return _g.getHasRule("rules-delete");
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