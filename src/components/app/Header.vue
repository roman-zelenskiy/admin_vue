<script setup lang="ts">
import { slideToggle } from "@/composables/slideToggle.js";
import { useAppOptionStore } from "@/stores/app-option";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();
const appOption = useAppOptionStore();

const notificationData = [
  {
    icon: "fa fa-receipt fa-lg fa-fw text-success",
    title: "Your store has a new order for 2 items totaling $1,299.00",
    time: "just now",
  },
  {
    icon: "far fa-user-circle fa-lg fa-fw text-body text-opacity-25",
    title: "3 new customer account is created",
    time: "2 minutes ago",
  },
  {
    img: "/assets/img/icon/android.svg",
    title: "Your android application has been approved",
    time: "5 minutes ago",
  },
  {
    img: "/assets/img/icon/paypal.svg",
    title: "Paypal payment method has been enabled for your store",
    time: "10 minutes ago",
  },
];

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
