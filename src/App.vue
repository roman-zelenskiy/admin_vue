<script setup lang="ts">
// import { getCurrentInstance } from "vue";
// import { RouterLink, RouterView } from "vue-router";
import { useAppOptionStore } from "@/stores/app-option";
import { ProgressFinisher, useProgress } from "@marcoschulte/vue3-progress";
// import AppSidebar from "@/components/app/Sidebar.vue";
// import AppHeader from "@/components/app/Header.vue";
// import AppTopNav from "@/components/app/TopNav.vue";
// import AppFooter from "@/components/app/Footer.vue";
import AppThemePanel from "@/components/app/ThemePanel.vue";
import router from "./router";

const appOption = useAppOptionStore();
// const internalInstance = getCurrentInstance();

const progresses = [] as ProgressFinisher[];

router.beforeEach(async (to, from) => {
  progresses.push(useProgress().start());
  appOption.appSidebarMobileToggled = false;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const targetElm = [].slice.call(
    document.querySelectorAll(".app-sidebar .menu-submenu")
  );
  targetElm.map(function (elm) {
    elm.style.display = "";
  });
});
router.afterEach(async (to, from) => {
  progresses.pop()?.finish();
});

// document.querySelector("body").classList.add("app-init");
</script>

<template>
  <div class="d-flex h-100 flex-column">
    <!-- <vue3-progress-bar /> -->
    <!-- <app-header v-if="!appOption.appHeaderHide" />
		<app-top-nav v-if="appOption.appTopNav" />
		<app-sidebar v-if="!appOption.appSidebarHide" /> -->
    <div
      class="flex-1 d-flex flex-column"
      v-bind:class="appOption.appContentClass"
    >
      <router-view></router-view>
    </div>
    <!-- <app-footer v-if="appOption.appFooter" /> -->
    <app-theme-panel />
  </div>
</template>
