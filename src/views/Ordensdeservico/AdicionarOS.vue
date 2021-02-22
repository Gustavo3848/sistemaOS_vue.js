<template>
  <section>
    <div class="inputs">
      <div class="data">
        <label for="data">Data</label>
        <input type="date" name="data" id="data" required="true" v-model="os.data"/>
      </div>
      <div>
        <label for="cliente">Cliente</label>
        <select name="cliente" id="cliente" v-model="os.clienteId">
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
        />
      </div>
      <div>
        <label for="setor">Setor</label>
        <input type="text" name="setor" id="setor" v-model="os.setor"/>
      </div>
      <div>
        <label for="cCusto">C. custo</label>
        <input type="text" name="cCusto" id="cCusto" v-model="os.cCusto"/>
      </div>
      <div>
        <label for="codCcusto">Cod. c. custo</label>
        <input type="text" name="codCcusto" id="codCcusto" v-model="os.codCcusto"/>
      </div>
      <div>
        <label for="refCliente">Ref. cliente</label>
        <input type="text" name="refCliente" id="refCliente" v-model="os.refCliente"/>
      </div>
      <div>
        <label for="refCliente">Solicitante</label>
        <input type="text" name="solicitante" id="solicitante" v-model="os.solicitante"/>
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
            os:{
                clienteId:'',
                data:'',
                diaSemana:'',
                equipamento:'',
                setor:'',
                cCusto:'',
                codCcusto:'',
                refCliente:''
            }
        }
    },
    mounted(){
        // Buscar clientes
        axios.get('http://localhost:3000/clientes/getall').then((res) => {
            this.clientes = res.data
        }).catch((err) => {
            console.log(err)
        });   
    },
    methods:{
        salvar(){
        // Adicionar OS
        axios.post('http://localhost:3000/ordensservico/createos',
        {cliente:this.os.clienteId,
        dataData:this.os.data,
        equipamento:this.os.equipamento.toUpperCase(),
        setor:this.os.setor.toUpperCase(),
        cCusto:this.os.cCusto.toUpperCase(),
        codCcusto:this.os.codCcusto.toUpperCase(),
        solicitante:this.os.solicitante.toUpperCase(),
        refCliente:this.os.refCliente.toUpperCase()}
        ).then((res) => {
            this.msg = res.data
            this.$router.push('listar',this.msg);
            console.log(res)
        }).catch((err) => {
            console.log(err)
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