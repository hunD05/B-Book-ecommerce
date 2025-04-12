// mockData.js

// Danh sách danh mục
export const categories = [
  {
    _id: "cat1",
    name: "Chất liệu",
    image: "book.png", // Chỉ lưu tên file
    subcategories: [
      { title: "Loại giấy phổ biến", items: ["Giấy C100", "Giấy Ford", "Giấy couche"] },
      { title: "Loại giấy cao cấp", items: ["Giấy Bristol", "Giấy mỹ thuật"] },
    ],
  },
  {
    _id: "cat2",
    name: "Loại bìa",
    image: "book.png",
    subcategories: [
      { title: "Bìa thông dụng", items: ["Bìa mềm", "Bìa cứng"] },
      { title: "Bìa đặc biệt", items: ["Bìa gập", "Bìa da"] },
    ],
  },
  {
    _id: "cat3",
    name: "Ngôn ngữ",
    image: "book.png",
    subcategories: [
      { title: "Ngôn ngữ chính", items: ["Tiếng Việt", "Tiếng Anh"] },
      { title: "Ngôn ngữ khác", items: ["Tiếng Pháp", "Tiếng Nhật"] },
    ],
  },
  {
    _id: "cat4",
    name: "Người dịch",
    image: "book.png",
    subcategories: [
      { title: "Người dịch nổi bật", items: ["Nguyễn Văn A", "Trần Thị Bích"] },
      { title: "Người dịch mới", items: ["Lê Minh C", "Phạm Hồng D"] },
    ],
  },
  {
    _id: "cat5",
    name: "Nhà xuất bản",
    image: "book.png",
    subcategories: [
      { title: "NXB lớn", items: ["Nhà xuất bản Kim Đồng", "Nhà xuất bản Giáo dục"] },
      { title: "NXB khác", items: ["Nhà xuất bản Trẻ", "Nhà xuất bản Văn học"] },
    ],
  },
  {
    _id: "cat6",
    name: "Tác giả",
    image: "book.png",
    subcategories: [
      { title: "Tác giả nổi tiếng", items: ["Nguyễn Nhật Ánh", "Trần Đăng Khoa"] },
      { title: "Tác giả trẻ", items: ["Trần Văn Hùng", "Lê Thị Mai"] },
    ],
  },
  {
    _id: "cat7",
    name: "Thể loại",
    image: "book.png",
    subcategories: [
      { title: "Thể loại phổ biến", items: ["Kể chuyện", "Tập viết", "Tập đọc", "Tập vẽ", "Tập tô màu"] },
      { title: "Thể loại khác", items: ["Khoa học", "Lịch sử", "Thơ", "Kỹ năng sống", "Tiếng Anh"] },
    ],
  },
];

