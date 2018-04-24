<template>
<div>
  <h5>事故信息</h5>
  <m-field label="事故时间" type='date'  v-model="date"></m-field>
  <m-field label="事故地点"  placeholder="请输入地点" v-model="location"></m-field>
  <h5>甲方信息</h5>
  <m-field label="甲方姓名"  placeholder="请输入甲方姓名" v-model="date"></m-field>
  <m-field label="甲方电话"  type='number' placeholder="请输入甲方电话" v-model="location"></m-field>
  <h5>乙方信息</h5>
  <m-field label="事故时间"  placeholder='请输入乙方姓名' v-model="date"></m-field>
  <m-field label="事故地点"  type='number' placeholder="请输入乙方电话" v-model="location"></m-field>
  <br>
  <div class="m-button">
    <m-button class="mButton" type='primary' @click="handleClick">完成</m-button>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import { MessageBox } from "mint-ui";
export default {
  name: "report",
  data: () => {
    return {
      username: "",
      date: "",
      location: ""
    };
  },
  methods: {
    handleClick() {
      MessageBox({
        title: "提示",
        message: "确定提交?",
        showCancelButton: true
      });
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
}
</style>
