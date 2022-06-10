<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="group" v-show="groupVisible">
      <el-row>
        <el-col :span = 4>
        <div style="color: black" class="groupName" @click="InfoboxClick"> {{groupName}} </div>
        </el-col>
        <el-col :span = 12 :offset= 0 class="grouper">
        <span @click="InfoboxClick"> 创建于 {{createdTime.substring(0,10)}}，</span>
          <span @click="InfoboxClick"> 团队简介:{{description}} </span>
          <!-- <span @click="InfoboxClick"> 创建于 {{createdTime.substring(0,10)}} </span> -->
<!--          <div @click="InfoboxClick" v-if="judge === 'join'"> 创建者: {{grouper}} </div>
          <div @click="InfoboxClick" v-if="judge === 'create'"> 创建者: {{userID}} </div>-->
        </el-col>
        <el-col  :span = 8  v-if="judge === 'join'">
          <template>
            <el-popover
                placement="top-start"
                title="请输入您想邀请人员的信息"
                width="200px"
                trigger="click"
                
            >
              <el-form ref="inviteForm" :model="inviteForm" label-width="80px" v-if="inviteVisible">
                <el-form-item label="用户名">
                  <el-input v-model="inviteForm.userName"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="confirmInvite" :disabled="invitable" style="float:right;">发送邀请</el-button>
                </el-form-item>
              </el-form>
              <el-button slot="reference" icon="el-icon-user-solid" plain @click="inputUser" size="small" style="float:right;">发送邀请</el-button>

            </el-popover>
            <el-popconfirm
                confirm-button-text='确定'
                @confirm="quitConfirm"
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确认要退出该团队吗？"
            >
              <el-button icon="el-icon-s-release" slot="reference" plain size="small" style="float:right;">退出团队</el-button>
            </el-popconfirm>
          </template>
        </el-col>
        <el-col  :span = 8 v-if="judge === 'create'">
          <el-popover
              placement="top-start"
              title="请输入您想邀请人员的信息"
              width="200px"
              trigger="click"
          >
            <el-form ref="inviteForm" :model="inviteForm" label-width="80px" v-if="inviteVisible">
              <el-form-item label="用户名">
                <el-input v-model="inviteForm.userName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="confirmInvite" :disabled="invitable">邀请</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" icon="el-icon-user-solid" plain @click="inputUser" size="small" style="float:right;">发送邀请</el-button>
          </el-popover>
          <el-popover
              placement="top-start"
              title="请输入新的团队信息"
              width="200px"
              trigger="click"
          >
            <el-form ref="modifyForm" :model="modifyForm" label-width="80px" v-if="modifyVisible">
              <el-form-item label="团队名">
                <el-input v-model="modifyForm.groupname"></el-input>
              </el-form-item>
              <el-form-item label="团队简介">
                <el-input v-model="modifyForm.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="modifyGroup" :disabled="modifyable">确认修改</el-button>
              </el-form-item>
            </el-form>
            <el-button slot="reference" icon="el-icon-tickets" plain @click="modifyGroupShow" size="small" style="float:right;">修改团队信息</el-button>

          </el-popover>
          <el-button icon="el-icon-user" size="small" @click="manageMem" style="float:right;">管理成员</el-button>
          <el-drawer
              title="群成员"
              :visible.sync="drawerVisible"
          >
          <grouper-info v-for="item in grouperInfo"
                        :leader-id="userID"
                        :group-id="groupId"
                        :user-id="item.id"
                        :user-name="item.username">
          </grouper-info>
          </el-drawer>
          <el-popconfirm
              confirm-button-text='确定'
              @confirm="disbandGroup"
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确认要解散该团队吗？"
          >
            <el-button  icon="el-icon-delete-solid" plain slot="reference" size="small" style="float:right;">解散团队</el-button>
          </el-popconfirm>
        </el-col>
      </el-row>

    </div>
  </div >

</template>

