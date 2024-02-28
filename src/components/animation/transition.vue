<!-- 参考：https://blog.csdn.net/CYL_2021/article/details/127286364 -->
<template>
  <transition
    appear
    mode="out-in"
    :duration="{ enter: 800, leave: 800 }"
    :name="name"
    v-bind="$attrs"
  >
    <template v-if="animation.status">
      <slot></slot>
    </template>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { useAnimationStatusStore } from "@/store/common-store/animationStore";
import define from '@/common/constant/define.js'

export default defineComponent({
  name: "FadeTransition",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup() {
    let animation = useAnimationStatusStore();
    // 路由离开前的操作
    onBeforeRouteLeave((_to: any, _from: any, next: Function) => {
      animation.setAnimationStatus(false);
      setTimeout(() => {
        next();
      }, define.routeAnimationDurationTime / 2); // 这个时间最好和过渡动画时间保持一致
    });
    return {
      animation,
    };
  },
});
</script>

<style lang="scss" scoped></style>
