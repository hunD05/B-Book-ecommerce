<template>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mx-auto max-w-5xl">
          <div class="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-200 sm:text-2xl">
              Đơn hàng của tôi
            </h2>
          </div>
          <div class="mt-6 flow-root sm:mt-8">
            <div class="divide-y divide-gray-300 dark:divide-gray-600">
              <div
                class="flex flex-wrap items-center gap-y-4 py-6"
                v-for="order in ordersList"
                :key="order.id"
              >
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-600 dark:text-gray-400">
                    Mã đơn hàng:
                  </dt>
                  <dd
                    class="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-200"
                  >
                    <a href="#" class="hover:underline">#{{ order.id }}</a>
                  </dd>
                </dl>
  
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-600 dark:text-gray-400">
                    Ngày đặt:
                  </dt>
                  <dd
                    class="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-200"
                  >
                    {{
                      new Date(order.createdAt).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </dd>
                </dl>
  
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-600 dark:text-gray-400">
                    Giá trị:
                  </dt>
                  <dd
                    class="mt-1.5 text-base font-semibold text-gray-900 dark:text-gray-200"
                  >
                    {{ order.totalOrderPrice.toLocaleString("vi-VN") }} VNĐ
                  </dd>
                </dl>
  
                <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                  <dt class="text-base font-medium text-gray-600 dark:text-gray-400">
                    Trạng thái:
                  </dt>
                  <dd
                    v-if="order.isPaid"
                    class="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-800 dark:text-green-200"
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
                    class="me-2 mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-800 dark:text-red-200"
                  >
                    <i class="fa-solid fa-xmark mr-1"></i>
                    Chưa thanh toán
                  </dd>
                </dl>
  
                <div
                  class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4"
                >
                  <RouterLink
                    :to="{ name: 'products' }"
                    type="button"
                    class="w-full rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:w-auto"
                  >
                    Đặt lại
                  </RouterLink>
                  <RouterLink
                    :to="{ name: 'order-detail', params: { id: order.id } }"
                    type="button"
                    class="w-full inline-flex justify-center rounded-lg border border-black bg-white px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-black focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-300 lg:w-auto"
                  >
                    Xem chi tiết
                  </RouterLink>
                </div>
              </div>
            </div>
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
  import Loading from "vue-loading-overlay";
  import { orders } from "@/data/mockData";
  import { toast } from "vue3-toastify";
  
  const ordersList = ref([]);
  const isLoading = ref(false);
  const fullPage = ref(true);
  
  function getOrders() {
    console.log("Starting to fetch orders...");
    isLoading.value = true;
  
    try {
      if (!orders || orders.length === 0) {
        console.error("No orders found in mockData.js");
        toast.error("Không tìm thấy đơn hàng!");
        isLoading.value = false;
        return;
      }
  
      setTimeout(() => {
        console.log("Orders fetched:", orders);
        ordersList.value = orders;
        isLoading.value = false;
        console.log("Loading finished, isLoading:", isLoading.value);
      }, 1000);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
      isLoading.value = false;
    }
  }
  
  function onCancel() {
    console.log("Loading canceled by user");
    isLoading.value = false;
  }
  
  onMounted(() => {
    console.log("OrdersPage mounted, calling getOrders...");
    getOrders();
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