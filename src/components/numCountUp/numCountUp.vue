<!-- 看第二种： https://blog.csdn.net/Y1914960928/article/details/133142978 -->
<template>
  <CountUp
    :end-val="countUpNumOptions.endVal"
    :duration="countUpNumOptions.duration"
    :decimal-places="countUpNumOptions.decimals"
    :options="countUpNumOptions.options"
    :loop="countUpNumOptions.loop"
    :delay="countUpNumOptions.delay"
  ></CountUp>
  <!-- @init="onInit" @finished="onFinished" -->
</template>
<script lang="ts" setup>
// https://github.com/jizai1125/vue-countup-v3
// 数字滚动效果测试
import CountUp from "vue-countup-v3";
import { ICountUp, CountUpOptions } from "vue-countup-v3";
import { reactive } from "vue";
const props = defineProps({
  num: {
    type: [Number, String],
    default: 0,
  },
  startNum: {
    type: Number,
    default: 0,
  },
  decimals: {
    type: Number,
    default: 0,
  },
  intervalTime: {
    type: Number,
    default: 3000,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  delay: {
    type: Number,
    default: 5,
  },
});

watch(
  () => props.num,
  (newValue, _oldValue) => {
    if (typeof newValue === "string") {
      newValue = Number(newValue);
    }
  }
);

const countUpNumOptions = reactive({
  startVal: 0, // 开始值
  endVal: 0, // 结束值
  duration: 2.5, // 跳动时长 - 单位：秒
  decimals: 0, // 小数点位数
  countUp: undefined as ICountUp | undefined, // 跳动的对象
  loop: false,
  delay: 5, // 单位：s
  options: {
    // 这里是跳动的数据的配置，可以配置分隔符[等...](https://github.com/jizai1125/vue-countup-v3)
  } as CountUpOptions,
});
// let countUpInstance: ICountUp | undefined;
onMounted(() => {
  countUpNumOptions.startVal = props.startNum || 0;
  countUpNumOptions.endVal = Number(props.num) || 0;
  countUpNumOptions.decimals = props.decimals || 0;
  countUpNumOptions.loop = props.loop || false;
  countUpNumOptions.delay = props.delay || 0;
});

function onInit(_ctx: ICountUp) {
  // if (!countUpInstance) {
  //   countUpInstance = _ctx;
  // }
}
function onFinished() {
  // console.log('结束')
}
onUnmounted(() => {});
</script>
