<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 flex"
  >
    <!-- Backdrop -->
    <div 
      class="flex-1 bg-black/50 cursor-pointer" 
      @click="closePanel"
    ></div>

    <!-- Filter Panel -->
    <div class="w-96 bg-gradient-to-br from-[#6b4f8f] via-[#8b5fa8] to-[#a8527c] text-white flex flex-col shadow-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-white/20">
        <h2 class="font-semibold text-base">Lọc</h2>
        <button 
          @click="closePanel"
          class="text-white/70 hover:text-white text-2xl leading-none"
        >
          ✕
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto bg-[#4a3868]/40">
        <!-- Search -->
        <div class="p-4 border-b border-white/20">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Nhập từ khóa..."
            class="w-full bg-white/15 border border-white/20 rounded px-3 py-2.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
          />
          <p class="text-xs text-white/70 mt-2">Tìm kiếm các thẻ, các thành viên, các nhân và hơn thế nữa.</p>
        </div>

        <!-- Members Section -->
        <div class="p-4 border-b border-white/20">
          <h3 class="text-xs font-semibold text-white/95 mb-3 uppercase tracking-wide">Thành viên</h3>
          <div class="space-y-1.5">
            <label v-if="!members.length" class="text-xs text-white/60 py-2 block">Không có thành viên</label>
            <label v-for="member in members" :key="member.id" class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('members', member.id)"
                @change="toggleFilter('members', member.id)"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <div class="flex items-center gap-2 flex-1">
                <div class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">
                  {{ member.name.charAt(0).toUpperCase() }}
                </div>
                <span class="text-sm text-white/90">{{ member.name }}</span>
              </div>
            </label>
          </div>
        </div>

        <!-- Labels Section -->
        <div class="p-4 border-b border-white/20">
          <h3 class="text-xs font-semibold text-white/95 mb-3 uppercase tracking-wide">Nhãn</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('labels', 'green')"
                @change="toggleFilter('labels', 'green')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <div class="h-8 flex-1 rounded bg-[#3dd282]"></div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('labels', 'yellow')"
                @change="toggleFilter('labels', 'yellow')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <div class="h-8 flex-1 rounded bg-[#d4a91e]"></div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('labels', 'orange')"
                @change="toggleFilter('labels', 'orange')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <div class="h-8 flex-1 rounded bg-[#d45a3f]"></div>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('labels', 'custom')"
                @change="toggleFilter('labels', 'custom')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-white/90 text-sm flex-1">Chọn nhãn</span>
              <span class="text-white/50">⌄</span>
            </label>
          </div>
        </div>

        <!-- Card Status Section -->
        <div class="p-4 border-b border-white/20">
          <h3 class="text-xs font-semibold text-white/95 mb-3 uppercase tracking-wide">Card status</h3>
          <div class="space-y-1.5">
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('cardStatus', 'completed')"
                @change="toggleFilter('cardStatus', 'completed')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Đã đánh dấu hoàn thành</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('cardStatus', 'incomplete')"
                @change="toggleFilter('cardStatus', 'incomplete')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Không được đánh dấu là đã hoàn thành</span>
            </label>
          </div>
        </div>

        <!-- Due Date Section -->
        <div class="p-4 border-b border-white/20">
          <h3 class="text-xs font-semibold text-white/95 mb-3 uppercase tracking-wide">Ngày hết hạn</h3>
          <div class="space-y-1.5">
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('dueDate', 'no-due')"
                @change="toggleFilter('dueDate', 'no-due')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Không có ngày hết hạn</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('dueDate', 'overdue')"
                @change="toggleFilter('dueDate', 'overdue')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm">🔴 Quá hạn</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('dueDate', 'today')"
                @change="toggleFilter('dueDate', 'today')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm">🟡 Sẽ hết hạn vào ngày mai</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('dueDate', 'upcoming')"
                @change="toggleFilter('dueDate', 'upcoming')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">🕐 Sẽ hết hạn vào tuần sau</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('dueDate', 'future')"
                @change="toggleFilter('dueDate', 'future')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">🕐 Sẽ hết hạn vào tháng sau</span>
            </label>
          </div>
        </div>

        <!-- Activity Section -->
        <div class="p-4 border-b border-white/20">
          <h3 class="text-xs font-semibold text-white/95 mb-3 uppercase tracking-wide">Hoạt động</h3>
          <div class="space-y-1.5">
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('activity', 'week')"
                @change="toggleFilter('activity', 'week')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Hoạt động trong tuần qua</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('activity', '2weeks')"
                @change="toggleFilter('activity', '2weeks')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Hoạt động trong 2 tuần qua</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('activity', '3weeks')"
                @change="toggleFilter('activity', '3weeks')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Hoạt động trong 3 tuần qua</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-2 py-2 rounded transition-colors">
              <input 
                type="checkbox" 
                :checked="isFilterChecked('activity', 'no-activity')"
                @change="toggleFilter('activity', 'no-activity')"
                class="w-4 h-4 cursor-pointer accent-blue-300"
              />
              <span class="text-sm text-white/90">Không có hoạt động trong bốn tuần qua</span>
            </label>
          </div>
        </div>

        <!-- Display exceptions -->
        <div class="p-4 border-b border-white/20">
          <div class="flex items-start gap-2">
            <input 
              type="checkbox"
              class="w-4 h-4 cursor-pointer accent-blue-300 mt-1"
            />
            <div class="flex-1">
              <p class="text-sm text-white/90">Thu gọn các danh sách không có thẻ trùng khớp</p>
            </div>
            <button class="text-white/60 hover:text-white">✕</button>
          </div>
        </div>

        <!-- Keyboard shortcuts -->
        <div class="p-4">
          <button class="flex items-center gap-2 w-full text-left hover:bg-white/10 px-2 py-2 rounded transition-colors">
            <span class="text-white/90 text-sm">Khắp bất kỳ</span>
            <span class="text-white/50 text-sm">⌄</span>
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-white/20 bg-black/30 flex gap-2 justify-end">
        <button 
          @click="resetFilters"
          class="px-4 py-2 text-sm rounded bg-white/20 hover:bg-white/30 transition-colors text-white font-medium"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  members: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'update-filters']);

const searchQuery = ref('');
const filters = ref({
  members: [],
  labels: [],
  cardStatus: [],
  dueDate: [],
  activity: []
});

function toggleFilter(filterType, value) {
  const filterArray = filters.value[filterType];
  const index = filterArray.indexOf(value);
  
  if (index > -1) {
    filterArray.splice(index, 1);
  } else {
    filterArray.push(value);
  }
  
  emit('update-filters', { ...filters.value, searchQuery: searchQuery.value });
}

function isFilterChecked(filterType, value) {
  return filters.value[filterType]?.includes(value) || false;
}

function resetFilters() {
  filters.value = {
    members: [],
    labels: [],
    cardStatus: [],
    dueDate: [],
    activity: []
  };
  searchQuery.value = '';
  emit('update-filters', filters.value);
}

function closePanel() {
  emit('close');
}
</script>
