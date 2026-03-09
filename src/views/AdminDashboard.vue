```vue
<template>

<div class="page">

  <h2 class="title">Admin Dashboard</h2>

  <div class="stats">

    <div class="card">
      <div class="number">24</div>
      <div class="label">Users</div>
    </div>

    <div class="card">
      <div class="number">5</div>
      <div class="label">Admins</div>
    </div>

    <div class="card">
      <div class="number">18</div>
      <div class="label">Active Users</div>
    </div>

    <div class="card">
      <div class="number">3</div>
      <div class="label">Inactive</div>
    </div>

  </div>

</div>

</template>

<style scoped>

.page{
  padding:24px;
}

.title{
  font-size:22px;
  margin-bottom:20px;
}

.stats{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
}

.card{
  background:white;
  padding:20px;
  border-radius:10px;
  text-align:center;
}

.number{
  font-size:26px;
  font-weight:bold;
}

.label{
  color:#666;
}

</style>
```
