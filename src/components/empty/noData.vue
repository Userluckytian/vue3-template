<template>
  <div class="noData">
    <img :src="currentPng" alt="Random Image" decoding="async" />
    <span>{{ text ? text : "" }}</span>
  </div>
</template>
<script lang="ts" setup>
import noChartPng from "/business-public/images/noData/noData_chart_noText.png";
import noBoxPng from "/business-public/images/noData/noData_box.png";
import noTablePng from "/business-public/images/noData/noData_table.png";
import noMsgPng from "/business-public/images/noData/noData_msg.png";

type EmptyPngType = "chart" | "table" | "box" | "msg";
const props = defineProps<{
  type?: EmptyPngType;
  text?: string;
}>();
let currentPng = ref(noChartPng);
watch(
  () => props.type,
  (newValue: any, _oldValue: any) => {
    // 监听父组件传递的 prop 变化并执行相应的回调逻辑
    updatePng(newValue);
  },
  { immediate: true, deep: true }
);
function updatePng(type: EmptyPngType) {
  switch (type) {
    case "chart":
      currentPng.value = noChartPng;
      break;
    case "table":
      currentPng.value = noTablePng;

      break;
    case "box":
      currentPng.value = noBoxPng;

      break;
    case "msg":
      currentPng.value = noMsgPng;
      break;

    default:
      break;
  }
}
</script>
<style scoped lang="scss">
.noData {
}

.noData {
  width: 100%;
  @include flex-center-center();
  flex-direction: column;

  img {
    width: 280px;
    margin-bottom: 0.8rem;
  }

  span {
    font-size: 0.9rem;
    color: #505050;
  }
}
</style>
