<template>
  <div>
    <m-header title="交通事故处理查询系统" fixed>
      <router-link to="/login" slot="left">
        <m-button icon="back" >返回</m-button>
      </router-link>
    </m-header>
    <m-field label="邮箱" placeholder="请输入邮箱" ></m-field>
    <m-button size='large' type='primary'>发送验证</m-button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

</style>
