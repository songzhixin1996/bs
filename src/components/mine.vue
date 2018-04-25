<template>
  <div>
    <div v-if="logined">
      <m-cell title="姓名" is-link></m-cell>
      <m-cell title="我的报案记录" is-link></m-cell>
      <m-cell title="个性签名" label="我的签名我的签名我的签名我的签名我的签名我的签名我的签名我的签名我的签名我的签名我的签名我的签名" ></m-cell>
      <m-cell title="设置" is-link></m-cell>
      <m-button class="m-button" type='danger'>退出登陆</m-button>
    </div>
    <div v-else>
      <m-cell icon='more' title="登陆/注册" is-link to='./login'></m-cell>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  data() {
    return {
      // logined: false
    };
  },
  computed: {
    ...mapState(["logined"])
  }
};
</script scoped>


<style scoped>
.m-button {
  left: 50%;
  transform: translateX(-50%);
}
</style>


