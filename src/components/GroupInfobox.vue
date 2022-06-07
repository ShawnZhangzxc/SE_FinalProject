<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="group" v-show="groupVisible">
      <el-row>
        <el-col :span = 6>
        <div style="color: black" class="groupName" @click="InfoboxClick"> {{groupName}} </div>
        </el-col>
        <el-col :span = 6 :offset=3 class="grouper">

          <div @click="InfoboxClick"> 创建者: {{grouper}} </div>
        </el-col>
        <el-col  :span = 6 :offset = 3 v-if="judge === 'join'">
          <template>
            <el-popover
                placement="top-start"
                title="请输入您想邀请人员的信息(●'◡'●)"
                width="200px"
                trigger="click"
            >
              <el-form ref="inviteForm" :model="inviteForm" label-width="80px" v-if="inviteVisible">
                <el-form-item label="用户ID" :rules="[{required: true, message: '用户ID不能为空！',trigger: 'blur'}]">
                  <el-input v-model="inviteForm.userID"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="inviteForm.userName"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="confirmInvite" :disabled="invitable">邀请</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" icon="el-icon-user-solid" plain @click="inputUser" size="medium">邀请</el-button>

            </el-popover>
            <el-popconfirm
                confirm-button-text='确定'
                @confirm="quitConfirm"
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确认要退出该团队吗？"
            >
              <el-button icon="el-icon-s-release" slot="reference" plain size="medium">退出团队</el-button>
            </el-popconfirm>
          </template>
        </el-col>
        <el-col  :span = 9 v-if="judge === 'create'">
          <el-button icon="el-icon-user" size="small" @click="manageMem">管理成员</el-button>
          <el-drawer
              title="群成员"
              :visible.sync="drawerVisible"
          >
          <grouper-info v-for="item in grouperInfo"
                        :user-id="item.grouperId"
                        :user-name="item.grouperName">
          </grouper-info>
          <grouper-info user-id="123456789" user-name="徐志摩"></grouper-info>
          </el-drawer>
          <el-popconfirm
              confirm-button-text='确定'
              @confirm="disbandGroup"
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确认要解散该团队吗？"
          >
            <el-button  icon="el-icon-delete-solid" plain slot="reference" size="small">解散团队</el-button>
          </el-popconfirm>
        </el-col>
      </el-row>

    </div>
  </div >

</template>

<script>
import GrouperInfo from "@/components/GrouperInfo";
export default {
  name: "GroupInfobox",
  components: {GrouperInfo},
  data(){
    return{
      grouperInfo:[
        {
        grouperName:"老王",
        grouperId:"12345"
        },
        {
          grouperName:"老李",
          grouperId:"12346"
        },
      ],
      drawerVisible:false,
      invitable:true,
      groupVisible:true,
      inviteVisible:false,
      value:true,
      inviteForm:{
        userID: "",
        userName: ""
      }
    }
  },
  props:{
    groupName:{
      type:String,
      required:true
    },
    grouper:{
      type:String,
      required: true
    },
    groupId:{
      type:String,
      required: true
    },
    userID:{
      type:String,
      required: true
    },
    judge:{
      type:String,
      required: true
    }
  },
  watch:{
      "inviteForm.userID":{
      immediate:true,
      handler(){
        this.invitable = this.inviteForm.userID === '';
      }
    }},
  methods:{
    InfoboxClick(){
      //alert('Chenggong');
      this.$emit('isClick',this.groupId);
    },
    manageMem(){
      this.drawerVisible = true;
      var _this = this;
      let formData = new FormData();
      formData.append('groupid',this.groupId)
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      axios.post("http://localhost:5000/api/joined_group/", formData, config)
          .then(function (response) {
            _this.grouperInfo = response.data();
          })
          .catch(function () {
            _this.errormsg("退出失败，请尝试刷新后重试");
          });
    },
    disbandGroup(){
      var _this = this;
      this.$message({
        message: '解散成功',
        type: 'success'
      });
      this.groupVisible = false;
      console.log("删除该项" + item.groupId);
      _this.data.splice(item, 1);

      let formData = new FormData();
      formData.append("groupid", item.groupId);
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
    },
    quitConfirm(){
      var _this = this;
      //---------------------下面两条语句实际中删掉---------------------------//
      this.groupVisible=false;
      this.$message({
        message: '成功退出',
        type: 'success'
      });
      let formData = new FormData();
      formData.append('groupName',this.groupName)
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      axios.post("http://localhost:5000/api/quit_group/", formData, config)
          .then(function (response) {
            this.groupVisible=false;
            console.log("返回的结果是" + response.data.message);
            if (response.data.message === "success") {
              _this.successmsg("退出成功");
              setTimeout(() => {
                //_this.$router.go(-1);
                window.location.reload();
              }, 2000);
            } else {
              _this.errormsg("退出失败，请尝试刷新后重试");
            }
          })
          .catch(function () {
            _this.errormsg("退出失败，请尝试刷新后重试");
          });
    },
    inputUser(){
      //this.groupVisible=false;
      this.inviteVisible=true;
    },
    cancelInvite(){
      this.inviteVisible=false;
      this.value=false;
    },
    confirmInvite(){
      this.$message({
        message: '邀请成功',
        type: 'success'
      });
      var _this = this;
      let formData = new FormData();
      formData.append("user_id",this.inviteForm.userID);
      formData.append("group_id", this.groupId);
      formData.append("leader_username", localStorage.getItem('token'));

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:5000/api/invite_user/", formData, config)
          .then(function (response) {
            if (response) {
              _this.$message({
                message: '邀请成功',
                type: 'success'
              });
              setTimeout(() => {
                myrefresh();
              }, 2000);

            } else {
              _this.errormsg("邀请失败");
            }
          })
          .catch(function (error) {
            console.log("wrong", error);
          });
    }
  }
}
</script>

<style scoped>
.group{
  border-radius:10px;
  height: 70px;
  width: 1250px;
  background-color:#fcfcfd;
  margin-top: 2px;
  margin-left: 25px;
  color: #000000 ;
  font-size: 15px;
  line-height: 70px;
  border-style:solid;
  border-width:1px;
  border-color: #eeeeee;
}
.group:hover{
  background-color:#fcfafa;
}
.groupName{
  font-family: "PingFang SC";
  /*background-color: #0080ff;*/
  font-size: 20px;
}
.grouper{
  font-family: "华文行楷";
  /*background-color: #42b983;*/
  font-size: 18px;
  text-align: left;
}
.group{
  /*pointer-events: none;*/
}
</style>
