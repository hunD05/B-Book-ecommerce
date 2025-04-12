<template>
    <section class="py-5 flex flex-col justify-center items-center">
        <img src="@/assets/images/404.png" alt="không tìm thấy" class="w-1/2" />
        <h1 class="text-4xl mt-5 font-bold text-gray-900">Ôi! Không tìm thấy trang</h1>
        <p class="text-gray-500 mt-3">
            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <RouterLink to="/" class="btn-primary mt-5">Về trang chủ</RouterLink>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>