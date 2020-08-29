<template>
  <div id="app" class="study-center">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "App",
 
};
</script>

<style lang="less" scoped>
.study-center {
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}
</style>
