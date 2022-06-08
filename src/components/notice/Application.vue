<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      :default-sort="{ prop: 'sender_time', order: 'descending' }"
    >
      <el-table-column prop="groupname" label="申请团队" width="400">
      </el-table-column>
      <el-table-column prop="sender_name" label="申请者" width="300">
      </el-table-column>
      <el-table-column prop="sender_time" label="申请时间" sortable width="300">
      </el-table-column>
      <el-table-column prop="action" label="操作">
        <el-button type="primary" plain @click="agree_application(item.id)"
          >同意</el-button>
        <el-button type="danger" plain @click="refuse_application(item.id)"
          >拒绝</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
const axios = require('axios');

const data = [
];

export default {
  data() {
    return {
      data
    };
  },
  mounted :function(){
    this.get_confirm_apply_notice();
  },
  methods :{
    get_confirm_apply_notice() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:8080/api/api/view_confirm_apply_notice", formData, config)
        .then(function (response) {
            _this.data=response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    agree_application(id){
      var _this=this
      var item=this.data.find(item => item.id==id);
      console.log(item.id+":要同意的noticeid");
      let formData = new FormData();
      formData.append("id",item.id);
      formData.append("userid", item.receiver_id);
      formData.append("groupid",item.group_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post("http://localhost:8080/api/api/accept_application_addgroupmember", formData, config)
        .then(function () {
            console.log(response.data.message);
            _this.data=_this.data.filter((record)=>record.id!=item.id)
            _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    refuse_application(id){
      var item=this.data.find(item => item.id==id);
      var _this=this;
      console.log(item.id+":要拒绝的noticeid");
      let formData = new FormData();
      formData.append("id",item.id);
      formData.append("userid", item.receiver_id);
      formData.append("groupid",item.group_id);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      
      axios
        .post("http://localhost:8080/api/api/refuse_application_addgroupmember", formData, config)
        .then(function () {
            _this.data=_this.data.filter((record)=>record.id!=item.id)
            _this.$emit('updatenotice');
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },
  },
};
</script>