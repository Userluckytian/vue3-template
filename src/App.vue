<script setup lang="ts">
import { reactive } from "vue";
const waterMarkConfig = reactive({
  content: "测试版",
  font: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.15)",
  },
});
</script>

<template>
  <el-watermark
    :content="waterMarkConfig.content"
    :font="waterMarkConfig.font"
    class="elMark"
  >
    <router-view></router-view>
  </el-watermark>
</template>

<style scoped>
.elMark {
  width: 100%;
  height: 100%;
  min-width: fit-content;
  min-height: fit-content;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
