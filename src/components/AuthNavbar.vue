<template>
    <nav class="bg-black border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <h1 class="text-white">B-Book</h1>
            <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <router-link to="/register" class="text-sm text-white hover:underline hover:text-gray-300 transition-colors duration-300">
                    Đăng ký</router-link>
                <router-link to="/login" class="text-sm text-white hover:underline hover:text-gray-300 transition-colors duration-300">
                    Đăng nhập</router-link>
            </div>
        </div>
    </nav>
    <nav class="bg-gray-900">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
            <div class="flex items-center justify-between">
                <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                    <li>
                        <RouterLink
                            class="text-gray-300 hover:underline hover:text-gray-100 transition-colors duration-300"
                            to="/"
                            active-class="text-white font-bold"
                            >Trang chủ</RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            to="/products"
                            class="text-gray-300 hover:underline hover:text-gray-100 transition-colors duration-300"
                            active-class="text-white font-bold"
                            >Sản phẩm</RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            to="/categories"
                            class="text-gray-300 hover:underline hover:text-gray-100 transition-colors duration-300"
                            active-class="text-white font-bold"
                            >Danh mục</RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            to="/brands"
                            class="text-gray-300 hover:underline hover:text-gray-100 transition-colors duration-300"
                            active-class="text-white font-bold"
                            >Thương hiệu</RouterLink>
                    </li>
                </ul>
                <ul class="hidden md:block">
                    <li class="flex items-center space-x-2 rtl:space-x-reverse">
                        <img src="@/assets/icons/phone.svg" alt="Biểu tượng điện thoại" />
                        <a href="tel:0345512856" class="text-sm text-white hover:underline hover:text-gray-200 transition-colors duration-300">
                            0345 512 856</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink
  }
};
</script>

<style scoped>
/* Tùy chỉnh thêm nếu cần */
nav {
  transition: all 0.3s ease; /* Hiệu ứng chuyển màu mượt mà */
}

a, h1 {
  transition: color 0.3s ease; /* Hiệu ứng hover mượt mà */
}
</style>