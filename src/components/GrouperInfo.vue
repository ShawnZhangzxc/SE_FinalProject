<template>
  <div class="grouper-info" v-if="memberInfoVisible">
    <el-row>
      <el-col :span=6 style="font-family: Consolas">{{userName}}</el-col>
      <el-col :span=6 style="font-family: Consolas">{{userId}}</el-col>
      <el-popconfirm
          confirm-button-text='确定'
          @confirm="removeMem"
          cancel-button-text='取消'
          icon="el-icon-info"
          icon-color="red"
          title="确认要移除该成员吗？"
      >
      <el-button icon="el-icon-remove"
                 style="color: black;
                 border-color: #333333"
                 slot="reference"
                 v-if="leaderId !== userId"
      >
        移除成员
      </el-button>
      </el-popconfirm>
    </el-row>
  </div>
</template>

<script>
function myrefresh() {
  window.location.reload();
}
const axios = require('axios');
export default {
  name: "GrouperInfo",
  data(){
    return{
      memberInfoVisible:true
    }
  },
  props:{
    userName:{
      required:true,
      type:String
    },
    userId:{
      required:true,
      type:Number
    },
    leaderId:{
      type:Number
    },
    groupId:{
      type:Number
    }
  },
  methods:{
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    removeMem(){
      this.memberInfoVisible=false;
      var _this = this;
      this.groupVisible = false;
      console.log("删除该项" + this.userId);

      let formData = new FormData();
      formData.append("userid", this.userId);
      formData.append("groupid", this.groupId);
      formData.append("leaderid", this.leaderId);
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
          .post("http://localhost:8080/api/api/delete_user", formData, config)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message === "success") {
              _this.successmsg("删除成功");
              setTimeout(() => {
                myrefresh();
              }, 1500);
            } else {
              _this.errormsg("删除失败，请尝试刷新后重试");
            }
          })
          .catch(function () {
            _this.errormsg("删除失败，请尝试刷新后重试");
          });
    }
  }
}
</script>

<style scoped>
.grouper-info{
  background-color: #fcfcfd;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 3px;
  border-radius: 5px;
  border-style:solid;
  border-width:1px;
  border-color: #888888;
  box-shadow: 2px 2px 2px #888888;
 /* opacity: 0.3;*/
}
.grouper-info:hover{
  background-color: #f6f2f2;
}
</style>
