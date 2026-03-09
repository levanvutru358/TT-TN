import { defineStore } from "pinia"

export const useUserStore = defineStore("users", {

moveUser(id, newRole) {

  const user = this.users.find(u => u.id === id)

  if(user){
    user.role = newRole
  }

},

state: () => ({
users: JSON.parse(localStorage.getItem("users")) || [
{ id:1,name:"John",email:"john@gmail.com",role:"user"},
{ id:2,name:"Anna",email:"anna@gmail.com",role:"admin"}
]
}),

actions:{

save(){
localStorage.setItem("users",JSON.stringify(this.users))
},

addUser(user){
this.users.push({
id:Date.now(),
...user
})
this.save()
},

deleteUser(id){
this.users = this.users.filter(u=>u.id!==id)
this.save()
},

updateUser(user){

const index=this.users.findIndex(u=>u.id===user.id)

if(index!==-1){
this.users[index]=user
}

this.save()
},

moveUser(id,role){

const user=this.users.find(u=>u.id===id)

if(user){
user.role=role
}

this.save()

}

},

getters:{

totalUsers:(state)=>state.users.length,

totalAdmins:(state)=>state.users.filter(u=>u.role==="admin").length,

totalMembers:(state)=>state.users.filter(u=>u.role==="member").length

}

})