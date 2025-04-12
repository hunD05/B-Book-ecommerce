<template>
  <div>
    <BreadcrumbComponent :items="[{ label: 'Trang chủ', to: '/' }, { label: 'Sách yêu thích' }]" />
    <div class="wishlist-page">
      <Loading v-if="isLoading" :is-full-page="true" color="#000000" />
      <div v-else-if="wishlistItems.length === 0" class="empty-wishlist">
        <p>Chưa có sản phẩm nào trong danh sách yêu thích.</p>
        <RouterLink to="/products" class="btn btn-primary">Khám phá ngay</RouterLink>
      </div>
      <div v-else class="wishlist-items">
        <div v-for="item in wishlistItems" :key="item.id" class="wishlist-item">
          <RouterLink :to="`/products/${item.id}`" class="item-link">
            <img :src="resolveImage(item.image)" :alt="item.title" class="item-image" />
            <div class="item-details">
              <h3>{{ item.title || "Không có tiêu đề" }}</h3>
              <p>{{ item.category?.name || "Không có danh mục" }}</p>
              <p class="price">{{ (item.price || 0).toLocaleString() }} VNĐ</p>
              <p>Thêm vào: {{ item.addedAt || "Không rõ thời gian" }}</p>
            </div>
          </RouterLink>
          <div class="item-actions">
            <button @click="addToCart(item)" class="btn btn-primary">Thêm vào giỏ</button>
            <button @click="removeFromWishlist(item.id)" class="btn btn-danger">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";
import Loading from "vue-loading-overlay";
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";

// Import ảnh
import bookImage from "@/assets/images/book.png";

// Ánh xạ ảnh
const imageMap = {
  "book.png": bookImage,
};

// Hàm ánh xạ ảnh
const resolveImage = (imageName) => {
  return imageMap[imageName] || "https://via.placeholder.com/100";
};

const router = useRouter();
const isLoading = ref(true);
const wishlistItems = ref([]);
const isLoggedIn = ref(!!localStorage.getItem("token"));

const loadWishlist = () => {
  const savedWishlist = localStorage.getItem("wishlistItems");
  wishlistItems.value = savedWishlist ? JSON.parse(savedWishlist) : [];
  console.log("Loaded wishlist in WishlistPage:", wishlistItems.value); // Debug dữ liệu
};

// Xử lý sự kiện wishlist-updated
const handleWishlistUpdate = () => {
  loadWishlist();
};

const removeFromWishlist = (id) => {
  const index = wishlistItems.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    const removedItem = wishlistItems.value[index];
    wishlistItems.value.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems.value));
    toast.success(`Đã xóa "${removedItem.title}" khỏi danh sách yêu thích!`);
    window.dispatchEvent(new Event("wishlist-updated")); // Cập nhật badge trong MainNavbar
  }
};

const addToCart = (product) => {
  if (!isLoggedIn.value) {
    toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
    router.push({ name: "login" });
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    toast.success(`Đã tăng số lượng "${product.title}" trong giỏ hàng!`, {
      autoClose: 2000,
    });
  } else {
    cartItems.push({ ...product, quantity: 1 });
    toast.success(`Đã thêm "${product.title}" vào giỏ hàng!`, {
      autoClose: 2000,
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("cart-updated")); // Cập nhật badge trong MainNavbar
};

onMounted(() => {
  loadWishlist(); // Tải ngay lập tức để kiểm tra
  window.addEventListener("wishlist-updated", handleWishlistUpdate);
  setTimeout(() => {
    isLoading.value = false;
  }, 1000); // Giả lập loading
});

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", handleWishlistUpdate);
});
</script>

<style scoped>
.wishlist-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.wishlist-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.wishlist-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  transition: box-shadow 0.3s ease;
}

.wishlist-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.item-details p {
  margin: 5px 0;
  font-size: 14px;
}

.price {
  color: #e91e63;
  font-weight: bold;
}

.item-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #1976d2;
  color: white;
}

.btn-primary:hover {
  background-color: #1565c0;
}

.btn-danger {
  background-color: #e91e63;
  color: white;
}

.btn-danger:hover {
  background-color: #d81b60;
}

.empty-wishlist {
  text-align: center;
  padding: 40px;
}

.empty-wishlist p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}
</style>