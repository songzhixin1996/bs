<template>
  <div id="mine">
    <div v-if="logined">
      <div class="user-head">  
        <div class="user-img" @click="goMyInfo"> 
          <img src="../assets/bg2.png" width="80" height="80"> 
        </div>  
        <div class="user-name" @click="goMyInfo">  
          {{name}}
        </div>  
      </div>  
      <m-cell title="我的报案记录" is-link :to="'/'+username+'/myReports'"></m-cell>
      <m-cell title="个性签名" :label='motto'  ></m-cell>
      <m-cell title="设置" is-link :to="'/'+username+'/set'"></m-cell>
      <m-button class="m-button" type='danger' @click="handleLogout">退出登陆</m-button>
    </div>
    <div v-else>
      <m-cell icon='more' title="登陆/注册" is-link to='/login'></m-cell>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["logined", "username", "age", "motto", "name"])
  },
  methods: {
    goMyInfo() {
      this.$router.push(`/${this.username}/set`);
    },
    handleLogout() {
      this.$axios.get("/api/user/logoff").then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$store.commit("setUsername", "");
          Toast({ message: "注销成功" });
          let NewPage = "_empty" + "?time=" + new Date().getTime() / 1000;
          // 之后将页面push进去
          this.$router.push(NewPage);
          // 再次返回上一页即可
          this.$router.go(-1);
        }
      });
    },

    getUserInfo() {
      this.$axios
        .get("/api/user/userInfo?_date=" + new Date().getTime())
        .then(res => {
          console.log(res.data);
          if (res.data.username) {
            //已登陆
            this.$store.commit("login");
            this.$store.commit("setName", res.data.name);
            this.$store.commit("setUsername", res.data.username);
            this.$store.commit("setAge", res.data.age);
            this.$store.commit("setMotto", res.data.motto);
            this.$store.commit("setEmail", res.data.email);
          } else {
            //未登录
            this.$store.commit("logoff");
          }
        });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script scoped>


<style scoped>
.m-button {
  left: 50%;
  transform: translateX(-50%);
}

.user-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-img {
  background-color: #fff;
}

.user-img img {
  border-radius: 50%;
}
</style>


