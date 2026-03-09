```vue
<template>

<div class="page">

  <h2 class="title">Users</h2>

  <UserSearch />

  <UserStats />

  <div class="table">

    <div class="row header">
      <div>Name</div>
      <div>Email</div>
      <div>Role</div>
      <div>Status</div>
    </div>

    <div class="row" v-for="u in users" :key="u.id">
      <div>{{u.name}}</div>
      <div>{{u.email}}</div>
      <div>{{u.role}}</div>
      <div>{{u.status}}</div>
    </div>

  </div>

</div>

</template>

<script setup>
import { ref } from "vue"
import UserSearch from "../../components/users/UserSearch.vue"
import UserStats from "../../components/users/UserStats.vue"

const users = ref([
  {
    id:1,
    name:"David",
    email:"david@email.com",
    role:"ADMIN",
    status:"Active"
  },
  {
    id:2,
    name:"Alex",
    email:"alex@email.com",
    role:"USER",
    status:"Active"
  }
])
</script>

<style scoped>

.page{
  padding:24px;
}

.title{
  font-size:22px;
  margin-bottom:20px;
}

.table{
  margin-top:20px;
  background:white;
  border-radius:8px;
  overflow:hidden;
}

.row{
  display:grid;
  grid-template-columns:1fr 1fr 120px 120px;
  padding:12px;
  border-bottom:1px solid #eee;
}

.header{
  background:#f5f6f8;
  font-weight:600;
}

</style>
```
