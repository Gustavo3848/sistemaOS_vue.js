<template>
  <div>
    <div v-if="err != null">
      <p>{{err}}</p>
    </div>
    <div>
      <h2>Adicionar serviço</h2>
    </div>
    <div class="inputs">
      <div class="descricao">
        <label for="descricao">Descrição</label>
        <input
          type="text"
          name="descricao"
          id="descricao"
          required="true"
          v-model="servico.descricao"
        />
      </div>
      <div>
        <label for="horas">Horas</label>
        <the-mask
          :mask="['##:##']"
          masked
          type="text"
          placeholder="hh:mm"
          id="horas"
          v-model="servico.horas"
        />
      </div>
      <div>
        <label for="valorHora">Valor Hora</label>
        <money
          v-bind="money"
          aria-required="true"
          v-model="servico.valorHora"
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
      servico: {
        os:'',
        descricao: "",
        horas: "",
        valorHora: 0,
        valor: 0,
        _id:''
      },
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
    axios.get("http://localhost:3000/servicos/getById/"+ this.$route.params.idServ).then((response)=>{
      this.servico = response.data
    });
  },
  methods: {
    salvar() {
      if (this.servico.horas.length <= 4) {
      this.setTime("Horas incorreta!")
      this.clean()
      } else {
        this.valor();
        this.servico.descricao = this.servico.descricao.toUpperCase();
        axios
          .post("http://localhost:3000/servicos/updateById/" + this.servico._id, this.servico)
          .then((response) => {
            console.log(response)
            this.$router.push({name:'OSAberta',params:{id:this.servico.os}})
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    valor() {
      var hora = this.servico.horas.substring(2, 0);
      var minutos = this.servico.horas.substring(4, 5);
      this.servico.valor =
        hora * this.servico.valorHora + (minutos / 60) * this.servico.valorHora;
    },
    setTime(x){
        this.err = x
    },
    clean(){
      setTimeout(()=>{this.err = null},3000);
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