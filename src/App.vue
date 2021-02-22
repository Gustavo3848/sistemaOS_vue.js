<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{name:'Filmes',params:{slug:'gratis'}}">Filmes</router-link> 
      <router-link to="/series">Series</router-link>
    </div> -->
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <router-link to="/ordens-de-servico/listar" style="text-decoration:none;"><a class="pure-menu-link" >Ordens de serviço</a></router-link> 
          </li>
          <li class="pure-menu-item">
            <a href="#" class="pure-menu-link">Clientes</a>
          </li>
          <li class="pure-menu-item">
            <a href="#" class="pure-menu-link">Relatórios</a>
          </li>
      </ul>
</div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
}
.pure-menu{
  background: black;
}


</style>
