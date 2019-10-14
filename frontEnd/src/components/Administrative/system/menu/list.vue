<template>
  <div>
    <div class="m-b-20">
      <router-link class="btn-link-large add-btn m-l-10" to="add">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;添加菜单
      </router-link>
    </div>
    <el-table :data="tableData" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <!-- <el-table-column prop="p_title" label="上级菜单" width="150"></el-table-column> -->
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="url" label="路径"></el-table-column>
      <el-table-column prop="menu_type" label="类型">
        <template scope="scope">{{scope.row.menu_type | menuType}}</template>
      </el-table-column>
      <listStatus></listStatus>
      <listActions :toRouter="'menuEdit'" :deleteUrl="'admin/menus/'" :isLastData="isLastData"></listActions>
    </el-table>
    <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'menus'" :isLastData="isLastData"></btnGroup>
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
      multipleSelection: [],
      isLastData: false
    };
  },
  methods: {
    selectItem(val) {
      this.multipleSelection = val;
      this.isLastData =
        this.multipleSelection.length === this.tableData.length ? true : false;
    }
  },
  created() {
    this.apiGet("admin/menus").then(res => {
      this.handelResponse(res, data => {
        this.tableData = data;
      });
    });
  },
  computed: {
    addShow() {
      return _g.getHasRule("menus-save");
    },
    editShow() {
      return _g.getHasRule("menus-update");
    },
    deleteShow() {
      return _g.getHasRule("menus-delete");
    }
  },
  watch: {
    tableData(val) {
      this.isLastData = val.length === 1 ? true : false;
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