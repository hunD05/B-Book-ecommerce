<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <div class="flex justify-between">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
          Giỏ hàng ({{ totalCartQuantity }})
        </h2>
        <button
          class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
          @click="clearCart"
        >
          <i class="fa-solid fa-trash"></i>
          Xóa giỏ hàng
        </button>
      </div>

      <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div class="space-y-6">
            <div v-if="cartItems.length > 0">
              <div
                class="rounded-lg mb-4 border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                v-for="item in cartItems"
                :key="item.id"
              >
                <div
                  class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
                >
                  <a href="#" class="shrink-0 md:order-1">
                    <img
                      class="h-20 w-20 dark:hidden"
                      :src="item.imageCover"
                      :alt="`Hình ảnh ${item.title}`"
                    />
                  </a>

                  <label for="counter-input" class="sr-only">Chọn số lượng:</label>
                  <div class="flex items-center justify-between md:order-3 md:justify-end">
                    <div class="flex items-center">
                      <button
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        :disabled="isCountLoading"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h16"
                          />
                        </svg>
                        <i class="fa-solid fa-spinner fa-spin" v-if="isCountLoading"></i>
                      </button>
                      <input
                        type="text"
                        id="counter-input"
                        data-input-counter
                        class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                        placeholder=""
                        :value="item.quantity"
                        min="1"
                        @blur="updateQuantity(item.id, $event.target.value)"
                        required
                      />
                      <button
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        :disabled="isCountLoading"
                      >
                        <svg
                          class="h-2.5 w-2.5 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                        <i class="fa-solid fa-spinner fa-spin" v-if="isCountLoading"></i>
                      </button>
                    </div>
                    <div class="text-end md:order-4 md:w-32">
                      <p class="text-base font-bold text-gray-900 dark:text-white">
                        {{ (item.quantity * item.price).toLocaleString() }}đ
                      </p>
                    </div>
                  </div>

                  <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <RouterLink
                      :to="`/productDetails/${item.id}`"
                      class="text-base font-medium text-gray-900 hover:underline dark:text-white"
                      >{{ item.title }}</RouterLink
                    >

                    <div class="flex items-center gap-4">
                      <button
                        @click="addToWishlist(item.id)"
                        type="button"
                        class="inline-flex cursor-pointer items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                      >
                        <svg
                          class="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                          />
                        </svg>
                        Thêm vào yêu thích
                      </button>

                      <button
                        type="button"
                        class="inline-flex items-center cursor-pointer text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                        @click="removeCartItem(item.id)"
                      >
                        <svg
                          class="me-1.5 h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18 17.94 6M18 18 6.06 6"
                          />
                        </svg>
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div
                class="flex items-center justify-center gap-2 text-sm font-normal text-gray-500 dark:text-gray-400"
              >
                <span>Giỏ hàng trống</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div
            class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
          >
            <p class="text-xl font-semibold text-gray-900 dark:text-white">
              Tóm tắt đơn hàng
            </p>

            <div class="space-y-4">
              <div class="space-y-2">
                <dl class="flex items-center justify-between gap-4">
                  <dt class="text-base font-normal text-gray-500 dark:text-gray-400">
                    Giá gốc
                  </dt>
                  <dd class="text-base font-medium text-gray-900 dark:text-white">
                    {{ totalCartPrice.toLocaleString() }}đ
                  </dd>
                </dl>
              </div>

              <dl
                class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700"
              >
                <dt class="text-base font-bold text-gray-900 dark:text-white">
                  Tổng cộng
                </dt>
                <dd class="text-base font-bold text-gray-900 dark:text-white">
                  {{ totalCartPrice.toLocaleString() }}đ
                </dd>
              </dl>
            </div>

            <RouterLink
              to="/checkout"
              class="flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >Tiến hành thanh toán</RouterLink
            >

            <div class="flex items-center justify-center gap-2">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                hoặc
              </span>
              <RouterLink
                to="/products"
                title=""
                class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Tiếp tục mua sắm
                <svg
                  class="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      color="#000000"
    />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Loading from "vue-loading-overlay";
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import { products } from "@/data/mockData.js";

// State cho giỏ hàng và loading
const isLoading = ref(false);
const isCountLoading = ref(false);
const fullPage = ref(true);
const cartItems = ref([]);
const totalCartPrice = ref(0);
const totalCartQuantity = ref(0);
const wishlistItems = ref([]);

// Tải giỏ hàng từ localStorage
function loadCartItems() {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  } else {
    cartItems.value = [];
  }
  calculateTotalPrice();
  calculateTotalQuantity();
}

// Tải wishlist từ localStorage (nếu có)
function loadWishlist() {
  const savedWishlist = localStorage.getItem("wishlistItems");
  if (savedWishlist) {
    wishlistItems.value = JSON.parse(savedWishlist);
  } else {
    wishlistItems.value = [];
  }
}

// Tính tổng giá giỏ hàng
function calculateTotalPrice() {
  totalCartPrice.value = cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// Tính tổng số lượng sản phẩm trong giỏ hàng
function calculateTotalQuantity() {
  totalCartQuantity.value = cartItems.value.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

// Xóa sản phẩm khỏi giỏ hàng
function removeCartItem(id) {
  isLoading.value = true;
  setTimeout(() => {
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
    calculateTotalPrice();
    calculateTotalQuantity();
    toast.success("Sản phẩm đã được xóa khỏi giỏ hàng!", {
      autoClose: 2000,
    });
    // Phát ra custom event
    window.dispatchEvent(new Event("cart-updated"));
    isLoading.value = false;
  }, 1000);
}

// Cập nhật số lượng sản phẩm
function updateQuantity(id, quantity) {
  if (quantity < 1) {
    removeCartItem(id);
    return;
  }
  isCountLoading.value = true;
  setTimeout(() => {
    const item = cartItems.value.find((item) => item.id === id);
    if (item) {
      item.quantity = parseInt(quantity);
      localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
      calculateTotalPrice();
      calculateTotalQuantity();
      toast.success("Đã cập nhật số lượng sản phẩm!", {
        autoClose: 2000,
      });
      // Phát ra custom event
      window.dispatchEvent(new Event("cart-updated"));
    }
    isCountLoading.value = false;
  }, 1000);
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
  isLoading.value = true;
  setTimeout(() => {
    cartItems.value = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
    calculateTotalPrice();
    calculateTotalQuantity();
    toast.success("Đã xóa toàn bộ giỏ hàng!", {
      autoClose: 2000,
    });
    // Phát ra custom event
    window.dispatchEvent(new Event("cart-updated"));
    isLoading.value = false;
  }, 1000);
}

// Thêm vào danh sách yêu thích
function addToWishlist(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const index = wishlistItems.value.findIndex((item) => item.id === id);
  if (index === -1) {
    wishlistItems.value.push(product);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems.value));
    toast.success(`${product.title} đã được thêm vào danh sách yêu thích!`, {
      autoClose: 2000,
    });
  } else {
    toast.info(`${product.title} đã có trong danh sách yêu thích!`, {
      autoClose: 2000,
    });
  }
}

function onCancel() {
  isLoading.value = false;
}

// Tải dữ liệu khi component được mounted
onMounted(() => {
  loadCartItems();
  loadWishlist();
});
</script>

<style lang="scss" scoped>
:deep(.vld-icon) {
  .vld-overlay {
    .vld-background {
      background: #ffffff; /* Background trắng cho loading overlay */
    }
  }
}
</style>