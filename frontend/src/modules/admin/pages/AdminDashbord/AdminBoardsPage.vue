<template>
  <section class="space-y-8">
    <PageHeader
      breadcrumb="Admin / Boards"
      title="Board Management"
      description="Tìm kiếm theo board hoặc workspace, lọc private/public, sắp xếp mới nhất hoặc cũ nhất."
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <SummaryMiniCard label="Tổng board" :value="adminStore.boards.length" />
      <SummaryMiniCard label="Public" :value="publicCount" />
      <SummaryMiniCard label="Private" :value="privateCount" />
    </div>

    <BoardFilterBar
      v-model:search="search"
      v-model:visibility="visibility"
      v-model:sort="sort"
    />

    <LoadingBlock v-if="adminStore.isLoadingBoards" />

    <BoardTable
      v-else
      :boards="filteredBoards"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAdminStore } from '@/modules/admin/stores/admin.store'
import type { BoardItem } from '@/modules/admin/types/admin'
import PageHeader from '@/modules/admin/components/AdminDashbord/common/PageHeader.vue'
import SummaryMiniCard from '@/modules/admin/components/AdminDashbord/common/SummaryMiniCard.vue'
import LoadingBlock from '@/modules/admin/components/AdminDashbord/common/LoadingBlock.vue'
import BoardFilterBar from '@/modules/admin/components/AdminDashbord/board/BoardFilterBar.vue'
import BoardTable from '@/modules/admin/components/AdminDashbord/board/BoardTable.vue'

const adminStore = useAdminStore()
const search = ref('')
const visibility = ref('')
const sort = ref<'newest' | 'oldest'>('newest')

onMounted(() => {
  adminStore.fetchBoards()
})

const filteredBoards = computed<BoardItem[]>(() => {
  const list = adminStore.boards.filter((board) => {
    const keyword = search.value.toLowerCase()

    const matchesSearch =
      !search.value ||
      board.name.toLowerCase().includes(keyword) ||
      board.workspaceName.toLowerCase().includes(keyword)

    const matchesVisibility =
      !visibility.value || board.visibility === visibility.value

    return matchesSearch && matchesVisibility
  })

  return [...list].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime()
    const bTime = new Date(b.createdAt).getTime()
    return sort.value === 'newest' ? bTime - aTime : aTime - bTime
  })
})

const publicCount = computed(
  () => adminStore.boards.filter((item) => item.visibility === 'public').length
)

const privateCount = computed(
  () => adminStore.boards.filter((item) => item.visibility === 'private').length
)
</script>