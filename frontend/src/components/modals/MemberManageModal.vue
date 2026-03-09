<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
  >
    <div class="bg-[#282e33] rounded-xl w-96 p-4 border border-[#3f474f]">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-white font-medium">
          {{ member ? "Chỉnh sửa thành viên" : "Thêm thành viên" }}
        </h3>
        <button
          class="text-[#9fadbc] hover:text-white text-xl"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>

      <div class="space-y-4">
        <!-- Name -->
        <div>
          <label class="block text-xs text-[#9fadbc] mb-1">
            Tên <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Nhập tên thành viên..."
            class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs text-[#9fadbc] mb-1">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="example@email.com"
            class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <!-- Role -->
        <div>
          <label class="block text-xs text-[#9fadbc] mb-1">
            Vai trò <span class="text-red-500">*</span>
          </label>
          <div class="space-y-2">
            <label
              v-for="role in roles"
              :key="role"
              class="flex items-center p-2 rounded cursor-pointer hover:bg-[#333c43] transition-colors"
            >
              <input
                v-model="form.role"
                type="radio"
                :value="role"
                class="w-4 h-4"
              />
              <span class="ml-2 text-sm text-white">{{ role }}</span>
              <span class="ml-auto text-xs text-[#9fadbc]">
                {{ getRoleDescription(role) }}
              </span>
            </label>
          </div>
        </div>

        <!-- Avatar (optional) -->
        <div>
          <label class="block text-xs text-[#9fadbc] mb-1">
            Avatar URL
          </label>
          <input
            v-model="form.avatar"
            type="text"
            placeholder="https://..."
            class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-sm text-white p-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <!-- Preview -->
        <div v-if="form.avatar" class="flex items-center gap-2 p-2 rounded bg-[#1e2429]">
          <img
            :src="form.avatar"
            :alt="form.name"
            class="w-8 h-8 rounded-full"
            @error="avatarError = true"
          />
          <span class="text-xs text-[#9fadbc]">Avatar preview</span>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-6">
        <button
          class="px-3 py-1.5 text-sm text-[#9fadbc] hover:text-white rounded hover:bg-[#333c43]"
          @click="$emit('close')"
        >
          Hủy
        </button>
        <button
          class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          :disabled="!isFormValid"
          @click="handleSave"
        >
          {{ member ? "Cập nhật" : "Thêm" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

const props = defineProps({
  member: {
    type: Object,
    default: null,
  },
  members: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close", "save"]);

const roles = ["Admin", "Developer", "Designer", "Viewer"];

const form = ref({
  name: "",
  email: "",
  role: "Developer",
  avatar: "",
});

const avatarError = ref(false);

watchEffect(() => {
  if (props.member) {
    form.value = { ...props.member };
  } else {
    form.value = {
      name: "",
      email: "",
      role: "Developer",
      avatar: "",
    };
  }
});

const isFormValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.email.trim() &&
    form.value.role &&
    form.value.email.includes("@")
  );
});

const getRoleDescription = (role) => {
  const descriptions = {
    Admin: "Quản lý dự án, thành viên",
    Developer: "Tạo và chỉnh sửa task",
    Designer: "Xem và comment",
    Viewer: "Chỉ xem",
  };
  return descriptions[role] || "";
};

const handleSave = () => {
  if (!isFormValid.value) return;

  emit("save", {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    role: form.value.role,
    avatar: form.value.avatar.trim() || `https://ui-avatars.com/api/?name=${form.value.name}`,
  });
};
</script>
