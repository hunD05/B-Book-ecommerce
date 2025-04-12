<template>
  <div class="container mx-auto p-4">
    <!-- Dòng 1: Logo, Menu chính, Thanh tìm kiếm, Biểu tượng -->
    <div class="flex items-center">
      <!-- Logo và Menu chính (căn trái) -->
      <div class="flex items-center">
        <h1 class="text-2xl font-bold text-black mr-3">B-Book</h1>
        <nav class="ml-6 flex space-x-4 items-center">
          <RouterLink to="/" class="text-gray-600 hover:text-black no-underline">Trang chủ</RouterLink>
          <div class="relative" @mouseenter="showCategoryDropdown = true" @mouseleave="hideCategoryDropdown">
            <button class="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none py-2 px-3">
              <i class="fa-solid fa-bars-staggered"></i>
            </button>
            <!-- Dropdown Danh mục sản phẩm -->
            <div v-show="showCategoryDropdown"
              class="absolute z-50 bg-white shadow-xl border-t border-gray-300 mt-1 w-[800px] text-black rounded-lg left-0 transition-all duration-300 ease-in-out">
              <div class="grid grid-cols-3 gap-4 p-6 w-full">
                <ul class="col-span-1 space-y-3 font-semibold text-gray-800">
                  <li @click="filterProducts('')"
                    class="hover:text-black cursor-pointer transition-colors py-1 px-2 rounded hover:bg-gray-100">
                    Tất cả sản phẩm
                  </li>
                  <li v-for="category in categories" :key="category._id" @mouseover="selectCategory(category._id)"
                    class="hover:text-black cursor-pointer transition-colors py-1 px-2 rounded hover:bg-gray-100">
                    {{ category.name }}
                  </li>
                </ul>
                <div class="col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div v-for="item in currentSubcategories" :key="item.title">
                    <h3 class="font-bold mb-2 text-gray-800">{{ item.title }}</h3>
                    <ul class="space-y-1">
                      <li v-for="sub in item.items" :key="sub">
                        <a href="#" @click.prevent="filterSubcategory(sub)"
                          class="hover:text-black transition-colors block py-1 px-2 rounded hover:bg-gray-100">{{ sub
                          }}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <!-- Thanh tìm kiếm (căn giữa) -->
      <div class="flex-1 flex justify-center mx-4">
        <div class="relative w-1/2">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Nhập từ khóa tìm kiếm"
            class="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keydown.enter="handleSearch"
          />
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
      </div>

      <!-- Biểu tượng (căn phải) -->
      <div class="flex items-center space-x-4">
        <RouterLink to="/wishlist" class="relative">
          <i class="fas fa-heart text-gray-600 hover:text-black"></i>
          <span
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {{ numOfWishlistItems }}
          </span>
        </RouterLink>
        <RouterLink to="/cart" class="relative">
          <i class="fas fa-shopping-cart text-gray-600 hover:text-black"></i>
          <span
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {{ numOfCartItems }}
          </span>
        </RouterLink>
        <!-- Nếu chưa đăng nhập, hiển thị button Đăng nhập -->
        <RouterLink v-if="!isLoggedIn" to="/login"
          class="text-gray-600 hover:text-black bg-gray-100 px-3 py-1 rounded-lg no-underline">
          Đăng nhập
        </RouterLink>
        <!-- Nếu đã đăng nhập, hiển thị dropdown -->
        <div v-else class="relative">
          <button type="button" @click="toggleDropdown"
            class="flex items-center text-sm text-gray-600 hover:text-purple-600 focus:outline-none"
            id="user-menu-button">
            Xin chào, {{ userName }}!
          </button>
          <!-- Dropdown Người dùng -->
          <div v-if="showDropdown"
            class="z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div class="px-4 py-3">
              <span class="block text-sm text-black font-semibold">{{ userName }}</span>
              <span class="block text-sm text-gray-500 truncate">{{ userEmail }}</span>
            </div>
            <ul class="py-2">
              <li>
                <a @click="goToOrders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Đơn hàng của tôi
                </a>
              </li>
              <li>
                <a @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { categories } from "@/data/mockData.js";

const router = useRouter();

// Tìm kiếm
const searchQuery = ref("");

// Dropdown danh mục
const showCategoryDropdown = ref(false);
const currentSubcategories = ref([]);
const selectedCategoryId = ref(null);

// Dropdown người dùng
const showDropdown = ref(false);
const isLoggedIn = ref(false);
const userName = ref("");
const userEmail = ref("");

// Giỏ hàng và wishlist
const cartItems = ref([]);
const numOfCartItems = ref(0);
const wishlistItems = ref([]);
const numOfWishlistItems = ref(0);

// Xử lý tìm kiếm
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/products", query: { search: searchQuery.value.trim() } });
  }
};

const selectCategory = (categoryId) => {
  selectedCategoryId.value = categoryId;
  const selectedCategory = categories.find((cat) => cat._id === categoryId);
  currentSubcategories.value = selectedCategory?.subcategories || [];
};

const hideCategoryDropdown = () => {
  setTimeout(() => {
    showCategoryDropdown.value = false;
  }, 300);
};

const filterProducts = (categoryId) => {
  showCategoryDropdown.value = false;
  window.dispatchEvent(new CustomEvent("category-selected", { detail: { categoryId } }));
  console.log("Filter products triggered with categoryId:", categoryId);
};

const filterSubcategory = (subcategory) => {
  showCategoryDropdown.value = false;
  const category = categories.find((cat) => cat._id === selectedCategoryId.value);
  const categoryName = category?.name.toLowerCase();
  window.dispatchEvent(
    new CustomEvent("subcategory-selected", {
      detail: {
        category: categoryName,
        subcategory,
      },
    })
  );
  console.log("Filter subcategory triggered:", { category: categoryName, subcategory });
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const loadUserInfo = () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    userName.value = userData.name || "Người dùng";
    userEmail.value = userData.email || "email@bbook.vn";
  } else {
    userName.value = "";
    userEmail.value = "";
  }
};

const loadCartItems = () => {
  const savedCart = localStorage.getItem("cartItems");
  cartItems.value = savedCart ? JSON.parse(savedCart) : [];
  numOfCartItems.value = cartItems.value.reduce((total, item) => total + (item.quantity || 0), 0);
};

const loadWishlistItems = () => {
  const savedWishlist = localStorage.getItem("wishlistItems");
  wishlistItems.value = savedWishlist ? JSON.parse(savedWishlist) : [];
  numOfWishlistItems.value = wishlistItems.value.length;
};

const handleCartUpdate = () => {
  loadCartItems();
};

const handleWishlistUpdate = () => {
  loadWishlistItems();
};

const handleUserUpdate = () => {
  isLoggedIn.value = !!localStorage.getItem("token");
  loadUserInfo();
  showDropdown.value = false;
};

const goToOrders = () => {
  router.push({ name: "orders" });
  showDropdown.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("wishlistItems"); 
  isLoggedIn.value = false;
  userName.value = "";
  userEmail.value = "";
  cartItems.value = []; // Đặt lại giỏ hàng về rỗng
  numOfCartItems.value = 0; // Cập nhật số lượng giỏ hàng về 0
  toast.success("Đăng xuất thành công!", {
    autoClose: 10000, // Hiển thị thông báo trong 10 giây
  });
  // Trì hoãn chuyển hướng để thông báo hiển thị đủ thời gian
  setTimeout(() => {
    router.push({ name: "login" });
    showDropdown.value = false;
  }, 3000);
};

let intervalId = null;
const pollLocalStorage = () => {
  intervalId = setInterval(() => {
    const savedCart = localStorage.getItem("cartItems");
    const currentCart = savedCart ? JSON.parse(savedCart) : [];
    if (JSON.stringify(currentCart) !== JSON.stringify(cartItems.value)) {
      cartItems.value = currentCart;
      numOfCartItems.value = cartItems.value.reduce((total, item) => total + (item.quantity || 0), 0);
    }

    const savedWishlist = localStorage.getItem("wishlistItems");
    const currentWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    if (JSON.stringify(currentWishlist) !== JSON.stringify(wishlistItems.value)) {
      wishlistItems.value = currentWishlist;
      numOfWishlistItems.value = wishlistItems.value.length;
    }
  }, 1000);
};

onMounted(() => {
  loadCartItems();
  loadWishlistItems();
  window.addEventListener("cart-updated", handleCartUpdate);
  window.addEventListener("wishlist-updated", handleWishlistUpdate);
  window.addEventListener("user-updated", handleUserUpdate);
  pollLocalStorage();
});

onUnmounted(() => {
  window.removeEventListener("cart-updated", handleCartUpdate);
  window.removeEventListener("wishlist-updated", handleWishlistUpdate);
  window.removeEventListener("user-updated", handleUserUpdate);
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.transition-all {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.transition-all[v-show="true"] {
  opacity: 1;
  transform: translateY(0);
}

.transition-all[v-show="false"] {
  opacity: 0;
  transform: translateY(-10px);
  pointer-events: none;
}

.no-underline {
  text-decoration: none;
}
</style>