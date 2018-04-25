<template>
<div>
  <m-field label='事故编号'  placeholder="请输入事故编号"></m-field>
  <m-button class="m-button" type='primary' @click="query">确定</m-button>
  <m-field label='事故信息:'  type='textarea' rows="6" readonly></m-field></div>
</template>

<script>
/* eslint-disable */
import { MessageBox } from "mint-ui";
export default {
  methods: {
    query() {
      this.$router.back();
    }
  }
};
</script>

<style>
.m-button {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
