<template>
  <div>
    <m-header title="交通事故处理查询系统" >
      <router-link :to="{name:'login'}" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header>
    <m-field label="邮箱" placeholder="请输入邮箱" v-model="email"></m-field>
    <m-button size='large' type='primary' @click="sendEmail">发送验证</m-button>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    sendEmail() {
      if (this.email) {
        Indicator.open();
        this.$axios.get("/api/user/sendEmail?email=" + this.email).then(res => {
          Indicator.close();
          if (res.data.code === 1) {
            this.email = "";
            Toast({ message: "发送成功，请查看邮箱！" });
          } else if (res.data.code === 0) {
            Toast({ message: "邮箱未注册！" });
          } else {
            Toast({ message: "发送失败！" });
          }
        });
      } else {
        Toast({ message: "邮箱格式错误！" });
      }
    }
  }
};
</script>

<style scoped>

</style>
