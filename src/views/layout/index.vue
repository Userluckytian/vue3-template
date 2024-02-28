<!-- 参考：https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE -->
<template>
  <!--  scale(0.545, 1.595029) 该比例适合7496 * 1352 -->
  <div class="layout" :class="{ 'isProd': prodEnv }">
    <!-- 蒙版效果 -->
    <div class="mask"></div>
    <!-- 内容部分 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>

let prodEnv = ref(true);
onMounted(() => {
  const isProd = import.meta.env.MODE === 'production';
  prodEnv.value = isProd;
})

</script>

<style scoped lang="scss">
/* 屏幕分辨率：4096 * 2160：  scale(0.5322, 1.5976) 该比例适合7696 * 1352  */
.isProd {
  transform-origin: top left;
  transform: scale(0.5322, 1.5976);
}

.layout {
  background-image: url("/business-public/images/bigOv11/website_bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow: hidden; // 这个好像无效，目前的处理方式是调整滚动条的宽度和高度
  position: relative;

  .mask {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: url("/business-public/images/layout/mengban.webp");
    background-size: cover;
    pointer-events: none;
    background-repeat: repeat;
    background-color: transparent;
  }

  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
