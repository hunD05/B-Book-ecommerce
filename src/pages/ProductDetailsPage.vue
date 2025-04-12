<template>
  <BreadcrumbComponent>
    <template #default>Products</template>
    <template #second>{{ product.title }}</template>
  </BreadcrumbComponent>
  <section class="py-5 mx-auto max-w-screen-xl px-3 md:px-0">
    <div class="flex flex-col md:flex-row gap-5 items-center justify-between">
      <div class="w-full">
        <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide" class="mb-5">
          <Slide v-for="(image, index) in resolvedImages" :key="index">
            <div class="gallery-slide">
              <img :src="image" alt="Gallery Image" class="gallery-image" />
            </div>
          </Slide>
        </Carousel>

        <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
          <Slide v-for="(image, index) in resolvedImages" :key="index">
            <template #default="{ currentIndex, isActive }">
              <div
                :class="['thumbnail', { 'is-active': isActive }]"
                @click="slideTo(currentIndex)"
              >
                <img
                  :src="image"
                  alt="Thumbnail Image"
                  class="thumbnail-image w-full"
                />
              </div>
            </template>
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
      <div class="w-full">
        <h2 class="text-3xl font-[400] text-gray-900">{{ product.title }}</h2>
        <div class="flex items-center text-xs mt-3">
          <p>{{ product.ratingsAverage }}</p>
          <i
            class="fa-solid fa-star text-black"
            v-for="i in [1, 2, 3, 4, 5].slice(0, Math.floor(product.ratingsAverage))"
            :key="i"
          ></i>
          <i
            class="fa-solid fa-star-half-stroke text-black"
            v-if="product.ratingsAverage % 1 !== 0"
          ></i>
          <p>({{ product.ratingsQuantity }} ratings)</p>
        </div>
        <div
          class="flex items-center text-2xl gap-2 mt-3"
          v-if="product.priceAfterDiscount"
        >
          <p class="font-[500] text-black">${{ product.priceAfterDiscount }}</p>
          <p class="text-gray-400 line-through">${{ product.price }}</p>
        </div>
        <p class="font-[500] text-2xl text-black mt-3" v-if="!product.priceAfterDiscount">
          ${{ product.price }}
        </p>
        <p class="text-gray-600 mt-3">{{ product.description }}</p>
        <!-- Danh sách thuộc tính -->
        <div class="mt-3">
          <h3 class="text-lg font-[500] text-gray-900 mb-2">Thông tin chi tiết</h3>
          <ul class="text-gray-600 space-y-1">
            <li>
              <span class="font-[500] text-gray-900">Chất liệu:</span> {{ product.material }}
            </li>
            <li>
              <span class="font-[500] text-gray-900">Loại bìa:</span> {{ product.coverType }}
            </li>
            <li>
              <span class="font-[500] text-gray-900">Ngôn ngữ:</span> {{ product.language }}
            </li>
            <li v-if="product.translator">
              <span class="font-[500] text-gray-900">Người dịch:</span> {{ product.translator }}
            </li>
            <li>
              <span class="font-[500] text-gray-900">Nhà xuất bản:</span> {{ product.publisher }}
            </li>
            <li>
              <span class="font-[500] text-gray-900">Tác giả:</span> {{ product.author }}
            </li>
            <li>
              <span class="font-[500] text-gray-900">Độ tuổi:</span> {{ product.ageRange }} tuổi
            </li>
          </ul>
        </div>
        <div
          class="flex items-center gap-4 mt-3 border-t-1 border-b-1 py-4 border-gray-200"
        >
          <!-- Phần chỉnh số lượng -->
          <div class="flex items-center border border-gray-200 rounded">
            <button
              @click="decreaseQuantity"
              class="h-[40px] w-[40px] flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <input
              type="number"
              v-model.number="quantity"
              min="1"
              @input="validateQuantity"
              class="w-[50px] h-[40px] text-center border-none focus:outline-none"
            />
            <button
              @click="increaseQuantity"
              class="h-[40px] w-[40px] flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <!-- Nút Add To Cart -->
          <button class="btn-primary w-full" @click="addToCart(product)">
            Add To Cart <i class="fa-solid fa-cart-shopping"></i>
          </button>
          <div>
            <div @click="addToWishlist">
              <i
                class="fa-regular fa-heart text-xl cursor-pointer bg-black/10 text-black p-3 rounded-full"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-5 mx-auto max-w-screen-xl px-3 md:px-0">
    <div class="text-center mb-5">
      <h2 class="text-2xl font-[600] text-gray-900">Sách đáng chú ý</h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <ProductCard
        v-for="relatedProduct in relatedProducts"
        :key="relatedProduct.id"
        :product="relatedProduct"
      />
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
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";
import ProductCard from "@/components/ProductCard.vue";
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import { products } from "@/data/mockData"; // Import products từ mockData.js
import { toast } from "vue3-toastify";

// Import ảnh
import bookImage from "@/assets/images/book.png";

// Ánh xạ ảnh
const imageMap = {
  "book.png": bookImage,
};

// Product carousel
const currentSlide = ref(0);

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  slideEffect: "fade",
  mouseDrag: true,
  touchDrag: true,
  height: 500,
};

const thumbnailsConfig = {
  height: 120,
  itemsToShow: 6,
  wrapAround: true,
  touchDrag: false,
  gap: 15,
};

// Product data
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const isLoading = ref(true);
const product = ref({});
const relatedProducts = ref([]);

