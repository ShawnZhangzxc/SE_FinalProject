<template>
	<div>

        	<el-card class="box-card" shadow="never">
 				 <div slot="header" class="clearfix">
   				 <span>
                    <h2>文档权限管理</h2>    
                </span>
 				 </div>
                    <h3>团队成员权限</h3>
                    <el-row>
                        <el-col :span="9"><div class="grid-content bg-purple">修改文档 ：</div></el-col>
                           <el-col :span="12"><div class="grid-content bg-purple-light">
                               <template>
                                   <el-radio v-model="rightObj.others_modify_right" label="true" >是</el-radio>
                                   <el-radio v-model="rightObj.others_modify_right" label="false" >否</el-radio>
                               </template>
                           </div></el-col>
                       </el-row>
                       <el-row><br></el-row>
                       <el-row>
                           <el-col :span="9"><div class="grid-content bg-purple">分享文档 ：</div></el-col>
                           <el-col :span="12"><div class="grid-content bg-purple-light">
                               <template>
                                   <el-radio v-model="rightObj.others_share_right" label="true">是</el-radio>
                                   <el-radio v-model="rightObj.others_share_right" label="false">否</el-radio>
                               </template>
                           </div></el-col>
                       </el-row>
                       <el-row><br></el-row>
                       <el-row>
                           <el-col :span="9"><div class="grid-content bg-purple">参与讨论 ：</div></el-col>
                           <el-col :span="12"><div class="grid-content bg-purple-light">
                                <template>
                                    <el-radio v-model="rightObj.others_discuss_right" label="true">是</el-radio>
                                   <el-radio v-model="rightObj.others_discuss_right" label="false">否</el-radio>
                               </template>
                           </div></el-col>
                         </el-row>
                    
                     <h3>非团队成员权限</h3>
                     <el-row>
                           <el-col :span="9"><div class="grid-content bg-purple">修改文档 ：</div></el-col>
                           <el-col :span="12"><div class="grid-content bg-purple-light">
                               <template>
                                   <el-radio v-model="rightObj.modify_right" label="true">是</el-radio>
                                   <el-radio v-model="rightObj.modify_right" label="false">否</el-radio>
                               </template>
                           </div></el-col>
                       </el-row>
                       <el-row><br></el-row>
                       <el-row>
                           <el-col :span="9"><div class="grid-content bg-purple">分享文档 ：</div></el-col>
                          <el-col :span="12"><div class="grid-content bg-purple-light">
                               <template>
                                   <el-radio v-model="rightObj.share_right" label="true">是</el-radio>
                                   <el-radio v-model="rightObj.share_right" label="false">否</el-radio>
                               </template>
                           </div></el-col>
                       </el-row>
                      <el-row><br></el-row>
                      <el-row>
                           <el-col :span="9"><div class="grid-content bg-purple">参与讨论 ：</div></el-col>
                           <el-col :span="12"><div class="grid-content bg-purple-light">
                               <template>
                                   <el-radio v-model="rightObj.discuss_right" label="true">是</el-radio>
                                   <el-radio v-model="rightObj.discuss_right" label="false">否</el-radio>
                               </template>
                           </div></el-col>
                       </el-row>     

                       <el-button type="primary"  size="small"
                        style="float:left;margin:30px"
                       @click="load_right(propRightObj)" :disabled="!rightObj.isleader">重置</el-button>
                        <el-button type="primary"  size="small"
                       style="float:right;margin:30px"
                      @click="commit()" :disabled="!rightObj.isleader">提交</el-button>                    
                </el-card>

        	

		

	</div>
</template>

<script>
const axios = require('axios');

