<template>
  <div class="loginPage">
    <!-- v-loading="submitLoadingRef" element-loading-background="rgba(122, 122, 122, 0.8)" -->
    <!-- 顶部供水公司logo + 名称 -->
    <div class="loginHeader">
      <img :src="waterLogoWhite" alt="" />
      <div class="title">智慧水务可视化平台</div>
    </div>
    <!-- 中间部分 -->
    <div class="loginCenter">
      <div class="loginForm" :class="{ 'loginScale': prodEnv }">
        <div class="formTop">
          <img :src="logo_blue" alt="" />
          <div class="title">标题</div>
        </div>
        <div class="formHeader">智慧水务可视化平台</div>
        <div class="form-content">
          <div class="formTitle">用户登录</div>
          <el-form class="ruleForm" ref="ruleFormRef" :model="loginForm" :rules="rules" size="large" label-width="0px">
            <div class="formItem">
              <el-form-item label="" prop="account">
                <el-input prefix-icon="User" v-model.number="loginForm.account" placeholder="请输入用户名" />
              </el-form-item>
            </div>
            <div class="formItem">
              <el-form-item label="" prop="password">
                <el-input prefix-icon="Lock" v-model="loginForm.password" type="password" autocomplete="off"
                  placeholder="请输入密码" />
              </el-form-item>
            </div>
            <!-- <div class="formItem linkBtn">
              <span style="color: #48c0ff">记住密码</span>
              <span>忘记密码？</span>
            </div> -->
            <div class="formItem btn">
              <el-form-item>
                <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)" @keydown.enter="keyDown"
                  :loading="submitLoadingRef ? true : false">{{ submitLoadingRef ? "正在登录..." : "登录" }}</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 底部内容 -->
    <div class="loginBottom">
      <div class="textUnit " :class="{ 'companyScale': prodEnv }">
        承建单位：某某水厂 &nbsp; &nbsp; &nbsp;
        技术支持：苏州清唯智联科技有限公司
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import define from "@/common/constant/define.js";
import waterLogoWhite from "/business-public/images/login/water_logo_white.png";
import logo_blue from "/business-public/images/login/logo_blue.png";
import { defineComponent, ref, reactive } from "vue"; // 响应式
import { FormInstance, FormRules, ElMessage } from "element-plus"; // element的form组件类型
import { User, Lock } from "@element-plus/icons-vue"; // element的图标

import {
  login,
  getAuthInfo
} from "@/api/common-api/login/login"; // 接口调用

import md5 from "md5"; // 加密工具
import { navTo } from "@/router/common-router/utils-router";
// 引入store
import { useGlobalStateStore } from "@/store/common-store/userInfoStore";

