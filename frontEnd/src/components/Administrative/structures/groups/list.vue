<template>
  <div>
    <div class="m-b-20">
      <router-link class="btn-link-large add-btn" to="add">
        <i class="el-icon-plus"></i>&nbsp;&nbsp;添加用户组
      </router-link>
    </div>
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column label="组名" prop="title"></el-table-column>
      <el-table-column label="描述" prop="remark"></el-table-column>
      <listStatus></listStatus>
      <listActions :toRouter="'groupsEdit'" :deleteUrl="'admin/groups/'"></listActions>
    </el-table>
    <div class="pos-rel p-t-20">
      <btnGroup :selectedData="multipleSelection" :type="'groups'"></btnGroup>
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
    getgroups() {
      this.apiGet("admin/groups").then(res => {
        this.handelResponse(res, data => {
          this.tableData = data;
        });
      });
    }
  },
  created() {
    this.getgroups();
  },
  computed: {
    addShow() {
      return _g.getHasRule("groups-save");
    },
    editShow() {
      return _g.getHasRule("groups-update");
    },
    deleteShow() {
      return _g.getHasRule("groups-delete");
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