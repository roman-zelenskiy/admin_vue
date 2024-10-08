import { createRouter, createWebHashHistory } from "vue-router";
import { getCurrentUser } from "vuefire";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL + "/"),
  routes: [
    {
      name: "Auth",
      meta: { requiresNotAuth: true },
      path: "/",
      component: () => import("../pages/Auth.vue"),
    },

    {
      name: "MainPage",
      path: "/main",
      meta: { requiresAuth: true },
      redirect: { path: "/dashboard" },
      component: () => import("../components/layouts/Main.vue"),
      children: [
        {
          path: "/dashboard",
          component: () => import("../pages/Dashboard.vue"),
        },
        {
          path: "/customers",
          component: () => import("../pages/customers/Customers.vue"),
        },
        {
          path: "/categories",
          component: () => import("../pages/categories/CategoriesList.vue"),
        },
        {
          path: "/real_estate",
          component: () => import("../pages/real_estate/RealEstateList.vue"),
        },
        {
          path: "/features",
          component: () => import("../pages/features/FeaturesList.vue"),
        },
        {
          path: "/feature-create",
          component: () => import("../pages/features/CreateFeatures.vue"),
        },
        {
          path: "/feature-update/:id",
          component: () => import("../pages/features/UpdateFeatures.vue"),
        },
        {
          path: "/skills",
          component: () => import("../pages/skills/List.vue"),
        },
        {
          path: "/skills-create",
          component: () => import("../pages/skills/Create.vue"),
        },
        {
          path: "/skills-update/:id",
          component: () => import("../pages/skills/Update.vue"),
        },
        {
          path: "/real-estate-create",
          component: () => import("../pages/real_estate/CreateRealEstate.vue"),
        },
        {
          path: "/real-estate-update/:id",
          component: () => import("../pages/real_estate/UpdateRealEstate.vue"),
        },
        {
          path: "/customer-create",
          component: () => import("../pages/customers/CreateCustomer.vue"),
        },
        {
          path: "/customer-update/:id",
          component: () => import("../pages/customers/UpdateCustomer.vue"),
        },
        {
          path: "/category-create",
          component: () => import("../pages/categories/CreateCategory.vue"),
        },
        {
          path: "/category-update/:categoryId",
          component: () => import("../pages/categories/UpdateCategory.vue"),
        },
        {
          path: "/analytics",
          component: () => import("../views/Analytics.vue"),
        },
        {
          path: "/email/inbox",
          component: () => import("../views/EmailInbox.vue"),
        },
        {
          path: "/email/compose",
          component: () => import("../views/EmailCompose.vue"),
        },
        {
          path: "/email/detail/:id",
          component: () => import("../views/EmailDetail.vue"),
        },
        {
          path: "/email/detail",
          component: () => import("../views/EmailDetail.vue"),
        },
        { path: "/widgets", component: () => import("../views/Widgets.vue") },
        {
          path: "/pos/customer-order",
          component: () => import("../views/PosCustomerOrder.vue"),
        },
        {
          path: "/pos/kitchen-order",
          component: () => import("../views/PosKitchenOrder.vue"),
        },
        {
          path: "/pos/counter-checkout",
          component: () => import("../views/PosCounterCheckout.vue"),
        },
        {
          path: "/pos/table-booking",
          component: () => import("../views/PosTableBooking.vue"),
        },
        {
          path: "/pos/menu-stock",
          component: () => import("../views/PosMenuStock.vue"),
        },
        {
          path: "/ui/bootstrap",
          component: () => import("../views/UiBootstrap.vue"),
        },
        {
          path: "/ui/buttons",
          component: () => import("../views/UiButtons.vue"),
        },
        { path: "/ui/card", component: () => import("../views/UiCard.vue") },
        { path: "/ui/icons", component: () => import("../views/UiIcons.vue") },
        {
          path: "/ui/modal-notifications",
          component: () => import("../views/UiModalNotifications.vue"),
        },
        {
          path: "/ui/typography",
          component: () => import("../views/UiTypography.vue"),
        },
        {
          path: "/ui/tabs-accordions",
          component: () => import("../views/UiTabsAccordions.vue"),
        },
        {
          path: "/form/elements",
          component: () => import("../views/FormElements.vue"),
        },
        {
          path: "/form/plugins",
          component: () => import("../views/FormPlugins.vue"),
        },
        {
          path: "/form/wizards",
          component: () => import("../views/FormWizards.vue"),
        },
        {
          path: "/table/elements",
          component: () => import("../views/TableElements.vue"),
        },
        {
          path: "/table/plugins",
          component: () => import("../views/TablePlugins.vue"),
        },
        {
          path: "/chart/chart-js",
          component: () => import("../views/ChartJs.vue"),
        },
        {
          path: "/chart/chart-apex",
          component: () => import("../views/ChartApex.vue"),
        },
        { path: "/map", component: () => import("../views/Map.vue") },
        {
          path: "/layout/starter-page",
          component: () => import("../views/LayoutStarterPage.vue"),
        },
        {
          path: "/layout/fixed-footer",
          component: () => import("../views/LayoutFixedFooter.vue"),
        },
        {
          path: "/layout/full-height",
          component: () => import("../views/LayoutFullHeight.vue"),
        },
        {
          path: "/layout/full-width",
          component: () => import("../views/LayoutFullWidth.vue"),
        },
        {
          path: "/layout/boxed-layout",
          component: () => import("../views/LayoutBoxedLayout.vue"),
        },
        {
          path: "/layout/minified-sidebar",
          component: () => import("../views/LayoutMinifiedSidebar.vue"),
        },
        {
          path: "/layout/top-nav",
          component: () => import("../views/LayoutTopNav.vue"),
        },
        {
          path: "/layout/mixed-nav",
          component: () => import("../views/LayoutMixedNav.vue"),
        },
        {
          path: "/layout/mixed-nav-boxed-layout",
          component: () => import("../views/LayoutMixedNavBoxedLayout.vue"),
        },
        {
          path: "/page/scrum-board",
          component: () => import("../views/PageScrumBoard.vue"),
        },
        {
          path: "/page/product",
          component: () => import("../views/PageProduct.vue"),
        },
        {
          path: "/page/product-details",
          component: () => import("../views/PageProductDetails.vue"),
        },
        {
          path: "/page/order",
          component: () => import("../views/PageOrder.vue"),
        },
        {
          path: "/page/order-details",
          component: () => import("../views/PageOrderDetails.vue"),
        },
        {
          path: "/page/gallery",
          component: () => import("../views/PageGallery.vue"),
        },
        {
          path: "/page/search-results",
          component: () => import("../views/PageSearchResults.vue"),
        },
        {
          path: "/page/coming-soon",
          component: () => import("../views/PageComingSoon.vue"),
        },
        {
          path: "/page/error",
          component: () => import("../views/PageError.vue"),
        },
        {
          path: "/page/login",
          component: () => import("../views/PageLogin.vue"),
        },
        {
          path: "/page/register",
          component: () => import("../views/PageRegister.vue"),
        },
        {
          path: "/page/messenger",
          component: () => import("../views/PageMessenger.vue"),
        },
        {
          path: "/page/data-management",
          component: () => import("../views/PageDataManagement.vue"),
        },
        {
          path: "/page/file-manager",
          component: () => import("../views/PageFileManager.vue"),
        },
        {
          path: "/page/pricing",
          component: () => import("../views/PagePricing.vue"),
        },
        { path: "/landing", component: () => import("../views/Landing.vue") },
        { path: "/profile", component: () => import("../views/Profile.vue") },
        { path: "/calendar", component: () => import("../views/Calendar.vue") },
        { path: "/settings", component: () => import("../views/Settings.vue") },
        { path: "/helper", component: () => import("../views/Helper.vue") },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/PageError.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        name: "Auth",
      };
    }
  }
});

router.beforeEach(async (to) => {
  if (to.meta.requiresNotAuth) {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      return {
        name: "MainPage",
      };
    }
  }
});

export default router;