<script>
function myrefresh() {
  window.location.reload();
}
const axios = require('axios');
import GrouperInfo from "@/components/GrouperInfo";
export default {
  name: "GroupInfobox",
  components: {GrouperInfo},
  data(){
    return{
      modifyVisible:false,
      modifyable:true,
      grouperInfo:[],
      drawerVisible:false,
      invitable:true,
      groupVisible:true,
      inviteVisible:false,
      value:true,
      inviteForm:{
        userName: ""
      },
      cur_userID:"",
      groupNew:{
        groupname:'',
        groupDescription: '',
        groupId:{
          type:Number
        }
      },
      modifyForm:{
        groupname:"",
        groupDescription:""
      }
    }
  },
  props:{
    groupName:{
      type:String,
    },
    grouper:{
      type:String,
    },
    groupId:{
      type:Number,
    },
    userID:{
      type:Number,
    },
    judge:{
      type:String,
    },
    description:{
      type:String
    },
    createdTime:{
      type:String
    }
  },
  watch:{
      "inviteForm.userName":{
      immediate:true,
      handler(){
        this.invitable = this.inviteForm.userName === '';
      }
    },
    "modifyForm.groupname":{
      immediate:true,
      handler(){
        this.modifyable = this.modifyForm.groupname === '';
      }
    },
  },
  methods:{
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    InfoboxClick(){
      //alert('Chenggong');
      this.groupNew.groupDescription=this.description;
      this.groupNew.groupname=this.groupName;
      this.groupNew.groupId=this.groupId;
      this.$emit('isClick',this.groupNew);
    },
    modifyGroupShow(){
      this.modifyVisible = true;
    },
    modifyGroup(){
      this.modifyVisible = false;
      var _this=this;
      let formData = new FormData();
      formData.append("groupid", this.groupId);
      formData.append("groupname", this.modifyForm.groupname);
      formData.append("description", this.modifyForm.description);
      console.log(this.modifyForm.groupname);
      console.log(this.modifyForm.description);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
          .post(
              "http://localhost:8080/api/api/modify_group_info",
              formData,
              config
          )
          .then(function (response) {
            if (response.data.message === "success") {
              _this.successmsg("修改成功");
              setTimeout(() => {
                myrefresh();
              }, 2000);
            } else {
              _this.errormsg("修改团队信息失败，请尝试刷新后再次创建");
            }
          })
          .catch(function () {
            _this.errormsg("修改团队信息失败，请尝试刷新后再次创建");
          });
    },
    manageMem(){
      this.drawerVisible = true;
      var _this = this;
      let formData = new FormData();
      formData.append('groupid',Number(this.groupId));
      console.log(this.groupId);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      axios.post("http://localhost:8080/api/api/get_user_bygroup", formData, config)
          .then(function (response) {
            if(response){
              _this.grouperInfo = response.data;
            }
          })
          .catch(function () {
            _this.errormsg("通过组得到用户失败，请尝试刷新后重试");
          });
    },
    disbandGroup(){
      var _this = this;
      console.log("删除该项" + this.groupId);
      let formData = new FormData();
      console.log(this.groupId);
      console.log(Number(this.groupId));
      formData.append("groupid",Number(this.groupId));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
          .post("http://localhost:8080/api/api/delete_group", formData, config)
          .then(function (response) {
            console.log(response.data.message);
            if (response.data.message === "success") {
              _this.successmsg("删除成功");
              setTimeout(() => {
                myrefresh();
              }, 2000);
            } else {
              _this.errormsg("删除失败1，请尝试刷新后重试");
            }
          })
          .catch(function () {
            _this.errormsg("删除失败2，请尝试刷新后重试");
          });
    },
    quitConfirm(){
      var _this = this;
      let formData = new FormData();
      formData.append('groupid',this.groupId)
      formData.append("userid", this.userID);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      axios.post("http://localhost:8080/api/api/quit_group", formData, config)
          .then(function (response) {
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
      var _this = this;
      var id = "";
        let formData = new FormData();
        formData.append("username", this.inviteForm.userName);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        };
        axios.post("http://localhost:8080/api/api/get_user", formData, config)
            .then(function (response) {
              if(response) {
                id=response.data.id;
                _this.cur_userID = response.data.id;
                console.log('成功获取id '+id);
              }
              else {
                alert("请先登录！");
              }
            })
            .catch(function () {
              _this.errormsg("获取被邀请人id失败，请尝试刷新后重试");
            });
      setTimeout(() => {
        //代码
        formData = new FormData();
        console.log(this.cur_userID * 1);
        console.log(parseInt(this.groupId));
        console.log(localStorage.getItem('token'));
        formData.append("userid",parseInt(this.cur_userID));
        formData.append("groupid", parseInt(this.groupId));
        formData.append("leader_username", localStorage.getItem('token'));
        axios.post("http://localhost:8080/api/api/invite_user", formData, config)
            .then(function (response) {
              if (response) {
                _this.successmsg("邀请成功");
                setTimeout(() => {
                  myrefresh();
                }, 1000);

              } else {
                _this.errormsg("邀请失败");
              }
            })
            .catch(function (error) {
              console.log("wrong", error);
            });
      }, 1000);

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
  font-family: "华文行楷";
  /*background-color: #0080ff;*/
  font-size: 20px;
}
.grouper{
  font-family: "PingFang SC";
  /*background-color: #42b983;*/
  font-size: 18px;
  text-align: left;
}
.group{
  /*pointer-events: none;*/
}
</style>
