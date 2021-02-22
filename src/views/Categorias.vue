<template>

  <div>
    <h1>Categorias</h1>
    <div v-if="editar">
      <input class="input" v-model="user.name" type="text" name="name" id="name" >
      <input class="input" v-model="user.login" type="text" name="login" id="login">
      <input class="input" v-model="user.email" type="text" name="email" id="email">
      <button class="pure-button pure-button-primary" @click="get()">Add</button>
    </div>
    <div v-else>
        <h1>Editar</h1>
        <input class="input" v-model="salvar().name" type="text">  
        <input class="input" v-model="salvar().login" type="text">
        <input class="input" v-model="salvar().email" type="text">
      <button @click="salvarEdit(salvar().index)" class="pure-button pure-button-primary">Salvar</button>
    </div>
    
    <table class="table is-bordered">
      <tr>
        <th>Nome</th>
        <th>Login</th>
        <th>E-mail</th>
        <th>Index</th>
      </tr>
      <tr v-for="user in array" :key="user.index">
        <td>{{user.name}}</td>
        <td>{{user.login}}</td>
        <td>{{user.email}}</td>
        <td>{{user.index}}</td>
        <td><button class="delete is-small" @click="remover(user.index)"></button></td>
        <td><button  @click="pegarIndex(user.index)">Editar</button></td>
      </tr>
      
    </table>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      index:0,
      editar:true,
      user:{
        name:"",
        login:"",
        email:""
      },
      array:[]
    }
  },
  methods:{
    get(){
      var index
      if(this.array.length >= 1){
        console.log("Index do elemento: " +this.array[this.array.length-1].index)
        index = this.array[this.array.length-1].index + 1
      }else{
        index = 0
      }
        var us={
          name:this.user.name,
          login:this.user.login,
          email:this.user.email,
          index: index
        }
      this.array.push(us)
      this.user.name =""
      this.user.email = ""
      this.user.login = ""
      console.log("Tamanho Array:" + this.array.length)
    },
    remover(x){
      for (let index = 0; index < this.array.length; index++) {
        if(this.array[index].index == x){
          this.array.splice(index,1)
        }
        
      }
    },
    pegarIndex(x){
      this.editar=false
      this.index = x
    },
    salvar(){
      for (let index = 0; index < this.array.length; index++) {
        if(this.array[index].index == this.index){
          return this.array[index]
        }
      } 
    },
    salvarEdit(x){
      for (let index = 0; index < this.array.length; index++) {
        if(this.array[index].index == x){
          this.array.name = this.salvar().name
          this.array.login  = this.salvar().login
          this.array.email = this.salvar().email
        }
      } 
      this.editar = true
    }
  },
  created(){
    
  }
}
</script>
<style>

</style>