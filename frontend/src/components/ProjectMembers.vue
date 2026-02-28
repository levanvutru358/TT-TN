<template>
  <div class="bg-[#1d2125] rounded-xl border border-[#3f474f] p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-white font-semibold text-sm flex items-center gap-2">
        <span>👥 Thành viên dự án</span>
        <span class="text-xs bg-[#3f474f] text-[#9fadbc] px-2 py-1 rounded-full">
          {{ members.length }}
        </span>
      </h3>
      <button
        class="px-3 py-1.5 text-xs bg-[#0c66e4] text-white rounded hover:bg-[#0955c7] transition-colors"
        @click="openAddMember"
      >
        + Thêm
      </button>
    </div>

    <!-- Members list -->
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <div
        v-for="member in members"
        :key="member.id"
        class="flex items-center justify-between p-2 rounded-lg hover:bg-[#282e33] transition-colors group"
      >
        <div class="flex items-center gap-3 flex-1">
          <img
            :src="member.avatar"
            :alt="member.name"
            class="w-8 h-8 rounded-full"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white font-medium truncate">
              {{ member.name }}
            </p>
            <p class="text-xs text-[#9fadbc] truncate">
              {{ member.email }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="text-xs px-2 py-0.5 rounded"
            :class="getRoleColor(member.role)"
          >
            {{ member.role }}
          </span>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              class="p-1 text-[#9fadbc] hover:text-white hover:bg-[#3f474f] rounded transition-colors"
              @click="openEditMember(member)"
              title="Chỉnh sửa"
            >
              ✎
            </button>
            <button
              class="p-1 text-[#9fadbc] hover:text-red-400 hover:bg-[#3f474f] rounded transition-colors"
              @click="removeMember(member.id)"
              title="Xóa thành viên"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="members.length === 0"
        class="text-center py-4 text-[#9fadbc] text-sm"
      >
        Chưa có thành viên nào
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <MemberManageModal
      v-if="showModal"
      :member="editingMember"
      :members="members"
      @close="closeModal"
      @save="saveMember"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import MemberManageModal from "./MemberManageModal.vue";

const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update-members"]);

const showModal = ref(false);
const editingMember = ref(null);

const getRoleColor = (role) => {
  const colors = {
    Admin: "bg-red-500/20 text-red-300",
    Developer: "bg-blue-500/20 text-blue-300",
    Designer: "bg-purple-500/20 text-purple-300",
    Viewer: "bg-gray-500/20 text-gray-300",
  };
  return colors[role] || "bg-gray-500/20 text-gray-300";
};

const openAddMember = () => {
  editingMember.value = null;
  showModal.value = true;
};

const openEditMember = (member) => {
  editingMember.value = { ...member };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingMember.value = null;
};

const removeMember = (memberId) => {
  const confirmed = confirm("Bạn có chắc muốn xóa thành viên này?");
  if (!confirmed) return;

  const updated = props.members.filter((m) => m.id !== memberId);
  emit("update-members", updated);
};

const saveMember = (memberData) => {
  let updated = [...props.members];

  if (editingMember.value?.id) {
    // Update existing
    updated = updated.map((m) =>
      m.id === editingMember.value.id ? { ...m, ...memberData } : m
    );
  } else {
    // Add new
    updated.push({
      id: Math.max(0, ...updated.map((m) => m.id)) + 1,
      ...memberData,
    });
  }

  emit("update-members", updated);
  closeModal();
};
</script>
