<template>
  <section>
    <div class="inputs">
      <div class="data">
        <label for="data">Data</label>
        <input type="date" name="data" id="data" v-model="os.dataData"/>
      </div>
      <div>
        <label for="cliente">Cliente</label>
        <select name="cliente" id="cliente" v-model="os.cliente" >
            <option v-for="cliente in clientes" :key="cliente._id" v-bind:value="cliente._id">{{cliente.nome}}</option>
        </select>
      </div>
      <div>
        <label for="equipamento">Equipamento</label>
        <input
          type="text"
          name="equipamento"
          id="equipamento"
          required="true"
          v-model="os.equipamento"
          :v-bind="os.equipamento"
        />
      </div>
      <div>
        <label for="setor">Setor</label>
        <input type="text" name="setor" id="setor" v-model="os.setor" :v-bind="os.setor"/>
      </div>
      <div>
        <label for="cCusto">C. custo</label>
        <input type="text" name="cCusto" id="cCusto" v-model="os.cCusto" :v-bind="os.cCusto"/>
      </div>
      <div>
        <label for="codCcusto">Cod. c. custo</label>
        <input type="text" name="codCcusto" id="codCcusto" v-model="os.codCcusto" :v-bind="os.codCcusto"/>
      </div>
      <div>
        <label for="refCliente">Ref. cliente</label>
        <input type="text" name="refCliente" id="refCliente" v-model="os.refCliente" :v-bind="os.refCliente"/>
      </div>
      <div>
        <label for="refCliente">Solicitante</label>
        <input type="text" name="solicitante" id="solicitante" v-model="os.solicitante" :v-bind="os.solicitante"/>
      </div>
      <div>
        <button class="pure-button" @click="salvar()">Salvar</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            msg:null,
            clientes:[],
            os:{}
        }
    },
    mounted(){
        // Buscar clientes
        axios.get('http://localhost:3000/clientes/getall').then((res) => {
            this.clientes = res.data
        }).catch((err) => {
            console.log(err)
        });
        //SelectById OS
        this.selectById();   
    },
    methods:{
        salvar(){
        // Adicionar OS
        var id = this.$route.params.id;
        this.os.setor = this.os.setor.toUpperCase();
        this.os.equipamento = this.os.equipamento.toUpperCase();
        this.os.equipamento = this.os.equipamento.toUpperCase();
        this.os.cCusto = this.os.cCusto.toUpperCase();
        this.os.codCcusto = this.os.codCcusto.toUpperCase();
        this.os.refCliente = this.os.refCliente.toUpperCase();
        this.os.solicitante = this.os.solicitante.toUpperCase();
        axios.post('http://localhost:3000/ordensservico/updateById/'+id,this.os).then((res) => {
            this.msg = res.data
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
        this.$router.push({name:'listar'});
        },
        selectById(){
            axios.get('http://localhost:3000/ordensservico/selectById/'+ this.$route.params.id).then((response)=>{
                this.os = response.data
            });
        }
    }
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
</style>