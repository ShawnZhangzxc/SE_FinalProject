<template>
  <div class="grouper-info" v-if="memberInfoVisible">
    <el-row>
      <el-col :span=6 style="font-family: 楷体">{{userName}}</el-col>
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
                 style="background-color: #fbb8b5;
                 color: black;
                 border-color: #333333"
                 slot="reference"
      >
        移除成员
      </el-button>
      </el-popconfirm>
    </el-row>
  </div>
</template>

<script>
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
      type:String
    }
  },
  methods:{
    removeMem(){
      this.memberInfoVisible=false;
      var _this = this;
      this.$message({
        message: '移除成功',
        type: 'success'
      });
      this.groupVisible = false;
      console.log("删除该项" + this.userId);
      _this.data.splice(item, 1);

      let formData = new FormData();
      formData.append("userid", this.userId);
      console.log(localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
          .post("http://localhost:5000/api/delete_group/", formData, config)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message === "success") {
              _this.successmsg("删除成功");
              setTimeout(() => {
                myrefresh();
              }, 2000);
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
  background-color: lightblue;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 3px 3px 2px #888888;
 /* opacity: 0.3;*/
}
.grouper-info:hover{
  background-color: #7ab7f1;
}
</style>
