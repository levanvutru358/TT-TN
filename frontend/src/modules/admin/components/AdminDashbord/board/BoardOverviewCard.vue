<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <SummaryMiniCard label="Tên board" :value="board?.name || '-'" />
    <SummaryMiniCard label="Workspace" :value="board?.workspaceName || '-'" />
    <SummaryMiniCard label="Owner" :value="board?.ownerName || '-'" />
    <SummaryMiniCard label="Visibility" :value="board?.visibility || '-'" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import SummaryMiniCard from '@/modules/admin/components/AdminDashbord/common/SummaryMiniCard.vue'

defineProps({
  board: { type: Object, default: null },
})
</script>