<template>
  <div>
    <m-header title="交通事故处理查询系统" >
      <router-link :to="{name:'login'}" slot="left" replace>
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header>
    <div class="content">
      <m-field label="邮箱" placeholder="请输入邮箱" v-model="email"></m-field>
      <m-button size='large' type='primary' @click="sendEmail" :disabled='disabled'>{{msg}}</m-button>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
export default {
  data() {
    return {
      email: "",
      msg: "发送",
      count: 60,
      disabled: false
    };
  },
  methods: {
    startCount() {
      let a = setInterval(() => {
        this.msg--;
        if (this.msg === 0) {
          clearInterval(a);
          this.msg = "重新发送";
          this.disabled = false;
        }
      }, 1000);
    },
    sendEmail() {
      if (this.email) {
        Indicator.open();
        this.$axios.get("/api/user/sendEmail?email=" + this.email).then(res => {
          Indicator.close();
          if (res.data.code === 1) {
            this.email = "";
            //禁用发送按钮设置为60秒后才能点击
            this.msg = this.count;
            this.startCount();
            this.disabled = true;
            // this.startCount();
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
.content {
  margin-top: 5px;
}
</style>
