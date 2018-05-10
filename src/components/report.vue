<template>
<div>
  <h5>事故信息</h5>
  <m-field label="事故时间" type='date'  v-model="accidentDate"></m-field>
  <m-field label="事故地点"  placeholder="请输入地点" v-model="accidentPlace"></m-field>
  <h5>甲方信息</h5>
  <m-field label="甲方姓名"  placeholder="请输入甲方姓名" v-model="aName"></m-field>
  <m-field label="甲方电话"  type='number' placeholder="请输入甲方电话" v-model="aPhone"></m-field>
  <h5>乙方信息</h5>
  <m-field label="事故时间"  placeholder='请输入乙方姓名' v-model="bName"></m-field>
  <m-field label="事故地点"  type='number' placeholder="请输入乙方电话" v-model="bPhone"></m-field>
  <m-field label="描述"  type="textarea" rows="4" v-model="description" ></m-field>
  <div class="m-button">
    <m-button class="mButton" type='primary' @click="handleClick">完成</m-button>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import { MessageBox, Toast } from "mint-ui";
export default {
  name: "report",
  data: () => {
    return {
      accidentDate: "",
      accidentPlace: "",
      aName: "",
      aPhone: "",
      bName: "",
      bPhone: "",
      description: ""
    };
  },
  computed: {
    ready() {
      return (
        this.accidentDate && this.accidentPlace && this.aName && this.aPhone
      );
    },
    username() {
      return this.$store.state.username;
    }
  },
  methods: {
    clear() {
      this.accidentDate = this.accidentPlace = this.aName = this.aPhone = this.bName = this.bPhone = this.description =
        "";
    },
    handleClick() {
      if (this.ready) {
        MessageBox({
          title: "提示",
          message: "确定提交?",
          showCancelButton: true
        }).then(action => {
          if (action === "confirm") {
            this.$axios
              .post("/api/user/addReport", {
                accidentDate: this.accidentDate,
                accidentPlace: this.accidentPlace,
                aName: this.aName,
                aPhone: this.aPhone,
                bName: this.bName,
                bPhone: this.bPhone,
                description: this.description,
                username: this.username
              })
              .then(a => {
                console.log("success:!!  " + a.data.affectedRows);
                if (a.data.affectedRows) {
                  // MessageBox.alert("操作成功");
                  Toast({
                    message: "操作成功"
                  });
                  this.clear();
                } else {
                  // MessageBox.alert("操作失败");
                  Toast({
                    message: "操作失败"
                  });
                }
              })
              .catch(err => {
                console.log("error " + err);
              });
          } else {
            console.log("取消");
          }
        });
      } else {
        MessageBox.alert("请输入完整！");
      }
    }
  }
};
</script>

<style scoped>
/* div {
  text-align: center;
} */
.m-button {
  text-align: center;
  height: 80px;
}
</style>
