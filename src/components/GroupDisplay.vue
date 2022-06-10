<template>
  <div>
    <div >
      <!-- 这是我加入的团队 页面 -->
      <div id="group-show" v-if="!groupHomeVisible">
        <div v-if="judge === 'join'" class="head-line">我加入的团队</div>
        <div v-if="judge === 'create'" class="head-line">我创建的团队</div>
        <group-infobox v-for="item in message"
                       :user-i-d="userId"
                       :group-id="item.groupid"
                       :createdTime="item.createdtime"
                       :grouper="item.leader"
                       :group-name="item.groupname"
                       :description="item.description"
                       v-on:isClick="isClick"
                       :judge="judge"
        >
        </group-infobox>
      </div>
      <div>
        <group-home v-if="groupHomeVisible"
                    v-on:isClick="isClick"
                    :group-name="groupNew.groupname"
                    :group-description="groupNew.groupDescription"
                    :groupid="groupNew.groupId"
        >
        </group-home>
      </div>
    </div>
  </div>
</template>

<script>
import GroupInfobox from "@/components/GroupInfobox";
import GroupHome from "@/components/GroupHome";
const axios = require('axios');
const data= [
  //
  //
  //

];
export default {
  name:"GroupDisplay",
  components: { GroupHome, GroupInfobox},
  props:{
    judge: {
      type:String,
      required:true
    }
  },
  data(){
    return{
      data,
      groupHomeVisible:false,
      userId:"",
      message: [],
      groupName:'',
      groupDescription:'',
      groupNew:{
        groupDescription:'',
        groupname:'',
        groupId:{
          type:Number
        }

      }
    }
  },
  methods:{
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
    isClick(msg){
      this.groupHomeVisible = !this.groupHomeVisible;
      console.log(msg);
      if(msg !== 'return'){
        console.log(msg);
        console.log(msg.groupDescription);
        console.log(msg.groupname);
        console.log(msg.groupId);
        this.groupNew.groupDescription=msg.groupDescription;
        this.groupNew.groupId=msg.groupId;
        this.groupNew.groupname=msg.groupname;
      }

    },
    load_userId(){
      var _this = this;
      let formData = new FormData();
      formData.append("username", localStorage.getItem("token"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      axios.post("http://localhost:8080/api/api/get_user", formData, config)
          .then(function (response) {
            if(response) {
              _this.userId=response.data.id;
              console.log('成功获取id'+_this.userId);
            }
            else {
              alert("请先登录！");
            }
          })
          .catch(function () {
            _this.errormsg("装载userid失败，请尝试刷新后重试");
          });
    }
  },
  mounted() {
    this.load_userId();
    this.message=[];
    var _this = this;
    let formData = new FormData();
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };
    console.log( localStorage.getItem("token"));
    console.log('wwwwwww');
    if (this.judge === 'create') {
      axios.post("http://localhost:8080/api/api/group_created_byme", formData, config)
          .then(function (response) {
            if(response) {
              _this.message=response.data;
              _this.data = response.data;
              console.log("创建团队列表加载完成1");
              console.log(response);
              console.log("创建团队列表加载完成2");
            }
            else {
              alert("请先登录！");
            }
          })
          .catch(function () {
            _this.errormsg("我创建的团队加载失败，请尝试刷新后重试");
          });
    }
    if (this.judge === 'join') {
      axios.post("http://localhost:8080/api/api/mygroup", formData, config)
          .then(function (response) {
            if(response) {
              _this.message=response.data;
              _this.data = response.data;

              console.log("加入团队列表加载完成1");
              console.log(response);
              console.log("加入团队列表加载完成2");
            }
            else {
              alert("请先登录！");
            }
          })
          .catch(function () {
            _this.errormsg("我加入的团队加载失败，请尝试刷新后重试");
          });
    }
  }
}
</script>

<style>
#group-show{
  padding-bottom: 20px;
  padding-top:10px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.7);
  border-radius:10px;
  background-color: #ffffff;
  width: 1300px;
  margin:0 auto;
}
.head-line{
  text-align: left;
  padding-left: 50px;
  font-size: 30px;
  height: 60px;
  line-height: 1px;
}


</style>
