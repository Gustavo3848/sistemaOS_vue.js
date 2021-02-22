<template>
  <section class="listar">
    <!-- Select dos Filtros   -->
    <div class="campos">
      <div v-if="msg != null" class="card">
        {{msg}}
      </div>
      <label for="campos">Filtrar por: </label>
      <select id="multi-state" class="pure-input-1-2">
        <option @click="filter(1)">Data incial e data final</option>
        <option @click="filter(2)">Cliente + data incial e data final</option>
        <option @click="filter(3)">
          Cliente + status pagamento + data incial e data final
        </option>
        <option @click="filter(4)">
          Cliente + status serviço + data incial e data final
        </option>
        <option @click="filter(5)">
          Status pagamento + data incial e data final
        </option>
        <option @click="filter(6)">
          Status serviço + data incial e data final
        </option>
      </select>
    </div>
    <!-- Campos dos Filtros -->
    <div class="inputs">
      <div v-if="this.filtro == 1">
        <label for="dataInit">Data inicial</label>
        <input v-model="camposFiltro.dataInit" type="date" />
        <label for="dataFinal">Data final</label>
        <input v-model="camposFiltro.dataFinal" type="date" />
        <button id="search" @click="filtrar()" class="fas fa-search"></button>
      </div>
      <div v-else-if="this.filtro == 2">
        <label for="cliente">Cliente</label>
        <select name="cliente" id="cliente">
            <option v-for="cliente in clientes" :key="cliente._id" v-bind:value="cliente._id">{{cliente.nome}}</option>
        </select>
        <label for="dataInit">Data inicial</label>
        <input v-model="camposFiltro.dataInit" type="date" />
        <label for="dataFinal">Data final</label>
        <input v-model="camposFiltro.dataFinal" type="date" />
        <button id="search" class="fas fa-search"></button>
      </div>
      <div v-else-if="this.filtro == 3">
        <label for="cliente">Cliente</label>
        <select name="cliente" id="cliente">
            <option v-for="cliente in clientes" :key="cliente._id" v-bind:value="cliente._id">{{cliente.nome}}</option>
        </select>
        <label for="statusPagamento">Status pagamento</label>
        <select
          name="statusPagamento"
          id="statusPagamento"
          v-model="camposFiltro.statusPagamento"
        >
          <option>FINALIZADO</option>
          <option>PENDENTE</option>
        </select>
        <label for="dataInit">Data inicial</label>
        <input type="date" v-model="camposFiltro.dataInit" />
        <label for="dataFinal">Data final</label>
        <input type="date" v-model="camposFiltro.dataFinal" />
        <button id="search" class="fas fa-search"></button>
      </div>
      <div v-else-if="this.filtro == 4">
        <label for="cliente">Cliente</label>
        <select name="cliente" id="cliente">
            <option v-for="cliente in clientes" :key="cliente._id" v-bind:value="cliente._id">{{cliente.nome}}</option>
        </select>
        <label for="statusServico">Status serviço</label>
        <select
          name="statusServico"
          id="statusServico"
          v-model="camposFiltro.statusServico"
        >
          <option>FINALIZADO</option>
          <option>PENDENTE</option>
        </select>
        <label for="dataInit">Data inicial</label>
        <input type="date" v-model="camposFiltro.dataInit" />
        <label for="dataFinal">Data final</label>
        <input type="date" v-model="camposFiltro.dataFinal" />
        <button id="search" class="fas fa-search"></button>
      </div>
      <div v-else-if="this.filtro == 5">
        <label for="statusPagamento">Status pagamento</label>
        <select
          name="statusPagamento"
          id="statusPagamento"
          v-model="camposFiltro.statusPagamento"
        >
          <option>FINALIZADO</option>
          <option>PENDENTE</option>
        </select>
        <label for="dataInit">Data inicial</label>
        <input type="date" v-model="camposFiltro.dataInit" />
        <label for="dataFinal">Data final</label>
        <input type="date" v-model="camposFiltro.dataFinal" />
        <button id="search" class="fas fa-search"></button>
      </div>
      <div v-else-if="this.filtro == 6">
        <label for="statusServico">Status serviço</label>
        <select
          name="statusServico"
          id="statusServico"
          v-model="camposFiltro.statusServico"
        >
          <option>FINALIZADO</option>
          <option>PENDENTE</option>
        </select>
        <label for="dataInit">Data inicial</label>
        <input type="date" v-model="camposFiltro.dataInit" />
        <label for="dataFinal">Data final</label>
        <input type="date" v-model="camposFiltro.dataFinal" />
        <button id="search" class="fas fa-search"></button>
      </div>
    </div>
    <div class="table">
      <table class="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Cliente</th>
            <th>Status serviço</th>
            <th>Status pagamento</th>
            <th style="text-align: center;"><i class="fas fa-trash-alt"></i></th>
            <th style="text-align: center;"><i class="fas fa-edit"></i></th>
            <th style="text-align: center;"><i class="far fa-folder-open"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="x in os" :key="x._id">
            <td>{{ x.numeroOS }}</td>
            <td>{{ x.dataData | data}}</td>
            <td>{{ x.cliente.nome}}</td>
            <td>{{ x.status }}</td>
            <td>{{ x.pagamento }}</td>
            <th><button @click="removerOS(x._id)"><i class="fas fa-trash-alt"></i></button></th>
            <th> <router-link :to="{name:'updateOS',params:{id:x._id}}"><button><i class="fas fa-edit"></i></button></router-link></th>
            <th> <router-link :to="{name:'OSAberta',params:{id:x._id}}"><button><i class="far fa-folder-open"></i></button></router-link></th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      msg:null,
      os: [],
      clientes:{},
      filtro: 0,
      camposFiltro: {
        cliente: "",
        dataInit: "",
        dataFinal: "",
        statusPagamento: "",
        statusServico: "",
      },
      erros: {
        msg: "",
      },
    };
  },
  methods: {
    filter(x) {
      this.filtro = x;
    },
    filtrar() {
      switch (this.filtro) {
        case 1:
            console.log(this.camposFiltro.dataInit)
            this.os = _.filter(this.os, function(o) { 
              console.log(o.dataData)
              if(o.dataData == this.camposFiltro.dataInit ){
                return o
              } 
            });

          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
    },
    removerOS(values){
      var id = values
      console.log(id)
      axios.post("http://localhost:3000/ordensservico/removeros",{id:id}).then((response)=>{
        console.log(response);
        this.msg = response.data
        this.getOs();
      }).catch((err)=>{
        console.log(err)
        this.msg = "Erro ao excluir OS!"
      });
    },
    getOs(){
      axios.get("http://localhost:3000/ordensservico/getall").then((response) => {
      this.os = response.data;
      });
    }
  },
  filters:{
    data:function(value){
      var newData = moment(value).utc().locale("pt-br").format("L");
      return newData;
    }
  },
  mounted() {
    this.getOs();
    axios.get("http://localhost:3000/clientes/getall").then((response) => {
      this.clientes = response.data;
    });
  }  
};
</script>

<style>
.inputs {
  margin-top: 10px;
  margin-bottom: 10px;
  grid-area: input;
}
.campos{
    grid-area: campos;
}
.inputs > div > input {
  height: 35px;
  margin-right: 10px;
}
.inputs > div > select {
  height: 35px;
  margin-right: 10px;
}
#search {
  vertical-align: middle;
  height: 35px;
}
.table{
    grid-area: tabela;
    width: 1000px;
}
.listar{
    display: grid;
    grid-template-areas:'campos tabela tabela tabela tabela tabela'
    'input tabela tabela tabela tabela tabela';
}
</style>