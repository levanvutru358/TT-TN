<template>
<div class="sidebar">

  <div class="menu">

        <RouterLink
      to="/home"
      class="item"
      active-class="active"
    >
      Home
    </RouterLink>


    <div class="item">Templates</div>

    <RouterLink
      to="/boards"
      class="item"
      active-class="active"
    >
      Boards
    </RouterLink>

        <RouterLink
      to="/users"
      class="item"
      active-class="active"
    >
      Users
    </RouterLink>

        <RouterLink
      to="/profile"
      class="item"
      active-class="active"
    >
      Profile
    </RouterLink>

        <RouterLink
      to="/admin"
      class="item"
      active-class="active"
    >
      Admin
    </RouterLink>

  </div>

  <div class="workspace">
    <h4>Workspace</h4>

    <RouterLink to="/boards" class="item">
      Boards
    </RouterLink>

    <div class="item">Members</div>
    <div class="item">Settings</div>
  </div>

</div>
</template>

```vue
<style scoped>

.sidebar{
  width:240px;
  background:#f7f8f9;
  border-right:1px solid #e6e8ec;
  padding:16px 10px;
  display:flex;
  flex-direction:column;
  gap:20px;
}

/* menu section */

.menu{
  display:flex;
  flex-direction:column;
  gap:6px;
}

/* workspace section */

.workspace{
  display:flex;
  flex-direction:column;
  gap:6px;
}

.workspace h4{
  font-size:12px;
  font-weight:600;
  color:#6b778c;
  text-transform:uppercase;
  margin:10px 8px 4px;
}

/* item */

.item{
  display:flex;
  align-items:center;

  padding:9px 12px;
  border-radius:8px;

  font-size:14px;
  color:#172b4d;

  cursor:pointer;
  text-decoration:none;

  transition:background 0.18s ease;
}

/* hover */

.item:hover{
  background:#ebecf0;
}

/* active route */

.active{
  background:#e9f2ff;
  color:#0c66e4;
  font-weight:500;
}

</style>
```
