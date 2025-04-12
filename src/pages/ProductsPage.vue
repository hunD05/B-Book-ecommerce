<template>
  <BreadcrumbComponent>
    <template #default>Sản phẩm</template>
  </BreadcrumbComponent>
  <section class="py-5 mx-auto max-w-screen-xl px-3 md:px-0">
    <div class="flex flex-col md:flex-row gap-5">
      <!-- Sidebar bộ lọc (trái) -->
      <div class="w-full md:w-1/5">
        <!-- Nhóm sản phẩm -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Nhóm sản phẩm</h3>
          <div class="flex flex-col gap-2">
            <label v-for="category in categoryOptions" :key="category" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedCategories"
                :value="category"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ category }}</span>
            </label>
          </div>
        </div>
        <!-- Độ tuổi -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Độ tuổi</h3>
          <div class="flex flex-col gap-2">
            <label v-for="age in ageOptions" :key="age" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedAges"
                :value="age"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ age }} tuổi</span>
            </label>
          </div>
        </div>
        <!-- Giá -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Giá</h3>
          <div class="flex flex-col gap-2">
            <label v-for="range in priceRanges" :key="range.label" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedPriceRanges"
                :value="range.value"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ range.label }}</span>
            </label>
          </div>
        </div>
        <!-- Tác giả -->
        <div v-if="authorOptions.length" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Tác giả</h3>
          <div class="flex flex-col gap-2">
            <label v-for="author in authorOptions" :key="author" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedAuthors"
                :value="author"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ author }}</span>
            </label>
          </div>
        </div>
        <!-- Chất liệu -->
        <div v-if="materialOptions.length" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Chất liệu</h3>
          <div class="flex flex-col gap-2">
            <label v-for="material in materialOptions" :key="material" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedMaterials"
                :value="material"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ material }}</span>
            </label>
          </div>
        </div>
        <!-- Loại bìa -->
        <div v-if="coverTypeOptions.length" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Loại bìa</h3>
          <div class="flex flex-col gap-2">
            <label v-for="coverType in coverTypeOptions" :key="coverType" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedCoverTypes"
                :value="coverType"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ coverType }}</span>
            </label>
          </div>
        </div>
        <!-- Ngôn ngữ -->
        <div v-if="languageOptions.length" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Ngôn ngữ</h3>
          <div class="flex flex-col gap-2">
            <label v-for="language in languageOptions" :key="language" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedLanguages"
                :value="language"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ language }}</span>
            </label>
          </div>
        </div>
        <!-- Nhà xuất bản -->
        <div v-if="publisherOptions.length" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Nhà xuất bản</h3>
          <div class="flex flex-col gap-2">
            <label v-for="publisher in publisherOptions" :key="publisher" class="flex items-center gap-2">
              <input
                type="checkbox"
                v-model="selectedPublishers"
                :value="publisher"
                class="h-3 w-3"
                @change="applyFilters"
              />
              <span class="text-sm">{{ publisher }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Nội dung chính (phải) -->
      <div class="w-full md:w-4/5">
        <div class="flex flex-col md:flex-row justify-between items-center mb-5">
          <!-- Dropdown sắp xếp -->
          <div class="flex items-center gap-2 mt-3 md:mt-0">
            <label for="sort" class="text-gray-600">Sắp xếp theo:</label>
            <select
              id="sort"
              v-model="sortOption"
              @change="applySort"
              class="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Mới nhất</option>
              <option value="price-asc">Giá: Thấp → Cao</option>
              <option value="price-desc">Giá: Cao → Thấp</option>
              <option value="rating-desc">Đánh giá cao</option>
            </select>
          </div>
        </div>
        <p class="text-gray-600 mb-5">
          Hiển thị {{ productsData?.length }} kết quả trên tổng số {{ resultCount }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
          <ProductCard
            v-for="product in productsData"
            :key="product.id"
            :product="product"
            @addToCart="addToCart"
          />
        </div>
        <PaginationComponent
          class="mt-5"
          :metaData="metaData"
          @changePage="getProducts"
          v-if="metaData"
        />
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
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";
import ProductCard from "@/components/ProductCard.vue";
import { onMounted, ref, computed } from "vue";
import Loading from "vue-loading-overlay";
import { products } from "@/data/mockData.js";
import { toast } from "vue3-toastify";

const isLoading = ref(false);
const allProducts = ref([]);
const productsData = ref([]);
const metaData = ref({});
const resultCount = ref(0);
const fullPage = ref(true);

// Bộ lọc
const selectedCategories = ref([]);
const selectedAges = ref([]);
const selectedPriceRanges = ref([]);
const selectedAuthors = ref([]);
const selectedMaterials = ref([]);
const selectedCoverTypes = ref([]);
const selectedLanguages = ref([]);
const selectedPublishers = ref([]);
const sortOption = ref("default");

// Dữ liệu bộ lọc
const priceRanges = [
  { label: "0đ - 50,000đ", value: [0, 50000] },
  { label: "50,000đ - 100,000đ", value: [50000, 100000] },
  { label: "100,000đ - 200,000đ", value: [100000, 200000] },
  { label: "200,000đ trở lên", value: [200000, Infinity] },
];
const ageOptions = ["0-3", "4-6", "7-10", "11-15"];
const categoryOptions = computed(() => {
  const categories = new Set(products.map((p) => p.category.value));
  return [...categories];
});
const authorOptions = computed(() => {
  const authors = new Set(products.map((p) => p.author).filter(Boolean));
  return [...authors];
});
const materialOptions = computed(() => {
  const materials = new Set(products.map((p) => p.material).filter(Boolean));
  return [...materials];
});
const coverTypeOptions = computed(() => {
  const coverTypes = new Set(products.map((p) => p.coverType).filter(Boolean));
  return [...coverTypes];
});
const languageOptions = computed(() => {
  const languages = new Set(products.map((p) => p.language).filter(Boolean));
  return [...languages];
});
const publisherOptions = computed(() => {
  const publishers = new Set(products.map((p) => p.publisher).filter(Boolean));
  return [...publishers];
});

// Số sản phẩm mỗi trang
const itemsPerPage = 24;

// Lấy sản phẩm sau khi lọc và sắp xếp
function applyFilters() {
  let filtered = [...products];

  // Lọc theo nhóm sản phẩm
  if (selectedCategories.value.length) {
    filtered = filtered.filter((product) =>
      selectedCategories.value.includes(product.category.value)
    );
  }

  // Lọc theo độ tuổi
  if (selectedAges.value.length) {
    filtered = filtered.filter((product) =>
      selectedAges.value.includes(product.ageRange)
    );
  }

  // Lọc theo giá
  if (selectedPriceRanges.value.length) {
    filtered = filtered.filter((product) => {
      const price = product.priceAfterDiscount || product.price;
      return selectedPriceRanges.value.some(([min, max]) => price >= min && price < max);
    });
  }

  // Lọc theo tác giả
  if (selectedAuthors.value.length) {
    filtered = filtered.filter((product) =>
      selectedAuthors.value.includes(product.author)
    );
  }

  // Lọc theo chất liệu
  if (selectedMaterials.value.length) {
    filtered = filtered.filter((product) =>
      selectedMaterials.value.includes(product.material)
    );
  }

  // Lọc theo loại bìa
  if (selectedCoverTypes.value.length) {
    filtered = filtered.filter((product) =>
      selectedCoverTypes.value.includes(product.coverType)
    );
  }

  // Lọc theo ngôn ngữ
  if (selectedLanguages.value.length) {
    filtered = filtered.filter((product) =>
      selectedLanguages.value.includes(product.language)
    );
  }

  // Lọc theo nhà xuất bản
  if (selectedPublishers.value.length) {
    filtered = filtered.filter((product) =>
      selectedPublishers.value.includes(product.publisher)
    );
  }

  // Cập nhật allProducts (kết quả sau lọc)
  allProducts.value = filtered;
  resultCount.value = filtered.length;

  // Áp dụng sắp xếp
  applySort();

  // Reset về trang 1
  getProducts(1);
}

// Áp dụng sắp xếp
function applySort() {
  let sorted = [...allProducts.value];
  switch (sortOption.value) {
    case "price-asc":
      sorted.sort((a, b) => (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price));
      break;
    case "price-desc":
      sorted.sort((a, b) => (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price));
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
      break;
    default:
      sorted.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      break;
  }
  allProducts.value = sorted;
  getProducts(1);
}

// Lấy sản phẩm theo trang
function getProducts(pageNumber = 1) {
  isLoading.value = true;

  // Tính toán phân trang
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  productsData.value = allProducts.value.slice(startIndex, endIndex);

  // Cập nhật metaData cho phân trang
  metaData.value = {
    currentPage: pageNumber,
    numberOfPages: Math.ceil(allProducts.value.length / itemsPerPage), // Đổi từ totalPages thành numberOfPages
    totalItems: allProducts.value.length,
  };

  isLoading.value = false;
}

// Hàm giả lập thêm vào giỏ hàng
function addToCart(product) {
  toast.success(`${product.title} đã được thêm vào giỏ hàng!`);
}

function onCancel() {
  isLoading.value = false;
}

onMounted(() => {
  allProducts.value = products;
  resultCount.value = products.length;
  getProducts();
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

@media (max-width: 768px) {
  .md\:w-1\/5 {
    display: none; /* Ẩn sidebar trên mobile, cần thêm nút mở modal */
  }
  .md\:w-4\/5 {
    width: 100%;
  }
  .md\:grid-cols-4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>