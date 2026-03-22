<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
  >
    <div class="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
      <h3 class="text-xl font-bold text-slate-950">
        {{ title }}
      </h3>

      <p class="mt-3 text-sm leading-6 text-slate-600">
        {{ message }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          @click="$emit('cancel')"
        >
          Hủy
        </button>

        <button
          type="button"
          class="rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          @click="$emit('confirm')"
        >
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Xác nhận",
  },
  message: {
    type: String,
    default: "Bạn có chắc chắn muốn thực hiện hành động này không?",
  },
});

defineEmits(["cancel", "confirm"]);
</script>