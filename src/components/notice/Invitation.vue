<template>
    <div>
        <el-table :data="data" style="width: 100%" :default-sort = "{prop: 'datetime', order: 'descending'}">
            <el-table-column prop="group_name" label="邀请团队" width="400">
            </el-table-column>
            <el-table-column prop="sender_name" label="邀请者" width="300">
            </el-table-column>
            <el-table-column prop="datetime" label="邀请时间" sortable width="300">
            </el-table-column>
            <el-table-column prop="action" label="操作">
              <template scope="item">
                <el-button type="primary" plain @click="agree_invitation(item.row.id)">接受</el-button>
                <el-button type="danger" plain @click="refuse_invitation(item.row.id)">拒绝</el-button>
              </template>
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
    this.get_confirm_notice();
  },
  methods :{
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    get_confirm_notice() {
      let formData = new FormData();
      formData.append("receiver_username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      var _this = this;
      axios
        .post("http://localhost:8080/api/api/view_confirm_notice", formData, config)
        .then(function (response) {
            _this.data=response.data;
        })
        .catch(function (error) {
          console.log("Fail", error);
        });
    },

    agree_invitation(id){
      var _this=this
      var item=this.data.find(item => item.id==id);
      console.log(item.id+":要接受的noticeid");
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
        .post("http://localhost:8080/api/api/addgroupmember", formData, config)
        .then(function () {
            _this.data=_this.data.filter((record)=>record.id!=item.id)
            _this.$emit('updatenotice');
            _this.successmsg("已接受邀请");
        })
        .catch(function (error) {
          console.log("Fail", error);
          _this.errormsg("接受邀请失败，请重试");
        });
    },

    refuse_invitation(id){
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
        .post("http://localhost:8080/api/api/refuse_groupmember", formData, config)
        .then(function () {
            _this.data=_this.data.filter((record)=>record.id!=item.id)
            _this.$emit('updatenotice');
            _this.successmsg("已拒绝邀请");
        })
        .catch(function (error) {
          console.log("Fail", error);
          _this.errormsg("拒绝邀请失败，请重试");
        });
    },
  },
};
</script>