<template>
  <b-navbar type="dark" variant="primary">
    <b-container>
      <b-navbar-brand :href="url">
        {{title}}
        <small>- 簡易看板作成ツール -</small>
      </b-navbar-brand>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  computed: {
    title: () => process.env.VUE_APP_NAME,
    url: () => process.env.VUE_APP_URL
  }
};
</script>