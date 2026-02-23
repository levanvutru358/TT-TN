# Vue 3 Stage Management System

Ứng dụng quản lý Stase (giai đoạn dự án) được xây dựng với Vue 3, Axios, Pinia, Tailwind CSS và Vue Router.

## 🚀 Tính Năng

- ✅ **Quản lý Stase**: Tạo, đọc, cập nhật, xóa (CRUD) các giai đoạn dự án
- ✅ **Axios Integration**: Gọi API với Axios có interceptor xử lý token
- ✅ **Pinia Store**: State management hiệu quả với stores cho Stage và UI
- ✅ **Tailwind CSS**: UI đẹp và responsive
- ✅ **Vue Router**: Routing các trang khác nhau
- ✅ **Notification System**: Thông báo thành công/lỗi tự động ẩn

## 📁 Cấu Trúc Dự Án

```
src/
|-- api/
|   |-- axios.js          # Axios instance (baseURL, interceptors)
|   `-- stageApi.js       # Stage endpoints
|-- components/
|   `-- Notification.vue
|-- stores/
|   |-- stageStore.js
|   `-- uiStore.js
|-- views/
|   |-- Home.vue
|   |-- NotFound.vue
|   `-- stages/
|       |-- StageList.vue
|       |-- StageDetail.vue
|       `-- StageForm.vue
|-- router/
|   `-- index.js
|-- App.vue
|-- main.js
`-- style.css
```

## 🛠️ Cài Đặt

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy server dev
npm run dev

# 3. Build production
npm run build

# 4. Preview build
npm run preview
```

## ⚙️ Cấu Hình API

Tạo file `.env.local` tại root của dự án:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📊 Axios Configuration

File `src/api/axios.js` cung cấp:

- Base URL configuration
- Automatic token injection từ localStorage
- Request/Response interceptors
- Automatic redirect khi hết phiên (401)

## 🎯 Pinia Stores

### Stage Store (`src/stores/stageStore.js`)

- Quản lý danh sách Stage
- Fetch dữ liệu từ API
- CRUD operations
- Pagination support

### UI Store (`src/stores/uiStore.js`)

- Quản lý notification toàn app
- Auto-dismiss sau 3 giây

## 🗂️ Routes

- `/` - Home page
- `/stages` - Danh sách Stage
- `/stages/create` - Tạo Stage mới
- `/stages/:id` - Chi tiết Stage
- `/stages/:id/edit` - Sửa Stage

## 🎨 Tailwind CSS

Tailwind CSS đã được cấu hình với:

- Custom colors
- Responsive breakpoints
- PostCSS auto-prefix

## 🔧 Thêm API Endpoints

Mở `src/api/myApi.js` và thêm endpoints mới:

```javascript
export const myAPI = {
  getAll: () => axiosInstance.get("/my-endpoint"),
  getById: (id) => axiosInstance.get(`/my-endpoint/${id}`),
  // ...
};
```

## 📝 Tạo Store Mới

```javascript
// src/stores/myStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyStore = defineStore("my", () => {
  const data = ref([]);

  const fetchData = async () => {
    // Gọi API
  };

  return { data, fetchData };
});
```

## 🚀 Deployment

```bash
# Build ứng dụng
npm run build

# Tải file từ `dist/` lên server
```

## 📚 Tài Liệu

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT
