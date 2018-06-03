<template>
  <m-header title="交通事故处理查询系统 " fixed>
      <m-button icon="back" @click=back slot="left">返回</m-button>
  </m-header>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

