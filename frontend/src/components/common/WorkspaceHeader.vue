<template>
  <header
    class="sticky top-0 z-20 h-12 border-b border-[#d0d4db] bg-[#f8f9fb]/95 backdrop-blur"
  >
    <div class="h-full flex items-center gap-3 px-4 lg:px-7">
      <button
        type="button"
        class="w-7 h-7 rounded-md text-[#44546f] hover:bg-[#e9ebef] flex items-center justify-center"
        aria-label="Menu"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 6H8V8H6V6ZM11 6H13V8H11V6ZM16 6H18V8H16V6ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11ZM6 16H8V18H6V16ZM11 16H13V18H11V16ZM16 16H18V18H16V16Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <router-link
        to="/"
        class="flex items-center gap-2 min-w-[140px] rounded-md px-1 py-1 hover:bg-[#e9ebef] transition-colors"
      >
        <div
          class="w-7 h-7 rounded-md bg-[#0c66e4] text-white text-xs font-semibold flex items-center justify-center"
        >
          T
        </div>
        <span class="text-[20px] leading-none text-[#0747a6] font-semibold">
          Trello
        </span>
      </router-link>

      <div class="flex-1 max-w-4xl">
        <label
          class="h-9 px-3 rounded-md border border-[#cfd5de] bg-white flex items-center gap-2 text-[#5e6c84]"
        >
          <svg
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11 4C14.866 4 18 7.13401 18 11C18 12.7407 17.3641 14.333 16.3124 15.5564L20.3787 19.6228L18.9645 21.037L14.8982 16.9706C13.6748 18.0224 12.0825 18.6583 10.3418 18.6583C6.4758 18.6583 3.3418 15.5243 3.3418 11.6583C3.3418 7.79231 6.4758 4.65831 10.3418 4.65831C10.5617 4.65831 10.7815 4.66965 11 4.69218V4Z"
              fill="currentColor"
            />
          </svg>

          <input
            :value="modelValue"
            type="text"
            :placeholder="searchPlaceholder"
            class="w-full bg-transparent text-xs text-[#172b4d] placeholder:text-[#5e6c84] outline-none"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </label>
      </div>

      <button
        v-if="showCreateButton"
        type="button"
        class="h-8 px-3.5 rounded-md bg-[#0c66e4] text-white text-xs font-semibold hover:bg-[#0055cc]"
        @click="$emit('create-click')"
      >
        {{ createButtonText }}
      </button>

      <div class="hidden md:flex items-center gap-1 text-[#44546f] ml-auto">
        <button
          v-for="item in topActions"
          :key="item"
          type="button"
          class="w-7 h-7 rounded-md hover:bg-[#e9ebef] flex items-center justify-center text-sm"
          :aria-label="item"
        >
          {{ item }}
        </button>

        <div
          class="w-7 h-7 rounded-full bg-[#de350b] text-white text-[10px] font-bold flex items-center justify-center ml-1"
        >
          LT
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  searchPlaceholder: {
    type: String,
    default: "Tìm kiếm",
  },
  showCreateButton: {
    type: Boolean,
    default: true,
  },
  createButtonText: {
    type: String,
    default: "Tạo mới",
  },
});

defineEmits(["update:modelValue", "create-click"]);

const topActions = ["📢", "🔔", "❔"];
</script>