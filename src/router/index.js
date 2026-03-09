import { createRouter, createWebHistory } from "vue-router"

import MainLayout from "../components/layout/MainLayout.vue"
import Home from "../views/Home.vue"
import UserBoard from "../views/UserBoard.vue"
import Profile from "../views/Profile.vue"
import AdminDashboard from "../views/AdminDashboard.vue"
import UsersPage from "../views/users/UsersPage.vue"

const routes = [
{
path: "/",
component: MainLayout,
children: [

{
path: "",
redirect: "/home"
},

{
path: "boards",
component: UserBoard
},

{
path: "home",
component: Home
},
{
  path: "/profile",
  component: Profile
},
{
  path: "/users",
  component: UsersPage
},
{
  path: "/admin",
  component: AdminDashboard
}

]
}
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router