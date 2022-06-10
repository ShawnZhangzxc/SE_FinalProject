<template>
    <div>
        <el-table :data="data" style="width: 100%" :default-sort = "{prop: 'datetime', order: 'descending'}">
            <el-table-column prop="datetime" label="通知时间" sortable width="300">
            </el-table-column>
            <el-table-column prop="content" label="通知内容" width="600">
            </el-table-column>
            <el-table-column prop="action" label="操作">
              <template scope="item">
                <el-button type="text" @click="set_already_read(item.row.id)">标记为已读</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
const axios = require('axios');
const data = [];
export default {
    data() {
    return {
        data
    };
},
mounted: function () {
    this.get_non_confirm_notice();
},
    methods: {
    get_non_confirm_notice() {
        let formData = new FormData();
        formData.append("receiver_username", localStorage.getItem("token"));
        let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post(
          "http://localhost:8080/api/api/view_non_confirm_notice",
          formData,
          config
        )
        .then(function (response) {
          console.log(response.data);
          _this.data = response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
    
    set_already_read(id) {
      var _this = this;
      var item = this.data.find((item) => item.id == id);
      let formData = new FormData();
      formData.append("new_notice_id", item.id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/api/api/del_new_notice", formData, config)
        .then(function (response) {
          console.log(response.data.message);
          _this.data=_this.data.filter((record)=>record.id!=item.id);
          _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
  },
};
</script>