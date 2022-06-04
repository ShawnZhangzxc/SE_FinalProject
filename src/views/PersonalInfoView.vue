<template>
  <div class="PersonalInfo" style="width:1000px;margin:0px auto;">
  <DisplayPersonalInfo v-if='display_info'></DisplayPersonalInfo>
  <ChangePersonalInfo v-if='display_change'></ChangePersonalInfo>
  </div>
</template>




<script>

const axios = require('axios');

import ChangePersonalInfo from '../components/ChangePersonalInfo'
import DisplayPersonalInfo from '../components/DisplayPersonalInfo'

export default {
  components:{
    ChangePersonalInfo,
    DisplayPersonalInfo,
  },
   data(){
    return{
      display_change:false,
      display_info:true,
    }
  } ,
  methods:{
      to_dispaly_change() {
      this.display_change=true;
      this.display_info=false;
      console.log("change调用");
      console.log(this.display_change);
      console.log(this.dispaly_info);
    },
    to_display_info() {
      this.display_change=false;
      this.display_info=true;
      console.log("info调用");
      console.log(this.display_change);
      console.log(this.dispaly_info);
    }
  }
}
</script>