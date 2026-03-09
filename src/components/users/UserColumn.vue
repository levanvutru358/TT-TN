<template>
  <div
    class="w-72 bg-[#f1f2f4] rounded-lg p-3 flex-shrink-0"
    @dragover.prevent
    @drop="dropCard"
  >
    <!-- Title -->
    <h3 class="font-semibold mb-3">
      {{ title }}
    </h3>

    <!-- Cards -->
    <div class="space-y-2">
      <UserCard
        v-for="u in users"
        :key="u.id"
        :user="u"
      />
    </div>

    <!-- Add card -->
    <AddUserCard :role="role" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useUserStore } from "../../stores/userStore"

import UserCard from "./UserCard.vue"
import AddUserCard from "./AddUserCard.vue"

const props = defineProps({
  title: String,
  role: String
})

const store = useUserStore()

// users theo role
const users = computed(() =>
  store.users.filter(user => user.role === props.role)
)

// drop card
function dropCard(e) {

  const userId = Number(
    e.dataTransfer.getData("userId")
  )

  if(!userId) return

  store.moveUser(userId, props.role)
}
</script>