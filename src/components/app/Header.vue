<script setup lang="ts">
import { slideToggle } from "@/composables/slideToggle.js";
import { useAppOptionStore } from "@/stores/app-option";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
const appOption = useAppOptionStore();

function logout() {
  auth.logout().then(() => {
    router.push({ name: "Auth" });
  });
}

function toggleAppSidebarMinify() {
  if (!(appOption.appTopNav && appOption.appSidebarHide)) {
    appOption.appSidebarMinified = !appOption.appSidebarMinified;
  }
}
function toggleAppSidebarMobileToggled() {
  if (appOption.appTopNav && appOption.appSidebarHide) {
    slideToggle(document.querySelector(".app-top-nav"));
    window.scrollTo(0, 0);
  } else {
    appOption.appSidebarMobileToggled = !appOption.appSidebarMobileToggled;
  }
}
function toggleAppHeaderSearch(event) {
  event.preventDefault();

  appOption.appHeaderSearchToggled = !appOption.appHeaderSearchToggled;
}
function checkForm(event) {
  event.preventDefault();
  this.$router.push({ path: "/extra/search" });
}
</script>
<template>
  <div id="header" class="app-header">
    <!-- BEGIN mobile-toggler -->
    <div class="mobile-toggler">
      <button
        type="button"
        class="menu-toggler"
        v-on:click="toggleAppSidebarMobileToggled"
      >
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
    <!-- END mobile-toggler -->

    <!-- BEGIN brand -->
    <div class="brand">
      <div class="desktop-toggler">
        <button
          type="button"
          class="menu-toggler"
          v-on:click="toggleAppSidebarMinify"
        >
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>

      <RouterLink to="/dashboard" class="brand-logo">
        <img
          src="/assets/img/logo.png"
          class="invert-dark"
          alt=""
          height="20"
        />
      </RouterLink>
    </div>
    <!-- END brand -->

    <!-- BEGIN menu -->
    <div class="menu justify-content-end">
      <div class="menu-item dropdown">
        <a
          href="#"
          data-bs-toggle="dropdown"
          data-display="static"
          class="menu-link"
        >
          <div class="menu-text">{{ auth.user?.email }}</div>
        </a>
        <div class="dropdown-menu dropdown-menu-end me-lg-3">
          <a
            href="#"
            @click="logout"
            class="dropdown-item d-flex align-items-center"
            >Log Out
            <i class="fa fa-toggle-off fa-fw ms-auto text-gray-400 fs-16px"></i
          ></a>
        </div>
      </div>
    </div>
    <!-- END menu -->
  </div>
</template>
