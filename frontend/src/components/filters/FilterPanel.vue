<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex">
    <!-- Backdrop -->
    <div class="flex-1 bg-black/60" @click="closePanel"></div>

    <!-- Panel (Trello-like) -->
    <aside
      class="w-[360px] max-w-[92vw] h-full bg-[#2C2F33] text-[#DDE3EA] flex flex-col shadow-2xl"
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="relative h-14 flex items-center border-b border-white/10 px-4">
        <h2 class="w-full text-center text-sm font-semibold tracking-wide">Lọc</h2>
        <button
          @click="closePanel"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-[#9FADBC] hover:text-[#DDE3EA] text-xl leading-none"
          aria-label="Đóng"
        >
          ×
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Search -->
        <section class="px-4 pt-4 pb-3 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Từ khóa</div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Nhập từ khóa..."
            class="w-full h-9 rounded-md bg-[#22272B] border border-white/10 px-3 text-sm text-[#DDE3EA] placeholder:text-[#9FADBC]
                   focus:outline-none focus:border-[#4C9AFF] focus:ring-2 focus:ring-[#4C9AFF]/30"
          />
          <p class="text-[12px] leading-4 text-[#9FADBC] mt-2">
            Tìm kiếm các thẻ, các thành viên, các nhãn và hơn thế nữa.
          </p>
        </section>

        <!-- Members -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Thành viên</div>

          <div class="space-y-1">
            <!-- "No members" row like Trello -->
            <label class="row">
              <input type="checkbox" class="cb" disabled />
              <span class="ico text-[#9FADBC]">
                <!-- User icon -->
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <span class="text-sm text-[#9FADBC] font-semibold">Không có thành viên</span>
            </label>

            <!-- Assigned to me -->
            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('members', '__me__')"
                @change="toggleFilter('members', '__me__')"
              />
              <span class="avatar bg-[#0C66E4]">TV</span>
              <span class="text-sm">Các thẻ đã chỉ định cho tôi</span>
            </label>

            <!-- Real members (if you pass) -->
            <label v-for="member in members" :key="member.id" class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('members', member.id)"
                @change="toggleFilter('members', member.id)"
              />
              <span class="avatar bg-white/10">
                {{ (member.name || "?").charAt(0).toUpperCase() }}
              </span>
              <span class="text-sm">{{ member.name }}</span>
            </label>
          </div>
        </section>

        <!-- Card status -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Card status</div>

          <div class="space-y-1">
            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('cardStatus', 'completed')"
                @change="toggleFilter('cardStatus', 'completed')"
              />
              <span class="text-sm">Đã đánh dấu hoàn thành</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('cardStatus', 'incomplete')"
                @change="toggleFilter('cardStatus', 'incomplete')"
              />
              <span class="text-sm">Không được đánh dấu là đã hoàn thành</span>
            </label>
          </div>
        </section>

        <!-- Due date -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Ngày hết hạn</div>

          <div class="space-y-1">
            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('dueDate', 'no-due')"
                @change="toggleFilter('dueDate', 'no-due')"
              />
              <span class="ico text-[#9FADBC]">
                <!-- Calendar icon -->
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 2v3M17 2v3M3.5 9h17M6 22h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
              <span class="text-sm">Không có ngày hết hạn</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('dueDate', 'overdue')"
                @change="toggleFilter('dueDate', 'overdue')"
              />
              <span class="dot bg-[#F87168]">
                <!-- Clock icon -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-[#2C2F33]">
                  <path
                    d="M12 7v6l4 2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
              <span class="text-sm">Quá hạn</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('dueDate', 'tomorrow')"
                @change="toggleFilter('dueDate', 'tomorrow')"
              />
              <span class="dot bg-[#F5CD47]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-[#2C2F33]">
                  <path
                    d="M12 7v6l4 2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
              <span class="text-sm">Sẽ hết hạn vào ngày mai</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('dueDate', 'next-week')"
                @change="toggleFilter('dueDate', 'next-week')"
              />
              <span class="dot bg-[#5E6C84]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-[#2C2F33]">
                  <path
                    d="M12 7v6l4 2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
              <span class="text-sm">Sẽ hết hạn vào tuần sau</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('dueDate', 'next-month')"
                @change="toggleFilter('dueDate', 'next-month')"
              />
              <span class="dot bg-[#5E6C84]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-[#2C2F33]">
                  <path
                    d="M12 7v6l4 2"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
              <span class="text-sm">Sẽ hết hạn vào tháng sau</span>
            </label>
          </div>
        </section>

        <!-- Labels -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Nhãn</div>

          <div class="space-y-2">
            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('labels', 'green')"
                @change="toggleFilter('labels', 'green')"
              />
              <span class="labelbar bg-[#216E4E]"></span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('labels', 'yellow')"
                @change="toggleFilter('labels', 'yellow')"
              />
              <span class="labelbar bg-[#7F5F01]"></span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('labels', 'orange')"
                @change="toggleFilter('labels', 'orange')"
              />
              <span class="labelbar bg-[#A54800]"></span>
            </label>

            <button type="button" class="row w-full justify-between">
              <span class="flex items-center gap-3">
                <span class="cb cb--ghost" aria-hidden="true"></span>
                <span class="text-sm text-[#9FADBC]">Chọn nhãn</span>
              </span>
              <span class="text-[#9FADBC]">
                <!-- ChevronDown icon -->
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </section>

        <!-- Activity -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="text-xs font-semibold text-[#9FADBC] mb-2">Activity</div>

          <div class="space-y-1">
            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('activity', 'week')"
                @change="toggleFilter('activity', 'week')"
              />
              <span class="text-sm">Hoạt động trong tuần qua</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('activity', '2weeks')"
                @change="toggleFilter('activity', '2weeks')"
              />
              <span class="text-sm">Hoạt động trong 2 tuần qua</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('activity', '3weeks')"
                @change="toggleFilter('activity', '3weeks')"
              />
              <span class="text-sm">Hoạt động trong 3 tuần qua</span>
            </label>

            <label class="row">
              <input
                type="checkbox"
                class="cb"
                :checked="isFilterChecked('activity', 'no-activity')"
                @change="toggleFilter('activity', 'no-activity')"
              />
              <span class="text-sm">Không có hoạt động trong bốn tuần qua</span>
            </label>
          </div>
        </section>

        <!-- Collapse lists switch -->
        <section class="px-4 py-4 border-b border-white/10">
          <div class="flex items-center gap-3">
            <input type="checkbox" class="cb" />
            <div class="flex-1">
              <div class="text-sm">Thu gọn các danh sách không có thẻ trùng khớp</div>
            </div>

            <button
              type="button"
              class="relative w-10 h-5 rounded-full bg-[#3A3F45] border border-white/10"
              aria-label="Toggle"
            >
              <span class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#DDE3EA] shadow"></span>
              <span class="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[#2C2F33] font-bold">×</span>
            </button>
          </div>
        </section>

        <!-- Match any -->
        <section class="px-4 py-4">
          <button
            type="button"
            class="w-full flex items-center justify-between text-sm text-[#DDE3EA] hover:bg-white/5 rounded-md px-2 py-2"
          >
            <span>Khớp bất kỳ</span>
            <span class="text-[#9FADBC]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </section>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-white/10 bg-[#2C2F33]">
        <div class="flex justify-end">
          <button
            @click="resetFilters"
            class="h-9 px-4 rounded-md text-sm font-medium bg-white/10 hover:bg-white/15 text-[#DDE3EA]"
          >
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  isOpen: { type: Boolean, default: false },
  members: { type: Array, default: () => [] },
});

const emit = defineEmits(["close", "update-filters"]);

const searchQuery = ref("");
const filters = ref({
  members: [],
  labels: [],
  cardStatus: [],
  dueDate: [],
  activity: [],
});

function toggleFilter(filterType, value) {
  const arr = filters.value[filterType];
  const idx = arr.indexOf(value);
  if (idx > -1) arr.splice(idx, 1);
  else arr.push(value);

  emit("update-filters", { ...filters.value, searchQuery: searchQuery.value });
}

function isFilterChecked(filterType, value) {
  return filters.value[filterType]?.includes(value) || false;
}

function resetFilters() {
  filters.value = { members: [], labels: [], cardStatus: [], dueDate: [], activity: [] };
  searchQuery.value = "";
  emit("update-filters", { ...filters.value, searchQuery: "" });
}

function closePanel() {
  emit("close");
}
</script>

<style scoped src="./FilterPanel.css"></style>