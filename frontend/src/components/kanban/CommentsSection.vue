<template>
  <div class="border-t border-[#3f474f] pt-4">
    <h4 class="text-sm font-medium text-white mb-4 flex items-center gap-2">
      💬 Bình luận
      <span class="text-xs bg-[#3f474f] text-[#9fadbc] px-2 py-0.5 rounded-full">
        {{ comments.length }}
      </span>
    </h4>

    <!-- Comments list -->
    <div class="space-y-3 max-h-48 overflow-y-auto mb-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="bg-[#1e2429] rounded-lg p-3 group"
      >
        <div class="flex items-start gap-2">
          <img
            :src="comment.avatar"
            :alt="comment.author"
            class="w-6 h-6 rounded-full flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 justify-between">
              <p class="text-xs font-medium text-white">{{ comment.author }}</p>
              <span class="text-xs text-[#9fadbc]">{{ formatTime(comment.createdAt) }}</span>
            </div>
            <p class="text-xs text-[#9fadbc] mt-1 break-words">
              {{ comment.text }}
            </p>
          </div>
          <button
            class="opacity-0 group-hover:opacity-100 p-1 text-[#9fadbc] hover:text-red-400 hover:bg-[#333c43] rounded transition-all"
            @click="deleteComment(comment.id)"
            title="Xóa"
          >
            ✕
          </button>
        </div>
      </div>

      <div
        v-if="comments.length === 0"
        class="text-center py-4 text-[#9fadbc] text-xs"
      >
        Chưa có bình luận nào
      </div>
    </div>

    <!-- Add comment -->
    <div class="space-y-2">
      <textarea
        v-model="newComment"
        rows="2"
        placeholder="Thêm bình luận..."
        class="w-full bg-[#1e2429] border border-[#3f474f] rounded text-xs text-white p-2 focus:outline-none focus:border-blue-600 resize-none"
      />
      <div class="flex justify-end">
        <button
          class="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          :disabled="!newComment.trim()"
          @click="addComment"
        >
          Bình luận
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["add-comment", "delete-comment"]);

const newComment = ref("");

const formatTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return "vừa xong";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
  return d.toLocaleDateString("vi-VN");
};

const addComment = () => {
  if (!newComment.value.trim()) return;

  emit("add-comment", {
    id: Date.now(),
    text: newComment.value.trim(),
    author: "Current User",
    avatar: "https://ui-avatars.com/api/?name=Current+User",
    createdAt: new Date().toISOString(),
  });

  newComment.value = "";
};

const deleteComment = (commentId) => {
  const confirmed = confirm("Xóa bình luận này?");
  if (confirmed) {
    emit("delete-comment", commentId);
  }
};
</script>
