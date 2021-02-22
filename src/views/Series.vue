<template>
  <div>
        <h1>Series</h1>
        <div v-if="this.naRota == true">
            <router-link to="/series/categorias"><p @click="mudar()">Categorias</p></router-link>
        </div>
        <div v-else>
            <router-link to="/series/"><p @click="mudar()">Series</p></router-link>
        </div>
        
        
        <router-view/>
    </div>
</template>

<script>
export default {
    data(){
        return{
            naRota : true
        }

    },
    methods:{
        mudar(){
            if(this.naRota == true){
                this.naRota = false
            }else{
                this.naRota = true
            }
        }
    }
}
</script>

<style>

</style>