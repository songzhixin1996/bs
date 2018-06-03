<template>
  <div>
    <Header></Header>
    <div class="content">
      <m-field label="用户名" type='email' placeholder="请输入用户名或邮箱" v-model="username"></m-field>
      <m-field label="密码" placeholder="密码" type="password" v-model="password"></m-field>
      <m-button size='large' type='primary' @click="handleLogin">登陆</m-button>
      <div class="d1">
        <router-link to="./register" ><span class="s1">注册</span></router-link>
        <span>&nbsp; &nbsp; |&nbsp; &nbsp; </span>
        <router-link to="./findPsw"><span class="s2">忘记密码</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { MessageBox, Toast, Indicator } from "mint-ui";
import Header from "./header.vue";
export default {
  data: function() {
    return {
      username: "",
      password: ""
    };
  },
  components: {
    Header
  },
  methods: {
    handleLogin() {
      //输入不为空
      if (this.username && this.password) {
        Indicator.open({
          text: "加载中...",
          spinnerType: "fading-circle"
        });
        this.$axios
          .post("/api/user/checkLogin", {
            username: this.username,
            password: this.password
          })
          .then(a => {
            Indicator.close();
            if (a.data.code === 1) {
              Toast({ message: "登陆成功" });
              this.$store.commit("login");
              this.$store.commit("setReports", {});
              this.$router.replace("mine");
            } else if (a.data.code === 0) {
              Toast({ message: "用户名或密码不正确" });
            }
          })
          .catch(err => {
            console.log("error " + err);
          });
      } else {
        Toast({ message: "请输入完整！" });
      }
    }
  }
};
</script>

<style scoped>
.content {
  margin-top: 45px;
}
.d1 {
  margin-top: 15px;
  text-align: center;
}
a {
  text-decoration: none;
}
.s2 {
  color: #888;
}
.s1 {
  color: #26a2ff;
}
</style>