export default defineComponent({
  setup() {
    const store = useGlobalStateStore(); // store

    const loginForm = reactive({
      account: "",
      password: "",
      code: "",
    });

    const ruleFormRef = ref<FormInstance>();

    let submitLoadingRef = ref(false);

    let needValidCode = ref(true); // 是否需要验证码

    let validCodePng = ref(``); // 验证码图片
    let timestamp = ref(0); // 验证码生成的时间戳

    const checkUser = (_rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error("请输入用户名"));
      }
      callback();
    };

    const validatePass = (_rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };

    // 提交登录表单
    const submitLogin = () => {
      navTo("/layout/");
      return 
      const submitFormData = {
        account: loginForm.account,
        password: md5(loginForm.password), // 'e10adc3949ba59abbe56e057f20f883e', // loginForm.password
        code: loginForm.code,
        timestamp: timestamp.value,
      };
      login(submitFormData)
        .then((res: any) => {
          if (res.code && res.code === 200) {
            const token = res.data.token;
            store.setToken(token); // 设置token
            getUserInfo();
          }
        })
        .catch(() => {
          submitLoadingRef.value = false;
        });
    };

    const getUserInfo = () => {
      getAuthInfo()
        .then((res: any) => {
          if (res.code && res.code === 200) {
            const userInfo = res.data.userInfo;
            store.setUserInfo(userInfo); // 设置userInfo
            // 导航到总览页面
            navTo("/layout/");
          }
        })
        .finally(() => {
          submitLoadingRef.value = false;
        });
    };

    const rules = reactive<FormRules<typeof loginForm>>({
      password: [{ validator: validatePass, trigger: "blur" }],
      account: [{ validator: checkUser, trigger: "blur" }],
    });

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      submitLoadingRef.value = true;
      formEl.validate((valid) => {
        if (valid) {
          submitLogin();
        } else {
          console.log("error submit!");
          submitLoadingRef.value = false;
          return false;
        }
      });
    };

    const keyDown = (e) => {
      if (e.keyCode == 13 || e.keyCode == 100) {
        submitForm(ruleFormRef.value);
      }
    };

    let prodEnv = ref(true);

    onMounted(() => {
      const isProd = import.meta.env.MODE === 'production';
      prodEnv.value = isProd;
      //绑定监听事件
      window.addEventListener("keydown", keyDown);
    });

    onUnmounted(() => {
      //销毁事件
      window.removeEventListener("keydown", keyDown, false);
    });

    return {
      User,
      Lock,
      rules,
      prodEnv,
      loginForm,
      keyDown,
      submitForm, // 提交表单
      ruleFormRef,
      submitLoadingRef, // 提交表单的loading
      waterLogoWhite,
      logo_blue,
      validCodePng,
      needValidCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  // background-image: url("/business-public/images/login/loginBGNew.png");
  position: relative;

  .loginHeader {
    @include flex-start-center();
    padding: 0.625rem;
    color: #fff;
    background-color: #fff;
    visibility: hidden;

    img {
      width: 2.3rem;
    }

    /* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
    @font-face {
      font-family: "阿里妈妈数黑体 Bold";
      font-weight: 700;
      src: url("//at.alicdn.com/wf/webfont/gaLxUiLmylig/QHdI6zqrN2aU.woff2") format("woff2"),
        url("//at.alicdn.com/wf/webfont/gaLxUiLmylig/pSEqFI5CwX1t.woff") format("woff");
      font-display: swap;
    }

    .title {
      font-family: "阿里妈妈数黑体 Bold";
      font-weight: blod;
      margin-left: 12px;
      font-size: 1.8rem;
      font-weight: blod;
    }
  }

  .loginCenter {
    height: 10rem;
    @include flex-center-center();
    position: relative;
    // background-color: #009ff1;

    .loginForm {
      border-radius: 8px;
      // background-color: #fff;
      padding: 1rem;
      position: absolute;
      right: 10%;
      top: 25%;

      .formTop {
        font-size: 1.6rem;
        font-weight: 700;
        @include flex-center-center();
        font-family: SourceHanSansCN-Regular;
        font-weight: 400;
        color: #48c0ff;
        letter-spacing: 10px;
        margin-bottom: 0.8rem;

        .title {
          margin-left: 0.7rem;
        }

        img {
          width: 2.5rem;
        }
      }

      .formHeader {
        @include flex-center-center();
        color: #00bff4;
        font-weight: bold;
        // 定义字体渐变效果
        /*首先定义字体颜色为透明*/
        color: transparent;
        /*定义背景渐变*/
        background-image: linear-gradient(90deg, #009ff1 0%, #bafdf6 100%);
        /*添加-webkit-background-clip，保证渐变生效*/
        -webkit-background-clip: text;
        background-clip: text;
        font-size: 2.5rem;
        margin-bottom: 1.3rem;
      }

      .form-content {
        // height: 849px;
        // height: 1043px;
        // width: 1489px;
        background-image: url("/business-public/images/login/formBg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 1.5rem 3rem 2.7rem;

        .formTitle {
          color: #00bff4;
          font-size: 1.8rem;
          letter-spacing: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .formItem {
          // background-color: #3384c6;
          margin-bottom: 2rem;
          color: #fff;

          :deep(.el-form-item) {
            margin-bottom: 0rem;

            // input输入框的高度
            .el-input__wrapper {
              padding: 0.5rem 1rem;
              height: 4rem;
              background: transparent;
              background-repeat: no-repeat;
              background-size: cover;
              background-image: url("/business-public/images/login/logon_inputbg.png");
              box-shadow: unset !important;
              border: solid 2px #166fac;

              // 前缀icon标识
              .el-input__prefix .el-input__icon {
                color: #009ff1;
                font-size: 1.9rem;
                margin-right: 1rem;
              }

              // 文本框内的字体
              .el-input__inner {
                font-size: 1.9rem;
                height: 1.8rem;
                line-height: 1.8rem;
                color: #ffffff !important;
              }
            }

            // 错误提示样式
            .el-form-item__error {
              font-size: 1.3rem;
              margin-top: 0.3rem;
            }
          }
        }

        .linkBtn {
          @include flex-end-center();
          background-color: transparent;
          font-size: 1.3rem;

          &:hover {
            opacity: 0.8;
            cursor: pointer;
          }
        }

        .btn {
          padding: 0rem 0rem !important;

          :deep(.el-form-item__content) {
            height: 4.5rem;

            &:hover {
              background-color: #00bff4;
            }

            .el-button>span {
              font-size: 2.3rem;
            }
          }
        }
      }

      .ruleForm {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        width: 100%;

        :deep(input:autofill, textarea:autofill, select:autofill) {
          // -webkit-text-fill-color: #e13a3a !important;

          box-shadow: 0 0 0px 1000px transparent inset !important;

          background-color: transparent;

          background-image: none;

          transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
        }

        .btn {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .loginBottom {
    width: 100%;
    color: #fff;
    padding: 1.75rem 0rem;
    position: absolute;
    bottom: 0;
    left: 33%;
    font-size: 0.85rem;

    .textUnit {
      width: fit-content;
      color: #48c0ff;
      letter-spacing: .1rem;
      // border: solid 1px #fff;
    }

  }
}
</style>
