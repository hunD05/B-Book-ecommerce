<template>
  <div
    class="relative overflow-hidden border-1 border-gray-200 rounded-sm p-3 group hover:border-black hover:shadow-[0_0_12px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer"
    @click="viewDetails"
  >
    <!-- Hình ảnh sản phẩm -->
    <img :src="resolvedImage" alt="" class="w-full h-48 object-cover" />

    <!-- Thông tin sản phẩm -->
    <div class="flex justify-between mt-3">
      <div>
        <h3 class="text-gray-700 group-hover:text-black line-clamp-2">
          {{ product.title }}
        </h3>
        <!-- Giá -->
        <div class="flex items-center gap-2" v-if="product.priceAfterDiscount">
          <p class="font-[500]">{{ product.priceAfterDiscount.toLocaleString() }}đ</p>
          <p class="text-gray-400 line-through">{{ product.price.toLocaleString() }}đ</p>
        </div>
        <p class="font-[500]" v-if="!product.priceAfterDiscount">
          {{ product.price.toLocaleString() }}đ
        </p>
        <!-- Đánh giá -->
        <div class="flex items-center text-xs mt-1 gap-1">
          <p>{{ product.ratingsAverage }}</p>
          <i
            class="fa-solid fa-star text-yellow-400"
            v-for="i in [1, 2, 3, 4, 5].slice(0, Math.floor(product.ratingsAverage))"
            :key="i"
          ></i>
          <i
            class="fa-solid fa-star-half-stroke text-yellow-400"
            v-if="product.ratingsAverage % 1 !== 0"
          ></i>
          <p>({{ product.ratingsQuantity }} ratings)</p>
        </div>
      </div>
      <!-- Icon giỏ hàng (chỉ để trang trí) -->
      <div
        class="h-[40px] w-[40px] bg-white border-1 border-gray-200 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-300"
      >
        <i
          class="fa-solid fa-cart-shopping text-lg text-black group-hover:text-white transition-all duration-300"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

// Import ảnh
import bookImage from "@/assets/images/book.png";

// Ánh xạ ảnh
const imageMap = {
  "book.png": bookImage,
};

// Nhận props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Ánh xạ product.image thành URL hợp lệ
const resolvedImage = computed(() => imageMap[props.product.image] || bookImage);

const router = useRouter();

// Hàm xem chi tiết
const viewDetails = () => {
  router.push({ name: "product-detail", params: { id: props.product.id } });
};
</script>

<style lang="scss" scoped>
.font-roboto {
  font-family: "Roboto", sans-serif;
}

.border {
  transition: box-shadow 0.3s ease;
}

img {
  object-fit: cover;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>