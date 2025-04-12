<template>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mx-auto max-w-5xl">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-6">
            Chi tiết đơn hàng #{{ order?.id || "N/A" }}
          </h2>
  
          <!-- Thông tin đơn hàng -->
          <div class="border border-black rounded-lg p-6 mb-6 dark:border-black">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <dl>
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                  Mã đơn hàng:
                </dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  #{{ order?.id || "N/A" }}
                </dd>
              </dl>
  
              <dl>
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                  Ngày đặt:
                </dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {{
                    order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"
                  }}
                </dd>
              </dl>
  
              <dl>
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                  Giá trị:
                </dt>
                <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                  {{ order?.totalOrderPrice?.toLocaleString("vi-VN") || "0" }} VNĐ
                </dd>
              </dl>
  
              <dl>
                <dt class="text-base font-medium text-gray-500 dark:text-gray-400">
                  Trạng thái:
                </dt>
                <dd
                  v-if="order?.isPaid"
                  class="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  <svg
                    class="me-1 h-3 w-3"
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  Đã thanh toán
                </dd>
                <dd
                  v-else
                  class="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                >
                  <i class="fa-solid fa-xmark mr-1"></i>
                  Chưa thanh toán
                </dd>
              </dl>
            </div>
          </div>
  
          <!-- Danh sách sản phẩm trong đơn hàng -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Sản phẩm trong đơn hàng
            </h3>
            <div class="border border-black rounded-lg dark:border-black">
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">Tên sản phẩm</th>
                      <th scope="col" class="px-6 py-3">Giá</th>
                      <th scope="col" class="px-6 py-3">Số lượng</th>
                      <th scope="col" class="px-6 py-3">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="product in order?.products"
                      :key="product.id"
                      class="bg-white border-b border-black dark:bg-gray-800 dark:border-black"
                    >
                      <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {{ product.title }}
                      </td>
                      <td class="px-6 py-4">
                        {{ product.price.toLocaleString("vi-VN") }} VNĐ
                      </td>
                      <td class="px-6 py-4">{{ product.quantity }}</td>
                      <td class="px-6 py-4">
                        {{ (product.price * product.quantity).toLocaleString("vi-VN") }} VNĐ
                      </td>
                    </tr>
                    <tr v-if="!order?.products || order.products.length === 0">
                      <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        Không có sản phẩm trong đơn hàng này.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- Nút quay lại -->
          <div class="mt-6">
            <RouterLink
              :to="{ name: 'orders' }"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white border border-black rounded-lg hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <i class="fa-solid fa-arrow-left mr-2"></i>
              Quay lại danh sách đơn hàng
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
      color="#000000"
    />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import Loading from "vue-loading-overlay";
  import { orders } from "@/data/mockData";
  import { toast } from "vue3-toastify";
  
  const route = useRoute();
  const order = ref(null);
  const isLoading = ref(false);
  const fullPage = ref(true);
  
  function getOrderDetails() {
    isLoading.value = true;
    const orderId = route.params.id;
  
    try {
      setTimeout(() => {
        const foundOrder = orders.find((o) => o.id === orderId);
        if (foundOrder) {
          order.value = foundOrder;
          console.log("Order details fetched:", foundOrder);
        } else {
          console.error(`Order with id ${orderId} not found`);
          toast.error("Không tìm thấy đơn hàng!");
        }
        isLoading.value = false;
      }, 1000);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Có lỗi xảy ra khi lấy chi tiết đơn hàng!");
      isLoading.value = false;
    }
  }
  
  function onCancel() {
    console.log("Loading canceled by user");
    isLoading.value = false;
  }
  
  onMounted(() => {
    console.log("OrderDetail mounted, fetching order details...");
    getOrderDetails();
  });
  </script>
  
  <style lang="scss" scoped>
  :deep(.vld-icon) {
    .vld-overlay {
      .vld-background {
        background: #ffffff;
      }
    }
  }
  </style>