export default {
	name: 'accessform',

	data() {
		return{
      DocumentID:'',
			rightObj:{
				modify_right: true,
				share_right: true,
				discuss_right: true,

				others_modify_right: true,
				others_share_right: true,
				others_discuss_right: true,

				isleader: false,
				doctype:-1,
				usertype:-1,
			},
		};
	},

	props: {
    propRightObj:{
      isleader: Boolean,
      doctype: Number,
      usertype: Number,
    },
		propDocumentID:String,
	},

	watch: {
    propRightObj: {
      handler(newVal) {
        console.log("watch saw changes in propRightObj");
        this.rightObj.isleader=newVal.isleader;
        this.rightObj.doctype=newVal.doctype;
        this.rightObj.usertype=newVal.usertype;
      },
      deep: true,
      immediate: true,
    },
		propDocumentID: {
			handler(newVal) {
        var _this=this;
        this.DocumentID=newVal;
				let formData = new FormData();
				formData.append("documentID", newVal);
				let config = {
					headers: {
					"Content-Type": "multipart/form-data",
					},
				};
				axios
					.post("http://localhost:8080/api/api/tell_current_doc_right", formData, config)
					.then(function (response) {
              if (response) {						
                console.log(response.data);
                _this.rightObj.modify_right=(response.data.modify_right==1);
                _this.rightObj.share_right=(response.data.share_right==1);
                _this.rightObj.discuss_right=(response.data.discuss_right==1);

                _this.rightObj.others_modify_right=(response.data.others_modify_right==1);
                _this.rightObj.others_share_right=(response.data.others_share_right==1);
                _this.rightObj.others_discuss_right=(response.data.others_discuss_right==1);
                console.log("loaded rights",_this.rightObj)
						}
						else{
              _this.$message.error('获取权限失败，请刷新后重试');
						}
					
					})
					.catch(function (error) {
            _this.$message.error('获取权限失败，请刷新后重试'+error);
					});
			},
			deep: true,
			immediate: true,
		}
	},

	methods: {
		personalize() {
			var _this=this;
			console.log(this.rightObj);
			if(this.rightObj.doctype==1) {
				let formData = new FormData();
				formData.append("documentID", this.propDocumentID);
				
				formData.append("username", localStorage.getItem("token"));
				let config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};
				axios
					.post("http://localhost:8080/api/api/set_document_private", formData, config)
					.then(function (response) {
						if (response.data.message=='success') {
							_this.$message.success('修改成功');
						} else {
							_this.$message.error('修改失败');
						}
					})
					.catch(function (error) {
						_this.$message.error('修改失败'+error);
					});
      } else {
        if(this.rightObj.isleader) {
          let formData = new FormData();
          formData.append("documentID", this.propDocumentID);
          formData.append("username", localStorage.getItem("token"));
          let config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          axios
            .post("http://localhost:8080/api/api/group_doc_to_personal", formData, config)
            .then(function (response) {
              if (response.data.message=='success') {
                _this.$message.success('修改成功');
              } else {
                _this.$message.error('修改失败');
              }
            })
            .catch(function (error) {
              _this.$message.error('修改失败'+error);
            });
        }else {
          console.log("权限不足")
        }
      }
		},
		load_right(newVal) {
			this.rightObj.discuss_right=newVal.discuss_right;
			this.rightObj.doctype=newVal.doctype;
			this.rightObj.modify_right=newVal.modify_right;
			this.rightObj.others_discuss_right=newVal.others_discuss_right;
			this.rightObj.others_modify_right=newVal.others_modify_right;
			this.rightObj.others_share_right=newVal.others_share_right;
			this.rightObj.share_right=newVal.share_right;
			this.rightObj.usertype=newVal.usertype;
			this.rightObj.isleader=newVal.isleader;
		},
		commit() {
			var _this=this;
			console.log(this.rightObj);
			if(this.rightObj.doctype==1) {
				let formData = new FormData();
				formData.append("documentID", this.propDocumentID);
				
				formData.append("username", localStorage.getItem("token"));
				formData.append("others_share_right",this.rightObj.others_share_right?(1-0):(0-0));
				formData.append("others_discuss_right",this.rightObj.others_discuss_right?(1-0):(0-0));
				formData.append("others_modify_right",this.rightObj.others_modify_right?(1-0):(0-0));
				let config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};
				axios
					.post("http://localhost:8080/api/api/modify_personal_doc_right", formData, config)
					.then(function (response) {
						if (response.data.message=='success') {
							_this.$message.success('修改成功');
						} else {
							_this.$message.error('修改失败');
						}
					})
					.catch(function (error) {
						_this.$message.error('修改失败'+error);
					});
			} else {
				if(this.rightObj.isleader) {
					let formData = new FormData();
					formData.append("documentID", this.propDocumentID);
					formData.append("username", localStorage.getItem("token"));
					formData.append("share_right",this.rightObj.share_right?(1-0):(0-0));
					formData.append("discuss_right",this.rightObj.discuss_right?(1-0):(0-0));
					formData.append("modify_right",this.rightObj.modify_right?(1-0):(0-0));
					formData.append("others_share_right",this.rightObj.others_share_right?(1-0):(0-0));
					formData.append("others_discuss_right",this.rightObj.others_discuss_right?(1-0):(0-0));
					formData.append("others_modify_right",this.rightObj.others_modify_right?(1-0):(0-0));
					let config = {
						headers: {
							"Content-Type": "multipart/form-data",
						},
					};
					axios
						.post("http://localhost:8080/api/api/modify_group_doc_right", formData, config)
						.then(function (response) {
							if (response.data.message=='success') {
								_this.$message.success('修改成功');
							} else {
								_this.$message.error('修改失败');
							}
						})
						.catch(function (error) {
							_this.$message.error('修改失败'+error);
						});
				}else {
					console.log("权限不足")
				}
			}
		},
	},
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 280px;
  }
</style>