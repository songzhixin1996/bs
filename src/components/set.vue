<template>
  <div> 
    <m-header title="修改个人信息" fixed>
      <router-link to="/user/mine" slot="left">
        <m-button icon="back">返回</m-button>
      </router-link>
    </m-header>
    <m-cell title="姓名"  :value='temp.name' @click.native="setName"></m-cell>
    <m-cell title="用户名"  :value="username"></m-cell>
    <m-cell title="邮箱"  :value="temp.email" @click.native="setEmail"></m-cell>
    <m-cell title="年龄"  :value="temp.age" @click.native="setAge"></m-cell>
    <m-cell title="个性签名"  :value="temp.motto" @click.native="setMotto"></m-cell>
    <m-button type="primary" class="bt" @click="updateUser">保存</m-button>
  </div>

</template>
<style scoped>
.bt {
  display: block;
  margin: 50px auto;
}
</style>
<script>
import { MessageBox, Toast } from "mint-ui";
import { mapState } from "vuex";
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
    this.temp.name = this.name;
    this.temp.age = this.age || 0;
    this.temp.motto = this.motto;
    this.temp.email = this.email;
  },
  computed: {
    ...mapState(["name", "username", "age", "motto", "email"])
  },
  methods: {
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
            let params = {
              username: this.username,
              name: this.temp.name,
              age: this.temp.age,
              motto: this.temp.motto,
              email: this.temp.email
            };
            this.$axios
              .post("/api/user/updateUser", params)
              .then(res => {
                console.log(res);
                if (res.data.code === 1) {
                  Toast({ message: "修改成功！" });
                  this.$router.push("/user/mine");
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