// Ánh xạ product.images thành URL hợp lệ
const resolvedImages = computed(() => {
  if (!product.value.images) return [];
  return product.value.images.map((imageName) => imageMap[imageName] || bookImage);
});

// Giỏ hàng và trạng thái đăng nhập
const cartItems = ref([]);
const isLoggedIn = ref(!!localStorage.getItem("token"));
const quantity = ref(1);

// Tải dữ liệu khi mounted
onMounted(() => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
  }

  // Giả lập thời gian tải dữ liệu
  setTimeout(() => {
    const foundProduct = products.find((p) => p.id.toString() === id.toString());
    if (foundProduct) {
      product.value = foundProduct;
      relatedProducts.value = products.slice(0, 5);
      console.log("Related Products:", relatedProducts.value);
    } else {
      console.error(`Không tìm thấy sản phẩm với id: ${id}`);
      product.value = {};
      relatedProducts.value = products.slice(0, 5);
    }
    isLoading.value = false;
  }, 1000);

  window.addEventListener("user-updated", handleUserUpdate);
});

// Xử lý khi id thay đổi
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      isLoading.value = true;
      setTimeout(() => {
        const foundProduct = products.find((p) => p.id.toString() === newId.toString());
        if (foundProduct) {
          product.value = foundProduct;
          relatedProducts.value = products.slice(0, 5);
          console.log("Updated Related Products:", relatedProducts.value);
        } else {
          console.error(`Không tìm thấy sản phẩm với id: ${newId}`);
          product.value = {};
          relatedProducts.value = products.slice(0, 5);
        }
        isLoading.value = false;
      }, 1000);
    }
  }
);

// Tăng số lượng
function increaseQuantity() {
  quantity.value++;
}

// Giảm số lượng
function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

// Kiểm tra số lượng
function validateQuantity() {
  if (quantity.value < 1 || isNaN(quantity.value)) {
    quantity.value = 1;
    toast.warning("Số lượng phải lớn hơn 0!");
  }
}

// Cập nhật trạng thái đăng nhập
const handleUserUpdate = () => {
  isLoggedIn.value = !!localStorage.getItem("token");
};

// Hàm định dạng ngày tháng
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Thêm vào wishlist
const addToWishlist = () => {
  if (!isLoggedIn.value) {
    toast.error("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
    router.push({ name: "login" });
    return;
  }

  if (product.value.id) {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    const exists = wishlistItems.some((item) => item.id === product.value.id);
    if (!exists) {
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      const productWithDate = {
        ...product.value,
        addedAt: formattedDate, // Thêm thời gian vào sản phẩm
      };
      wishlistItems.push(productWithDate);
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
      window.dispatchEvent(new Event("wishlist-updated"));
      toast.success(
        `Đã thêm "${product.value.title}" vào danh sách yêu thích lúc ${formattedDate}!`,
        { autoClose: 3000 }
      );
    } else {
      const existingItem = wishlistItems.find((item) => item.id === product.value.id);
      toast.info(
        `"${product.value.title}" đã có trong danh sách yêu thích (thêm lúc ${existingItem.addedAt})!`,
        { autoClose: 3000 }
      );
    }
  } else {
    toast.error("Không thể thêm sản phẩm vào danh sách yêu thích!");
  }
};

// Thêm vào giỏ hàng
const addToCart = (productToAdd) => {
  if (!isLoggedIn.value) {
    toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
    router.push({ name: "login" });
    return;
  }

  if (!productToAdd || !productToAdd.id) {
    toast.error("Không thể thêm sản phẩm vào giỏ hàng!");
    return;
  }

  if (quantity.value < 1 || isNaN(quantity.value)) {
    quantity.value = 1;
    toast.error("Số lượng phải lớn hơn 0!");
    return;
  }

  const existingItem = cartItems.value.find((item) => item.id === productToAdd.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + quantity.value;
    toast.success(`Đã tăng số lượng "${productToAdd.title}" trong giỏ hàng!`, {
      autoClose: 2000,
    });
  } else {
    cartItems.value.push({ ...productToAdd, quantity: quantity.value });
    toast.success(`Đã thêm ${quantity.value} "${productToAdd.title}" vào giỏ hàng!`, {
      autoClose: 2000,
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  setTimeout(() => {
    window.dispatchEvent(new Event("cart-updated"));
  }, 0);

  quantity.value = 1;
};

// Hàm hủy loading
function onCancel() {
  isLoading.value = false;
}

const fullPage = ref(true);
</script>

<style lang="scss" scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.text-primary {
  color: #000000 !important;
}

.bg-primary\/10 {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.btn-primary {
  background-color: #000000 !important;
  color: #ffffff !important;
}

.btn-primary:hover {
  background-color: #333333 !important;
}

/* Điều chỉnh màu sao đánh giá */
.fa-star,
.fa-star-half-stroke {
  color: #000000 !important;
}

/* Cải thiện carousel chính */
.gallery-slide {
  position: relative;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.gallery-slide:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.gallery-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-slide:hover .gallery-image {
  transform: scale(1.05);
}

/* Cải thiện thumbnail */
.thumbnail {
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.thumbnail.is-active {
  border: 2px solid #000000 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.thumbnail:hover {
  transform: scale(1.1);
  border: 2px solid #333333;
}

.thumbnail-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.thumbnail:hover .thumbnail-image {
  filter: brightness(1.1);
}
</style>