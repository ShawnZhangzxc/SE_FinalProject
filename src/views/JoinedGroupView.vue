<template>
  <div >
    <new-group-button v-on:newGroupButtonClicked="isClick"></new-group-button>
    <group-display judge="join" v-if="groupVisible"></group-display>
  </div>
</template>

<style>


</style>


<script>
import GroupDisplay from "@/components/GroupDisplay";
import NewGroupButton from "@/components/NewGroupButton";
export default {
  components: {NewGroupButton, GroupDisplay},
  data(){
    return{
      groupVisible:true
    }
  },
  methods:{
    isClick(){
      this.groupVisible = !this.groupVisible;
    }
  }

}
</script>
