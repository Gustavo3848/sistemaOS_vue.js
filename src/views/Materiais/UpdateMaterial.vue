<template>
  <div>
    <div v-if="err != null">
      <p>{{err}}</p>
    </div>
    <div>
      <h2>Atualizar material</h2>
    </div>
    <div class="inputs">
      <div class="decricao">
        <label for="descricao">Descrição</label>
        <input
          type="text"
          name="descricao"
          id="descricao"
          required="true"
          v-model="material.nome"
          :v-bind="material.nome"
        />
      </div>
      <div>
          <label for="quantidade">Quantidade</label>
          <input type="number" v-model="material.quantidade" :v-bind="material.quantidade">
      </div>
      <div>
        <label for="valor">Valor</label>
        <money
          v-bind="money"
          aria-required="true"
          v-model="material.valor"
          :v-bind="material.valor"
        ></money>
      </div>
      <div>
        <button class="pure-button" @click="salvar()">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      err: null,
      material: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: " #",
        precision: 2,
        masked: false,
      },
    };
  },
  mounted() {
      this.selectById();
  },
  methods: {
    salvar() {
      if (isNaN(this.material.quantidade)) {
      this.setTime("Quantidade precisa ser um numero!")
      this.clean()
      } else {
        this.material.nome = this.material.nome.toUpperCase();
        axios
          .post("http://localhost:3000/materiais/updateById/"+ this.material._id, this.material)
          .then((response) => {
            console.log(response);
            this.$router.push({name:'OSAberta',params:{id:this.material.os}})
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    setTime(x){
        this.err = x
    },
    clean(){
      setTimeout(()=>{this.err = null},3000);
    },
    selectById(){
        axios.get("http://localhost:3000/materiais/selectById/" + this.$route.params.idMat).then((response)=>{
            this.material = response.data
        });
    }
    
  },
};
</script>
<style>
.inputs > input {
  height: 35px;
}

.inputs {
  display: grid;
  max-width: 500px;
  grid-row-gap: 10px;
}
.inputs > div {
  display: grid;
  gap: inherit;
  grid-template-columns: 1fr 3fr;
}
.inputs > div > label {
  align-self: center;
}
#horas {
  text-align: center;
  width: 15%;
}
</style>