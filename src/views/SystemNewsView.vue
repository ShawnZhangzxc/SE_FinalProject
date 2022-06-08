<template>
<div>
  <div class="slide">
    <el-menu :class="el-menu-demo" mode="horizontal" @select="handleSelect" router=true>
      <el-menu-item index="notice">系统通知</el-menu-item>
      <el-menu-item index="invitation">邀请信息</el-menu-item>
      <el-menu-item index="application">申请信息</el-menu-item>
    </el-menu>
  </div>
  <div>
    <router-view v-if="isRouterAlive" @updatenotice="updatenotice"></router-view>
  </div>
</div>
</template>
<script>
export default {
  name: 'systemnewsview',
  provide () {
    return {
      reload: this.reload
      }
  },
  data() {
    return {
      isRouterAlive: true,
      collapsed: false,
    };
  },
  methods:{  
    updatenotice(){
      this.$emit('notice');
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function() {(this.isRouterAlive = true)})
    },  
    handleSelect(key) {
        console.log(key)
        switch(key.key){
            case "notice":
                this.$router.push('/invitation') 
                break;
            case "application":
                this.$router.push('/application')
                break;
            case "notice":
                this.$router.push('/notice')
                break;
            default:
              console.log("nothing")
        }
    },
  },
}
</script>
<style>
  .slide{
    margin-top: -15px;
  }
</style>