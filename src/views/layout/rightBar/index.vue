<template>
  <div class="tools">
    <!-- 消息 -->
    <!-- <div class="msg">
      <img
        src="/business-public/images/home/msg.webp"
        decoding="async"
      />
    </div> -->
    <!-- <div class="split"></div> -->
    <!-- 天气 -->
    <div class="weather" v-if="weatherInfo">
      <!-- 图标 -->
      <!-- <div class="icon" :title="weatherInfo.text">
        <i :class="`qi-${weatherInfo.icon}`"></i>
      </div> -->
      <!-- 温度 -->
      <div class="temp">
        <span>{{ weatherInfo.temp }}</span>
        <sup>℃</sup>
      </div>
      <!-- 天气状况 -->
      <div class="text">
        <span>{{ weatherInfo.text }}</span>
      </div>
    </div>
    <div class="split"></div>
    <!-- 时间 -->
    <div class="time">
      <!-- <div class="bottom">{{ getDate + timeValue }}</div> -->
      <div class="bottom">{{ getDate }}</div>
    </div>
    <div class="split"></div>
    <!-- PM -->
    <!-- <div class="pm" v-if="AQIInfo">
      <div class="top">PM 2.5</div>
      <div class="bottom" title="PM 2.5">{{ AQIInfo.pm2p5 }}</div>
    </div> -->
    <!-- <div class="split"></div> -->
    <!-- <div @click="changeIndexCard" class="hideIndex">地图视图</div>
    <div class="split"></div> -->
    <div @click="debounceLogout(true)" class="exit" title="退出登录">
      <el-icon><SwitchButton /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import moment from "@/utils/momentjsUtils";
import { getAQIData, getWeatherData } from "@/api/business-api/weather";
import { debounceLogout } from "@/utils/common-utils/logOut";
import { useIndexVisibleStore } from "@/store/business-store/indexVisibleStore";
import { useAnimationStatusStore } from "@/store/common-store/animationStore";
export default defineComponent({
  name: "headerRight",
  setup() {
    const indexVisibleStore = useIndexVisibleStore();
    let animation = useAnimationStatusStore();
    let timeInterval: any;
    let getDate = ref("");
    let timeValue = ref("");
    let weatherInfo = reactive({} as any);
    let AQIInfo = reactive({} as any);
    const getWeatherDataInfo = () => {
      getWeatherData().then((info: any) => {
        Object.assign(weatherInfo, info.now);
      });
    };
    const getAQIDataInfo = () => {
      getAQIData().then((info: any) => {
        Object.assign(AQIInfo, info.now);
      });
    };
    const getDateInfo = () => {
      getDate.value =
        moment().format("LL") + " " + moment().format("dddd") + " ";
    };
    const getTime = () => {
      timeValue.value = moment().format("LTS");
      if (timeValue.value === "00:00:00") {
        getDateInfo();
      }
    };
    const changeIndexCard = () => {
      indexVisibleStore.showIndex = !indexVisibleStore.showIndex;
      animation.setAnimationStatus(indexVisibleStore.showIndex);
    };
    onMounted(() => {
      timeInterval = setInterval(() => {
        getTime();
      }, 1000);
      getDateInfo();
      getAQIDataInfo();
      getWeatherDataInfo();
    });
    onUnmounted(() => {
      if (timeInterval) {
        clearInterval(timeInterval);
      }
    });
    return {
      AQIInfo,
      getDate,
      timeValue,
      weatherInfo,
      debounceLogout,
      changeIndexCard,
    };
  },
});
</script>

<style scoped lang="scss">
.tools {
  height: 60px;
  user-select: none;
  @include flex-end-center();
  gap: 0.8rem;
  font-size: 1rem;
  // font-size: 24px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: #ffffff;

  .split {
    width: 0.1rem;
    border-radius: 50%;
    height: 80%;
    min-height: 1.5rem;
    background: #ffffff;
    background: linear-gradient(
      180deg,
      #ffffff00 0%,
      #848484 50%,
      #ffffff00 100%
    );
  }

  .msg {
    max-width: 1.2rem;
  }

  .airQuery {
    width: 2rem;
    aspect-ratio: 1 / 1;
    background-image: url("/business-public/images/home/circle.webp");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #45dbff;
    @include flex-center-center();

    span {
      // font-size: 0.7em;
      font-weight: 700;
    }
  }

  img {
    width: 100%;
  }

  .weather {
    // color: #dfda49;
    color: #ffffff;
    color: #ffc64a;
    @include flex-center-center();
    gap: 8px;
    // font-size: 0.8rem;
    .icon {
      width: 1.2rem;
      aspect-ratio: 1 / 1;

      i {
        // font-size: 1.2rem;
      }
    }
    .temp {
      @include flex-center-center();
    }

    sup {
      // font-size: 19px;
      // font-weight: 700;
      margin-left: 5px;
    }
    .text {
      margin-left: 0.2rem;
    }
  }

  .time,
  .pm {
    // background-color: #ff454575;
    width: fit-content;
    @include flex-start-center();
    flex-direction: column;
    color: #ffffff;

    .top,
    .bottom {
      width: 100%;
      text-align: left;
    }
  }

  // 退出按钮

  .hideIndex {
    // font-size: 0.8rem;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .exit {
    // font-size: 0.8rem;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}
</style>
