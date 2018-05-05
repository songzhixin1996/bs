<template>
  <div>
    <m-header title="交通事故处理查询系统" fixed>
      <router-link to="/" slot="left">
        <m-button icon="back">返回</m-button>
      </router-link>
    </m-header>
    <m-field label="用户名" placeholder="请输入用户名" v-model="username"></m-field>
    <m-field label="密码" placeholder="密码" type="password" v-model="psw"></m-field>
    <m-field label="确认密码" placeholder="确认密码" type="password" v-model="rePsw"></m-field>
    <m-button size='large' type='primary' @click="handleClick">注册</m-button>
    <div class="d1">
      <router-link to="/login" ><span class="s1">登陆</span></router-link>
      <span>&nbsp; &nbsp; |&nbsp; &nbsp; </span>
      <router-link to="/findPsw"><span class="s2">忘记密码</span></router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      psw: "",
      rePsw: ""
    };
  },
  methods: {
    handleClick() {
      if (this.psw === this.rePsw) {
        this.$axios
          .get("/api/user/isExistUsername?username=" + this.username)
          .then(res => {
            // console.log(res);
            if (res.data.code === 0) {
              //可以注册
              this.$axios
                .post("/api/user/addUser", {
                  username: this.username,
                  password: this.psw
                })
                .then(res => {
                  // console.log(res);
                  if (res.data.code === 1) {
                    Toast({ message: "注册成功！" });
                    this.$router.push("./login");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else if (res.data.code === 1) {
              //username重复不能注册
              Toast({ message: "用户名已注册！" });
            }
          });
      } else {
        Toast({ message: "两次密码不同，请重新输入！" });
      }
    }
  }
};
</script>

<style scoped>
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

