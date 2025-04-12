import { createRouter, createWebHistory } from "vue-router";

// Import các trang
import CartPage from "@/pages/CartPage.vue";
import CheckoutPage from "@/pages/CheckoutPage.vue";
import ForgetPasswordPage from "@/pages/ForgetPasswordPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import OrderDetailPage from "@/pages/OrderDetail.vue"; // Thêm import cho OrderDetail.vue
import ProductDetailsPage from "@/pages/ProductDetailsPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import ResetCodePage from "@/pages/ResetCodePage.vue";
import ResetPasswordPage from "@/pages/ResetPasswordPage.vue";
import WishlistPage from "@/pages/WishlistPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/products",
      name: "products",
      component: ProductsPage,
    },
    {
      path: "/products/:id",
      name: "product-detail",
      component: ProductDetailsPage,
      props: true,
      meta: { title: "Chi tiết sản phẩm - B-Book E-commerce" },
      beforeEnter: (to, from, next) => {
        const productId = to.params.id;
        if (!productId || !/^\d+$/.test(productId)) {
          next({ name: "NotFound" });
        } else {
          next();
        }
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishlistPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutPage,
    },
    {
      path: "/allorders",
      name: "orders",
      component: OrdersPage,
    },
    {
      path: "/orders/:id",
      name: "order-detail",
      component: OrderDetailPage, // Thêm route cho trang chi tiết đơn hàng
      props: true,
      meta: { title: "Chi tiết đơn hàng - B-Book E-commerce" },
      beforeEnter: (to, from, next) => {
        const orderId = to.params.id;
        if (!orderId) {
          next({ name: "NotFound" });
        } else {
          next();
        }
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/forget-password",
      name: "forget-password",
      component: ForgetPasswordPage,
    },
    {
      path: "/verify-reset-code",
      name: "verify-reset-code",
      component: ResetCodePage,
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPasswordPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "B-Book E-commerce";
  next();
});

export default router;