// Danh sách sản phẩm
export const products = [
  {
    id: "1",
    title: "Cây Khế Tím",
    price: 50000,
    priceAfterDiscount: 35000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Kể chuyện",
    },
    ratingsAverage: 4.5,
    ratingsQuantity: 120,
    description:
      "Câu chuyện cảm động về tình bạn và lòng tốt qua hình ảnh cây khế tím, phù hợp cho trẻ từ 6-10 tuổi.",
    images: ["book.png", "book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Nguyễn Nhật Ánh",
    ageRange: "7-10",
  },
  {
    id: "2",
    title: "Tập Viết Chữ Cái",
    price: 30000,
    priceAfterDiscount: 25000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập viết",
    },
    ratingsAverage: 4.2,
    ratingsQuantity: 80,
    description:
      "Sách tập viết chữ cái cơ bản, giúp trẻ làm quen với bảng chữ cái, phù hợp cho trẻ từ 4-6 tuổi.",
    images: ["book.png"],
    material: "Giấy Ford",
    coverType: "Bìa cứng",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Trần Văn Hùng",
    ageRange: "4-6",
  },
  {
    id: "3",
    title: "Tập Đọc Lớp 1",
    price: 35000,
    priceAfterDiscount: 30000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập đọc",
    },
    ratingsAverage: 4.3,
    ratingsQuantity: 90,
    description:
      "Sách tập đọc dành cho học sinh lớp 1, giúp trẻ phát triển kỹ năng đọc hiểu cơ bản.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Lê Thị Mai",
    ageRange: "7-10",
  },
  {
    id: "4",
    title: "Tập Vẽ Hình Khối",
    price: 28000,
    priceAfterDiscount: 24000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập vẽ",
    },
    ratingsAverage: 4.0,
    ratingsQuantity: 60,
    description:
      "Sách tập vẽ hình khối cơ bản, giúp trẻ phát triển khả năng sáng tạo và tư duy không gian.",
    images: ["book.png"],
    material: "Giấy couche",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Phạm Văn Tâm",
    ageRange: "7-10",
  },
  {
    id: "5",
    title: "Tô Màu Động Vật",
    price: 20000,
    priceAfterDiscount: 18000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập tô màu",
    },
    ratingsAverage: 4.1,
    ratingsQuantity: 50,
    description:
      "Sách tô màu với các hình ảnh động vật dễ thương, phù hợp cho trẻ từ 3-5 tuổi.",
    images: ["book.png"],
    material: "Giấy couche",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Nguyễn Thị Hoa",
    ageRange: "4-6",
  },
  {
    id: "6",
    title: "Kỹ Năng Giao Tiếp",
    price: 50000,
    priceAfterDiscount: 45000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Kỹ năng sống",
    },
    ratingsAverage: 4.6,
    ratingsQuantity: 110,
    description:
      "Sách hướng dẫn kỹ năng giao tiếp cho trẻ, giúp trẻ tự tin trong các tình huống xã hội.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa cứng",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Trẻ",
    author: "Trần Quốc Anh",
    ageRange: "7-10",
  },
  {
    id: "7",
    title: "Khoa Học Tự Nhiên",
    price: 55000,
    priceAfterDiscount: 50000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Khoa học",
    },
    ratingsAverage: 4.7,
    ratingsQuantity: 130,
    description:
      "Sách khám phá khoa học tự nhiên, từ cây cối đến hệ mặt trời, phù hợp cho trẻ từ 8-12 tuổi.",
    images: ["book.png"],
    material: "Giấy Ford",
    coverType: "Bìa cứng",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Lê Văn Khoa",
    ageRange: "7-10",
  },
  {
    id: "8",
    title: "Lịch Sử Việt Nam",
    price: 60000,
    priceAfterDiscount: 55000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Lịch sử",
    },
    ratingsAverage: 4.4,
    ratingsQuantity: 100,
    description:
      "Sách kể về lịch sử Việt Nam qua các thời kỳ, từ Hùng Vương đến Nguyễn Huệ, phù hợp cho trẻ từ 10-14 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Văn học",
    author: "Nguyễn Văn Hùng",
    ageRange: "11-15",
  },
  {
    id: "9",
    title: "The Little Prince",
    price: 70000,
    priceAfterDiscount: 65000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Kể chuyện",
    },
    ratingsAverage: 4.8,
    ratingsQuantity: 150,
    description:
      "Bản dịch tiếng Việt của Hoàng Tử Bé, câu chuyện nổi tiếng về tình bạn và ý nghĩa cuộc sống.",
    images: ["book.png"],
    material: "Giấy Bristol",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: "Nguyễn Văn A",
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Antoine de Saint-Exupéry",
    ageRange: "7-10",
  },
  {
    id: "10",
    title: "Thơ Trăng Rằm",
    price: 30000,
    priceAfterDiscount: 27000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Thơ",
    },
    ratingsAverage: 4.3,
    ratingsQuantity: 70,
    description:
      "Tập thơ thiếu nhi với những bài thơ về thiên nhiên và tuổi thơ, phù hợp cho trẻ từ 6-10 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Trần Đăng Khoa",
    ageRange: "7-10",
  },
  {
    id: "11",
    title: "Sự Tích Cây Vú Sữa",
    price: 45000,
    priceAfterDiscount: 40000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Kể chuyện",
    },
    ratingsAverage: 4.4,
    ratingsQuantity: 95,
    description:
      "Câu chuyện cổ tích về tình mẹ con sâu sắc, phù hợp cho trẻ từ 5-9 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Tác giả dân gian",
    ageRange: "7-10",
  },
  {
    id: "12",
    title: "Luyện Viết Chữ Đẹp",
    price: 32000,
    priceAfterDiscount: 28000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập viết",
    },
    ratingsAverage: 4.1,
    ratingsQuantity: 75,
    description:
      "Sách luyện viết chữ đẹp cho học sinh tiểu học, giúp cải thiện nét chữ, phù hợp cho trẻ từ 6-10 tuổi.",
    images: ["book.png"],
    material: "Giấy Ford",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Nguyễn Thị Hồng",
    ageRange: "7-10",
  },
  {
    id: "13",
    title: "Đọc Hiểu Lớp 2",
    price: 38000,
    priceAfterDiscount: 34000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập đọc",
    },
    ratingsAverage: 4.2,
    ratingsQuantity: 85,
    description:
      "Sách tập đọc lớp 2 với các bài đọc hiểu thú vị, giúp trẻ phát triển tư duy, phù hợp cho trẻ từ 7-8 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Phạm Thị Lan",
    ageRange: "7-10",
  },
  {
    id: "14",
    title: "Vẽ Phong Cảnh",
    price: 30000,
    priceAfterDiscount: 26000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập vẽ",
    },
    ratingsAverage: 4.0,
    ratingsQuantity: 55,
    description:
      "Sách hướng dẫn vẽ phong cảnh đơn giản, khuyến khích sáng tạo, phù hợp cho trẻ từ 6-12 tuổi.",
    images: ["book.png"],
    material: "Giấy couche",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Lê Minh Tuấn",
    ageRange: "7-10",
  },
  {
    id: "15",
    title: "Tô Màu Hoa",
    price: 22000,
    priceAfterDiscount: 19000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tập tô màu",
    },
    ratingsAverage: 4.0,
    ratingsQuantity: 45,
    description:
      "Sách tô màu với hình ảnh các loài hoa, giúp trẻ phát triển khả năng phối màu, phù hợp cho trẻ từ 3-6 tuổi.",
    images: ["book.png"],
    material: "Giấy couche",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Trần Thị Minh",
    ageRange: "4-6",
  },
  {
    id: "16",
    title: "Quản Lý Thời Gian",
    price: 52000,
    priceAfterDiscount: 47000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Kỹ năng sống",
    },
    ratingsAverage: 4.5,
    ratingsQuantity: 100,
    description:
      "Sách hướng dẫn trẻ cách quản lý thời gian hiệu quả, phù hợp cho trẻ từ 8-12 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa cứng",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Trẻ",
    author: "Nguyễn Quốc Bảo",
    ageRange: "7-10",
  },
  {
    id: "17",
    title: "Thí Nghiệm Ánh Sáng",
    price: 58000,
    priceAfterDiscount: 52000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Khoa học",
    },
    ratingsAverage: 4.6,
    ratingsQuantity: 115,
    description:
      "Sách hướng dẫn các thí nghiệm về ánh sáng, khuyến khích tư duy khoa học, phù hợp cho trẻ từ 9-13 tuổi.",
    images: ["book.png"],
    material: "Giấy Ford",
    coverType: "Bìa cứng",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Giáo dục",
    author: "Phạm Văn Khoa",
    ageRange: "7-10",
  },
  {
    id: "18",
    title: "Trần Hưng Đạo",
    price: 62000,
    priceAfterDiscount: 57000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Lịch sử",
    },
    ratingsAverage: 4.5,
    ratingsQuantity: 105,
    description:
      "Sách kể về cuộc đời và chiến công của Trần Hưng Đạo, phù hợp cho trẻ từ 10-15 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Văn học",
    author: "Lê Văn Hùng",
    ageRange: "11-15",
  },
  {
    id: "19",
    title: "Học Từ Vựng Tiếng Anh",
    price: 75000,
    priceAfterDiscount: 68000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Tiếng Anh",
    },
    ratingsAverage: 4.7,
    ratingsQuantity: 140,
    description:
      "Sách học từ vựng tiếng Anh cho trẻ, với hình ảnh minh họa sinh động, phù hợp cho trẻ từ 6-10 tuổi.",
    images: ["book.png"],
    material: "Giấy Bristol",
    coverType: "Bìa cứng",
    language: "Tiếng Anh",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Nguyễn Thị Lan",
    ageRange: "7-10",
  },
  {
    id: "20",
    title: "Mèo Con Đi Học",
    price: 35000,
    priceAfterDiscount: 31000,
    image: "book.png",
    imageCover: "book.png",
    category: {
      _id: "cat7",
      name: "Thể loại",
      value: "Thơ",
    },
    ratingsAverage: 4.2,
    ratingsQuantity: 65,
    description:
      "Tập thơ vui nhộn về chú mèo con đi học, phù hợp cho trẻ từ 5-9 tuổi.",
    images: ["book.png"],
    material: "Giấy C100",
    coverType: "Bìa mềm",
    language: "Tiếng Việt",
    translator: null,
    publisher: "Nhà xuất bản Kim Đồng",
    author: "Nguyễn Đình Thi",
    ageRange: "7-10",
  },
];

