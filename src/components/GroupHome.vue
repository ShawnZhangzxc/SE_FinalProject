<template>
  <div>
    <div>
      <div id="group-introduce">{{ groupName }}</div>
      <div style="text-align: left;">团队简介：{{groupDescription}}</div>
      <hr/>
    </div>
    <el-row>
      <el-col :span=12>
        <el-button @click="historyReturn" icon="el-icon-back"  style="float:left;">返回</el-button>
      </el-col>
      <el-col :span=12>
        <create-team-doc :teamid="groupid" style="float:right;"></create-team-doc>
      </el-col>
    </el-row>
    <!-- <create-team-doc :teamid="groupid"></create-team-doc> -->
    <!-- <div>
      <el-button  icon="el-icon-view" @click="table = true" style="margin-top: 20px">浏览团队文档</el-button>
    </div> -->
    <!-- <el-drawer
        title="团队文档"
        :visible.sync="table"
        direction="rtl"
        size="50%">
      <teamdoc :teamid="groupid" :team-name="groupName"></teamdoc>
    </el-drawer> -->
<!--    <teamdoc :teamid="groupid"></teamdoc>--> <teamdoc :teamid="groupid" :team-name="groupName"></teamdoc>
  </div>
</template>

<script>
import Teamdoc from "@/components/TeamDoc";
import CreateTeamDoc from "@/components/CreateTeamDoc";
const axios = require('axios');
export default {
  name: "GroupHome",
  components: {CreateTeamDoc, Teamdoc},
  data(){
    return{
      historyData:'return',
      table:false
    }
  },
  props:{
    groupName:{
      type:String
    },
    groupDescription:{
      type:String
    },
    groupid:{
      type:Number
    },
    docData:[]
  },
  methods:{
    historyReturn(){
      this.$emit('isClick','return');
    }
  },
  mounted() {
    var _this = this;
    let formData = new FormData();
    formData.append("groupid", this.groupid);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post("http://localhost:8080/api/api/get_group_docs", formData, config)
        .then(function (response) {
          if (response) {
            _this.docData = response.data
            console.log( _this.docData.title);
            console.log( _this.docData.creator_id);
            console.log( _this.docData.created_time);
          } else {
            _this.errormsg("初始化团队文档失败，请稍后重试");
          }
        })
        .catch(function () {
          _this.errormsg("初始化团队文档失败，请稍后重试");
        });

  }
}
</script>

<style scoped>
*{

}
#return-button{
  border-radius: 5px;
  background-color: grey;
  color: black
}
#group-introduce{
  font-family: "华文行楷";
  padding-left: 70px;
  line-height: 25px;
  text-align: left;
  font-size:35px;
  border-radius: 5px;
  background-color: #fcfcfd;
  width:auto;
  height:75px;
}
#word-display{
  margin:0 auto;
  width: 1300px;
  border-radius: 7px;
  background-color: #fcfcfd;
  padding: 20px 15px;
}
.word{
  line-height: 70px;
  background-color: #efefef;
  border-radius: 5px;
  height: 70px;
  width: auto;
}
.word:hover{
  background-color: #fefefe;
}
</style>
