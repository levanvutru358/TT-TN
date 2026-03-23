<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
    <SummaryMiniCard label="Tên workspace" :value="workspace?.name || '-'" />
    <SummaryMiniCard label="Owner" :value="workspace?.ownerName || '-'" />
    <SummaryMiniCard label="Số thành viên" :value="workspace?.totalMembers || 0" />
    <SummaryMiniCard label="Số board" :value="workspace?.totalBoards || 0" />
  </div>
</template>

<script setup>
import SummaryMiniCard from '@/admin/components/AdminDashbord/common/SummaryMiniCard.vue'

defineProps({
  workspace: { type: Object, default: null },
})
</script>