<template>
    <section class="grid-container">
      <div class="pure-menu custom-restricted-width" id="menuVertical">
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/ordens-de-servico/listar" class="pure-menu-link"
            >Listar</router-link
          >
        </li>
        <li class="pure-menu-item">
          <router-link to="/ordens-de-servico/adicionar" class="pure-menu-link">Adicionar</router-link>
        </li>
      </ul>
    </div>
      <div class="conteudo">
        <router-view />
      </div>
    </section>
</template>

<script>
export default {};
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 200px auto;
}
.conteudo{
  padding: 10px;
  
} 
#menuVertical{
  height:fit-content;
}

</style>