<template>
  <div class="titleContent" :class="{ hasBorder: border }">
    <!-- (1)标题 -->
    <div class="title-header">
      <div class="left">
        <div class="icon"></div>
        <div class="name">{{ title }}</div>
      </div>
      <div class="right">
        <slot name="right-header"></slot>
      </div>
    </div>
    <!-- (2)条件 -->
    <div class="cond">
      <slot name="search-conds"></slot>
    </div>
    <!-- (3)内容部分 -->
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "headerTitleOne",
  props: {
    title: {
      type: String,
      required: true,
      default: "标题",
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.titleContent {
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.2rem;
  .title-header {
    color: #fff;
    height: 1.5rem;
    padding: 0.5rem 0rem 0.5rem;
    @include flex-between-center();
    // background: linear-gradient(45deg, #15acafb8 0%, #15acaf59 10%, transparent 100%);
    // background: linear-gradient(45deg, #8d8d8db8 0%, #83838359 20%, transparent 100%);
    .left {
      height: 100%;
      @include flex-start-center();
      background-size: auto auto;
      // background-image: url('/business-public/images/home/subTitleBg.webp');
      .icon {
        width: 5px;
        height: 159%;
        margin: 0rem 0.5rem 0rem 0.4rem;
        background-color: #409eff;
      }
      .name {
        font-size: .95rem;
        font-family: SourceHanSansCN;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .right {
      flex: 1 1 auto;
    }
  }
  .cond,
  .content {
    width: 100%;
    height: fit-content;
  }
}
.hasBorder {
  border: solid 1px #c1c1c1;
}
</style>
