<template>
    <section class="py-5">
      <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 mx-auto max-w-screen-xl px-4 md:px-0">
        <Carousel v-bind="config" class="w-full h-full">
          <Slide>
            <img src="../assets/images/Banner.png" alt="Banner sách thiếu nhi" class="w-full h-full rounded-lg" />
            <div class="absolute bottom-10 right-[5%]">
              <button
                class="bg-black text-white font-semibold cursor-pointer rounded-full px-3 py-1 md:px-[32px] md:py-[14px] hover:bg-gray-800 transition-all duration-300"
              >
                Mua ngay <i class="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </Slide>
          <Slide>
            <img src="../assets/images/Banner.png" alt="Banner sách thiếu nhi" class="w-full h-full rounded-lg" />
            <div class="absolute bottom-10 right-[5%]">
              <button
                class="bg-black text-white font-semibold cursor-pointer rounded-full px-3 py-1 md:px-[32px] md:py-[14px] hover:bg-gray-800 transition-all duration-300"
              >
                Mua ngay <i class="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </Slide>
          <Slide>
            <img src="../assets/images/Banner.png" alt="Banner sách thiếu nhi" class="w-full h-full rounded-lg" />
            <div class="absolute bottom-10 right-[5%]">
              <button
                class="bg-black text-white font-semibold cursor-pointer rounded-full px-3 py-1 md:px-[32px] md:py-[14px] hover:bg-gray-800 transition-all duration-300"
              >
                Mua ngay <i class="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <div class="flex flex-col gap-5">
          <div class="relative">
            <img src="../assets/images/Banner.png" alt="Banner giảm giá sách" class="w-full rounded-lg" />
            <div class="absolute bottom-10 left-[8%]">
              <button
                class="text-red-600 font-semibold cursor-pointer bg-white/80 rounded-full px-3 py-1 hover:text-red-800 transition-all duration-300"
              >
                Mua ngay <i class="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
          <div class="relative">
            <img src="../assets/images/Banner.png" alt="Banner sách nổi bật" class="w-full rounded-lg" />
            <div class="absolute bottom-10 right-[8%]">
              <button
                class="text-red-600 font-semibold cursor-pointer bg-white/80 rounded-full px-3 py-1 hover:text-red-800 transition-all duration-300"
              >
                Mua ngay <i class="fa-solid fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section class="py-5 px-3">
      <div
        class="grid grid-cols-1 md:grid-cols-4 gap-5 py-5 mx-auto max-w-screen-xl px-4 rounded shadow-[0_8px_40px_rgba(0,0,0,0.1)] md:p-[40px]"
      >
        <div class="flex items-center">
          <i class="fa-solid fa-truck-fast text-black text-3xl"></i>
          <div class="ml-3">
            <p class="text-sm font-[500] text-gray-900">Miễn phí vận chuyển</p>
            <p class="text-sm font-[300] text-gray-600 opacity-80">Miễn phí vận chuyển cho mọi đơn hàng</p>
          </div>
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-headset text-black text-3xl"></i>
          <div class="ml-3">
            <p class="text-sm font-[500] text-gray-900">Hỗ trợ 24/7</p>
            <p class="text-sm font-[300] text-gray-600 opacity-80">Hỗ trợ nhanh chóng mọi lúc</p>
          </div>
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-bag-shopping text-black text-3xl"></i>
          <div class="ml-3">
            <p class="text-sm font-[500] text-gray-900">Thanh toán an toàn</p>
            <p class="text-sm font-[300] text-gray-600 opacity-80">Đảm bảo an toàn cho mọi giao dịch</p>
          </div>
        </div>
        <div class="flex items-center">
          <i class="fa-solid fa-box text-black text-3xl"></i>
          <div class="ml-3">
            <p class="text-sm font-[500] text-gray-900">Bảo hành đổi trả</p>
            <p class="text-sm font-[300] text-gray-600 opacity-80">Đổi trả trong 30 ngày</p>
          </div>
        </div>
      </div>
    </section>
  
    <!-- Sách -->
    <section ref="booksSection" class="py-10 mx-auto max-w-screen-xl px-3 md:px-0">
      <div class="flex justify-between mb-5">
        <h2 class="text-2xl font-[600] text-gray-900">Sách</h2>
        <router-link to="/products" class="text-black cursor-pointer hover:text-gray-600 transition-all duration-300">
          Xem tất cả <i class="fa-solid fa-arrow-right ml-2"></i>
        </router-link>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <BookCard v-for="product in filteredProductsData" :key="product.id" :product="product" />
      </div>
    </section>
  
    <!-- Sách nổi bật -->
    <section class="py-10 mx-auto max-w-screen-xl px-3 md:px-0">
      <div class="flex justify-between mb-5">
        <h2 class="text-2xl font-[600] text-gray-900">Sách nổi bật</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <ProductCard v-for="product in featuredProductsData" :key="product.id" :product="product" />
      </div>
    </section>
    <loading v-model:active="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage" color="#000000" />
  </template>
  
  <script setup>
  import BookCard from "@/components/Book.vue";
  import ProductCard from "@/components/ProductCard.vue";
  import { ref, onMounted, onUnmounted } from "vue";
  import Loading from "vue-loading-overlay";
  import "vue3-carousel/carousel.css";
  import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
  import { products, categories } from "@/data/mockData.js";
  
  const config = {
    autoplay: 3000,
    pauseAutoplayOnHover: true,
    wrapAround: true,
    itemsToShow: 1,
    gap: 5,
  };
  
  const isLoading = ref(false);
  const fullPage = ref(true);
  const categoriesData = ref([]);
  const filteredProductsData = ref([]); // Dữ liệu cho phần "Sách"
  const featuredProductsData = ref([]); // Dữ liệu cho phần "Sách nổi bật"
  const booksSection = ref(null);
  
  // Lọc sản phẩm theo danh mục lớn
  const filterProductsByCategory = (categoryId) => {
    isLoading.value = true;
    console.log("Filtering products for categoryId:", categoryId);
    setTimeout(() => {
      if (categoryId) {
        filteredProductsData.value = products.filter((product) => product.category._id === categoryId);
      } else {
        filteredProductsData.value = products.slice(0, 20); // Hiển thị tất cả sản phẩm (tối đa 20)
      }
      isLoading.value = false;
      console.log("Filtered products:", filteredProductsData.value);
      scrollToBooksSection();
    }, 500);
  };
  
  // Lọc sản phẩm theo danh mục nhỏ
  const filterProductsBySubcategory = (category, subcategory) => {
    isLoading.value = true;
    console.log("Filtering products for:", { category, subcategory });
    setTimeout(() => {
      if (category === "thể loại") {
        // Lọc theo category.value cho danh mục "Thể loại"
        filteredProductsData.value = products.filter((product) => product.category.value === subcategory);
      } else {
        // Lọc theo các thuộc tính khác (material, coverType, language, ...)
        const keyMap = {
          "chất liệu": "material",
          "loại bìa": "coverType",
          "ngôn ngữ": "language",
          "người dịch": "translator",
          "nhà xuất bản": "publisher",
          "tác giả": "author",
        };
        const key = keyMap[category.toLowerCase()];
        filteredProductsData.value = products.filter((product) => product[key] === subcategory);
      }
      isLoading.value = false;
      console.log("Filtered products:", filteredProductsData.value);
      scrollToBooksSection();
    }, 500);
  };
  
  // Cuộn đến phần Sách
  const scrollToBooksSection = () => {
    setTimeout(() => {
      if (booksSection.value) {
        booksSection.value.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error("booksSection ref is not defined");
      }
    }, 100);
  };
  
  // Giả lập dữ liệu khi mounted
  onMounted(() => {
    isLoading.value = true;
    setTimeout(() => {
      categoriesData.value = categories;
      filteredProductsData.value = products.slice(0, 20); // Hiển thị tối đa 20 sản phẩm cho "Sách"
      // Sách nổi bật: Lấy 5 sản phẩm có ratingsAverage cao nhất
      featuredProductsData.value = [...products]
        .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
        .slice(0, 5);
      isLoading.value = false;
    }, 1000);
  
    // Lắng nghe sự kiện category-selected từ MainNavbar
    window.addEventListener("category-selected", (event) => {
      const categoryId = event.detail.categoryId;
      console.log("Category selected event received with categoryId:", categoryId);
      filterProductsByCategory(categoryId);
    });
  
    // Lắng nghe sự kiện subcategory-selected từ MainNavbar
    window.addEventListener("subcategory-selected", (event) => {
      const { category, subcategory } = event.detail;
      console.log("Subcategory selected event received:", { category, subcategory });
      filterProductsBySubcategory(category, subcategory);
    });
  });
  
  onUnmounted(() => {
    window.removeEventListener("category-selected", (event) => {
      filterProductsByCategory(event.detail.categoryId);
    });
    window.removeEventListener("subcategory-selected", (event) => {
      filterProductsBySubcategory(event.detail.category, event.detail.subcategory);
    });
  });
  
  function onCancel() {
    isLoading.value = false;
  }
  </script>
  
  <style scoped>
  button:hover {
    transition: all 0.3s ease;
  }
  </style>