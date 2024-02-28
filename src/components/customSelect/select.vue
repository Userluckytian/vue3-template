<template>
  <div class="select-box">
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/tabindex -->
    <div class="select-box__current" tabindex="0">
      <template v-if="activeItemKey">
        <div class="select-box__value" v-for="(it, idx) in options">
          <input
            class="select-box__input"
            type="radio"
            :id="idx + ''"
            :value="(it as any).value"
            name="Ben"
            :checked="activeItemKey === (it as any).value ? true : false"
            placeholder="请选择"
          />
          <p class="select-box__input-text">{{ (it as any).label }}</p>
        </div>
      </template>
      <template v-if="!activeItemKey">
        <span class="select-box__placeHolder">请选择</span>
      </template>
      <img :src="arrowPng" alt="Random Image" decoding="async" />
    </div>
    <ul class="select-box__list">
      <li
        v-for="(item, index) in options"
        :key="(item as any).value"
        :class="{ 'active': activeItemKey === (item as any).value }"
        @click="changeActive(item)"
      >
        <label
          class="select-box__option"
          :for="index + ''"
          aria-hidden="true"
          >{{ (item as any).label }}</label
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import arrowPng from "/business-public/images/home/arrow.png";
import { defineComponent, onUnmounted, ref, watch } from "vue";
export default defineComponent({
  name: "custonSelect",
  props: {
    defaultValue: {
      type: String,
      required: true,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [
          {
            label: "",
            value: "",
          },
        ];
      }, //对象或数组默认值必须从一个工厂函数获取
    },
  },
  setup(props, { emit }) {
    let activeItemKey: any = ref(props.defaultValue); // 当前激活项
    const changeActive = (item: any) => {
      activeItemKey.value = item.value;
      emit("selChange", item);
    };
    watch(
      [() => props.defaultValue],
      ([defaultValueNewValue]: any[], [_defaultValueOldValue]: any[]) => {
        // 监听父组件传递的 prop 变化并执行相应的回调逻辑
        activeItemKey.value = defaultValueNewValue;
      },
      { immediate: true, deep: true }
    );
    onUnmounted(() => {
      // 不需要自己手动解绑了！
    });
    return {
      arrowPng,
      activeItemKey,
      changeActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.select-box {
  border: solid 1px #edeeee6f;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  font-family: "Open Sans", "Helvetica Neue", "Segoe UI", "Calibri", "Arial",
    sans-serif;
  color: #d4d4d4;
  z-index: 10;

  &__current {
    height: 100%;
    position: relative;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
    cursor: pointer;
    outline: none;

    &:focus {
      & + .select-box__list {
        opacity: 1;

        // We have to set "animation-name: none;" to make the list visible (read below how it works)

        animation-name: none;

        .select-box__option {
          cursor: pointer;
        }
      }

      .select-box__icon {
        transform: translateY(-50%) rotate(180deg);
      }
    }
  }

  &__placeHolder {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 0.4rem;
    background-color: transparent;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 20px;
    opacity: 0.3;
    transition: 0.2s ease;
  }

  &__value {
    display: flex;
  }

  &__input {
    display: none;

    &:checked + .select-box__input-text {
      display: block;
    }
  }

  &__input-text {
    display: none;
    width: 100%;
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 0.4rem;
    background-color: transparent;
  }

  &__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;

    // We need to use animation with delay.
    // Otherwise the click event will not have time to run on label, because this element disapears immediately when .select-box__current element loses the focus.
    // This delay will not be noticed because we set "opacity" to "0".
    // We also use "animation-fill-mode: forwards" to make the list stay hidden.

    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);

    // 增加激活状态
    .active {
      color: #fff;
      background-color: #546c84;
    }
  }

  &__option {
    display: block;
    padding: 1rem;
    background-color: #546c8466;

    &:hover,
    &:focus {
      color: #fff;
      background-color: #546c84;
    }
  }
}

@keyframes HideList {
  from {
    transform: scaleY(1);
  }

  to {
    transform: scaleY(0);
  }
}
</style>
