<script lang="ts" setup></script>
<template>
  <div class="main">
  </div>
</template>

</script>
<style scoped lang="scss">
.main {
  display: flex;
  width: 100%;
  height: 100%;
  .view {
    flex-shrink: 0;
    flex-grow: 0;
    width: calc(100% / 3);
    height: 100%;
  }
  .left {
    // background-size: cover;
    // background-color: #1babff;
    background-color: #082A4F;
  }
  .center {
    // background-size: cover;
    // background-color: #ba42f2;
  }
  .right {
    // background-size: cover;
    background-color: #082A4F;
  }
}
</style>
