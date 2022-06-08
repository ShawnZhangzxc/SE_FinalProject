<template>
  <div>
    <div >
      <!-- 这是我加入的团队 页面 -->
      <div id="group-show" v-if="!groupHomeVisible">
        <div v-if="judge === 'join'" class="head-line">我加入的团队</div>
        <div v-if="judge === 'create'" class="head-line">我创建的团队</div>
        <!-- <group-infobox group-name="软工小队" grouper="Shake" group-id="" user-i-d="" :judge="judge" v-on:isClick="isClick"></group-infobox>
        <group-infobox group-name="建模小队" grouper="Wu" group-id="" user-i-d="" :judge="judge" v-on:isClick="isClick"></group-infobox> -->
        <group-infobox v-for="item in message"
                       :user-i-d="item.userId"
                       :group-id="item.groupId"
                       :grouper="item.grouper"
                       :group-name="item.groupName"
                       v-on:isClick="isClick"
                       :judge="judge"
        >
        </group-infobox>
      </div>
      <!-- <div>
        <group-home v-if="groupHomeVisible" v-on:isClick="isClick"></group-home>
      </div> -->
    </div>
  </div>
</template>

<script>
import GroupInfobox from "@/components/GroupInfobox";
const axios = require('axios');
export default {
  name:"GroupDisplay",
  components: {GroupInfobox},
  props:{
    judge: {
      type:String,
      required:true
    }
  },
  data(){
    return{
      userId:"",
      message: [
        // {
        //   userId:"1234",
        //   groupId:"200001",
        //   grouper:"徐悲鸿",
        //   groupName:"马到成功"
        // },
        // {
        //   userId:"5678",
        //   groupId:"200002",
        //   grouper:"齐白石",
        //   groupName:"虾米"
        // },
      ]
    }
  },
  methods:{
    load_userId(){
      this.userId = localStorage.getItem("token");
    },
    successmsg(message) {
      this.$message.success(message);
    },
    errormsg(message) {
      this.$message.error(message);
    },
  },
  mounted() {
    this.load_userId();
    var _this = this;
    let formData = new FormData();
    formData.append('userId',this.userId)
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };
    axios.post("http://localhost:8080/api/api/mygroup", formData, config)
        .then(function (response) {
          _this.data().message = response.data();
        })
        .catch(function () {
          _this.errormsg("失败，请尝试刷新后重试");
        });
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