// Cập nhật subcategories để bao gồm các giá trị mới
categories.find((cat) => cat._id === "cat7").subcategories = [
  {
    title: "Thể loại phổ biến",
    items: ["Kể chuyện", "Tập viết", "Tập đọc", "Tập vẽ", "Tập tô màu"],
  },
  {
    title: "Thể loại khác",
    items: ["Khoa học", "Lịch sử", "Thơ", "Kỹ năng sống", "Tiếng Anh"],
  },
];

// Dữ liệu cho orders
export const orders = [
    {
      id: "ORD001",
      createdAt: "2023-10-01T10:00:00Z",
      totalOrderPrice: 150000,
      isPaid: true,
      products: [
        { id: "1", title: "Bé Tập Tô Chữ Số", price: 35000, quantity: 2 },
        { id: "2", title: "Bé Tập Tô Chữ Cái", price: 45000, quantity: 1 },
      ],
    },
    {
      id: "ORD002",
      createdAt: "2023-10-02T12:00:00Z",
      totalOrderPrice: 200000,
      isPaid: false,
      products: [
        { id: "3", title: "Bé Học Toán", price: 50000, quantity: 4 },
      ],
    },
    {
      id: "ORD003",
      createdAt: "2023-10-03T15:00:00Z",
      totalOrderPrice: 300000,
      isPaid: true,
      products: [
        { id: "1", title: "Bé Tập Tô Chữ Số", price: 35000, quantity: 3 },
        { id: "2", title: "Bé Tập Tô Chữ Cái", price: 45000, quantity: 2 },
        { id: "4", title: "Bé Tập Vẽ", price: 40000, quantity: 1 },
      ],
    },
  ];


