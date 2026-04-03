<template>
  <TaskModalPopover title="Hành động" @close="$emit('close')">
    <div class="space-y-2">
      <button class="menu-lite-btn" @click="$emit('go-to', 'labels')">
        Chỉnh sửa nhãn
      </button>

      <button class="menu-lite-btn" @click="$emit('go-to', 'members')">
        Thành viên
      </button>

      <button class="menu-lite-btn" @click="$emit('go-to', 'date')">
        Ngày
      </button>

      <button class="menu-lite-btn" @click="$emit('go-to', 'checklist')">
        Việc cần làm
      </button>

      <button class="menu-lite-btn" @click="$emit('go-to', 'cover')">
        Thay đổi bìa
      </button>

      <button class="menu-lite-btn" @click="$emit('duplicate')">
        Sao chép thẻ
      </button>

      <button class="menu-lite-btn" @click="$emit('archive')">
        Lưu trữ
      </button>
    </div>
  </TaskModalPopover>
</template>

<script setup lang="ts">
// @ts-nocheck
import TaskModalPopover from "./TaskModalPopover.vue";

defineEmits([
  "go-to",
  "duplicate",
  "archive",
  "close",
]);
</script>

<style scoped>
.menu-lite-btn {
  width: 100%;
  text-align: left;
  border-radius: 10px;
  padding: 10px 12px;
  color: white;
  background: rgba(255, 255, 255, 0.04);
}

.menu-lite-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}
</style>