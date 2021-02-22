<template>
  <div>
      <input type="text" name="email" id="email" placeholder="E-mail"><br>
      <input type="text" name="nome" id="nome" placeholder="Nome"><br>
      <button>Teste!</button> 
        {{parametrodata}}
  </div>
</template>

<script>
export default {
    
    created(){
        console.log("Teste")
         this.parametrodata=this.$route.params.slug
    },
    data(){
        return{
            parametrodata : "Nada"
        }
    }
}
</script>

<style>

</style>