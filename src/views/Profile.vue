```vue
<template>

<div class="page">

  <h2 class="title">Profile</h2>

  <div class="card">

    <div class="avatar">
      DD
    </div>

    <div class="form">

      <label>Name</label>
      <input v-model="form.name" />

      <label>Username</label>
      <input v-model="form.username" />

      <label>Email</label>
      <input v-model="form.email" />

      <label>Bio</label>
      <textarea v-model="form.bio"></textarea>

      <button class="save-btn">
        Save Profile
      </button>

    </div>

  </div>

</div>

</template>

<script setup>
import { reactive } from "vue"

const form = reactive({
  name: "David",
  username: "david",
  email: "david@email.com",
  bio: ""
})
</script>

<style scoped>

.page{
  padding:24px;
}

.title{
  font-size:22px;
  margin-bottom:20px;
}

.card{
  display:flex;
  gap:30px;
  background:white;
  padding:30px;
  border-radius:10px;
  max-width:600px;
}

.avatar{
  width:80px;
  height:80px;
  border-radius:50%;
  background:#0c66e4;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:26px;
}

.form{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:10px;
}

input, textarea{
  border:1px solid #ddd;
  padding:8px;
  border-radius:6px;
}

.save-btn{
  margin-top:10px;
  background:#0c66e4;
  color:white;
  border:none;
  padding:10px;
  border-radius:6px;
  cursor:pointer;
}

</style>
```
