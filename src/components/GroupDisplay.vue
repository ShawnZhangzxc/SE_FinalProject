<template>
  <div>
    <div >
      <!-- 这是我加入的团队 页面 -->
      <div id="group-show" v-if="!groupHomeVisible">
        <div v-if="judge === 'join'" class="head-line">我加入的团队</div>
        <div v-if="judge === 'create'" class="head-line">我创建的团队</div>
        <group-infobox group-name="软工小队" grouper="Shake" group-id="" user-i-d="" :judge="judge" v-on:isClick="isClick"></group-infobox>
        <group-infobox group-name="建模小队" grouper="Wu" group-id="" user-i-d="" :judge="judge" v-on:isClick="isClick"></group-infobox>
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
      <div>
        <group-home v-if="groupHomeVisible" v-on:isClick="isClick"></group-home>
      </div>
    </div>
  </div>
</template>

<script>
import GroupInfobox from "@/components/GroupInfobox";
import GroupHome from "@/components/GroupHome";
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
      groupHomeVisible:false,
      userId:"",
      message: []
    }
  },
  methods:{
    isClick(message){
      //alert('aaaaaaa');
      this.groupHomeVisible = !this.groupHomeVisible;
      if(message !== 'return'){


      }

    },
    load_userId(){
      this.userId = localStorage.getItem("token");
    }
  },
  mounted() {
    this.load_userId();
    var _this = this;
    let formData = new FormData();
    formData.append('userId', this.userId)
    formData.append("username", localStorage.getItem("token"));
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    };
    if (this.judge === 'create') {
      axios.post("http://localhost:5000/api/group_created_byme/", formData, config)
          .then(function (response) {
            _this.data().message = response.data();
          })
          .catch(function () {
            _this.errormsg("退出失败，请尝试刷新后重试");
          });
    }
    if (this.judge === 'join') {
      axios.post("http://localhost:5000/api/mygroup/", formData, config)
          .then(function (response) {
            _this.data().message = response.data();
          })
          .catch(function () {
            _this.errormsg("退出失败，请尝试刷新后重试");
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
