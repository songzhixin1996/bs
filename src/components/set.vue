<template>
  <div class="set"> 
    <Header></Header>
    <div class="content">
      <m-cell title="姓名"  :value='temp.name' @click.native="setName"></m-cell>
      <m-cell title="用户名"  :value="userInfo.username"></m-cell>
      <m-cell title="邮箱"  :value="temp.email" @click.native="setEmail"></m-cell>
      <m-cell title="年龄"  :value="temp.age" @click.native="setAge"></m-cell>
      <m-cell title="个性签名"  :value="temp.motto" @click.native="setMotto"></m-cell>
      <m-button type="primary" class="bt" @click="updateUser">保存</m-button>
    </div>
  </div>

</template>
<style scoped>
.set {
  height: 100%;
  width: 100%;
}
.content {
  height: 100%;
  box-sizing: border-box;
  padding-top: 40px;
}
.bt {
  display: block;
  margin: 50px auto;
}
</style>
<script>
import { MessageBox, Toast, Indicator } from "mint-ui";
import { mapState } from "vuex";
import Header from "./header";
export default {
  data() {
    return {
      temp: {
        name: "",
        age: "",
        motto: "",
        email: ""
      }
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  components: {
    Header
  },
  methods: {
    init() {
      this.temp.name = this.userInfo.name;
      this.temp.age = this.userInfo.age || 0;
      this.temp.motto = this.userInfo.motto;
      this.temp.email = this.userInfo.email;
    },
    setName() {
      MessageBox.prompt("请输入姓名", "").then(({ value, action }) => {
        this.temp.name = value;
      });
    },
    setMotto() {
      MessageBox.prompt("请输入个性签名", "").then(({ value, action }) => {
        this.temp.motto = value;
      });
    },
    setAge() {
      MessageBox.prompt("请输入年龄", "").then(({ value, action }) => {
        this.temp.age = value;
      });
    },
    setEmail() {
      MessageBox.prompt("请输入邮箱", "").then(({ value, action }) => {
        this.temp.email = value;
      });
    },
    updateUser() {
      MessageBox.confirm("确定？")
        .then(action => {
          console.log(action);
          if (action === "confirm") {
            Indicator.open();
            let params = {
              username: this.userInfo.username,
              name: this.temp.name,
              age: this.temp.age,
              motto: this.temp.motto,
              email: this.temp.email
            };
            this.$axios
              .post("/api/user/updateUser", params)
              .then(res => {
                Indicator.close();
                console.log(res);
                if (res.data.code === 1) {
                  Toast({ message: "修改成功！" });
                  this.$store.commit("setUserInfo", params);
                  this.$router.push({ name: "mine" });
                } else if (res.data.errno === 1062) {
                  Toast({
                    message: `修改失败！
                              邮箱已被注册！`
                  });
                  this.init();
                } else {
                  Toast({ message: "修改失败，请重试！" });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
