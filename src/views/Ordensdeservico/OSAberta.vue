<template>
  <section>
    <div class="tableOSaberta">
      <div v-if="msg != null">
        {{msg}}
      </div>
      <h2>ORDEM DE SERVIÇO</h2>
      <table class="pure-table pure-table-bordered" id="table">
        <thead>
          <tr>
            <th style="width: 10%">Nº</th>
            <th style="width: 25%">Data</th>
            <th style="width: 25%">Cliente</th>
            <th style="width: 20%">Status serviço</th>
            <th style="width: 20%">Status pagamento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ os.numeroOS }}</td>
            <td>{{ os.dataData | data() }} - {{ os.dataData | dia() }}</td>
            <td>{{ cliente.nome }}</td>
            <td>{{ os.status }}</td>
            <td>{{ os.pagamento }}</td>
          </tr>
        </tbody>
      </table>
      <table class="pure-table pure-table-bordered" id="table2">
        <thead>
          <tr>
            <th>Equipamento</th>
            <th>Setor</th>
            <th>C. Custo</th>
            <th>Cod. C. Custo</th>
            <th>Solicitante</th>
            <th>Ref. Cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>{{ os.equipamento }}</div>
            </td>
            <td>
              <div>{{ os.setor }}</div>
            </td>
            <td>
              <div>{{ os.cCusto }}</div>
            </td>
            <td>
              <div>{{ os.codCcusto }}</div>
            </td>
            <td>
              <div>{{ os.solicitante }}</div>
            </td>
            <td>
              <div>{{ os.refCliente }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="totalOS" style="text-align:end;margin-top:10px;">
      <table class="pure-table pure-table-bordered">
        <thead>
          <tr>
            <th>Valor total:</th>
            <td>{{calcValor() | money}}</td>
          </tr>
        </thead>
      </table>
    </div>
    <div>
      <div>
        <h2>Serviços</h2>
        <table class="pure-table pure-table-bordered" id="table2">
          <thead>
            <tr>
              <th style="width:45%;">Descrição</th>
              <th style="text-align: center;width:5%;">Horas</th>
              <th>Valor hora</th>
              <th>Valor</th>
              <th style="text-align: center;width:3%;"><i class="fas fa-trash-alt"></i></th>
              <th style="text-align: center;width:3%;"><i class="fas fa-edit"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="serv in servicos" :key="serv._id">
              <td>
                <div>{{ serv.descricao }}</div>
              </td>
              <td>
                <div>{{ serv.horas }}</div>
              </td>
              <td>
                <div>{{ serv.valorHora | money}}</div>
              </td>
              <td>
                <div>{{ serv.valor | money}}</div>
              </td>
              <td>
                <div style="text-align:center;">
                  <i class="fas fa-trash-alt" @click="deleteById(serv._id)"></i>  
                </div>
              </td>
              <td>
                <div style="text-align:center;">
                  <router-link :to="{name:'updateServico',params:{idServ:serv._id}}"><i class="fas fa-edit"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="buttonOS">
          <router-link :to="{name:'addServico',params:{id:os._id}}"><button><i class="far fa-plus-square"></i></button></router-link>
        </div>
      </div>
      <div>
        <h2>Materiais</h2>
        <table class="pure-table pure-table-bordered" id="table2">
          <thead>
            <tr>
              <th style="width:50%;">Descrição</th>
              <th>QTD</th>
              <th>Valor</th>
              <th style="text-align: center;width:5%;"><i class="fas fa-trash-alt"></i></th>
              <th style="text-align: center;width:5%;"><i class="fas fa-edit"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="material in materiais" :key="material._id">
              <td>
                <div>{{ material.nome }}</div>
              </td>
              <td>
                <div>{{ material.quantidade }}</div>
              </td>
              <td>
                <div>{{ material.valor | money }}</div>
              </td>
              <td>
                <div style="text-align:center;">
                  <i @click=" deleteByIdMaterial(material._id)" class="fas fa-trash-alt"></i>  
                </div>
              </td>
              <td>
                <div style="text-align:center;">
                  <router-link :to="{name:'updateMaterial',params:{idMat:material._id}}"><i class="fas fa-edit"></i></router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="buttonMat">
          <router-link :to="{name:'Adicionarmateriais',params:{id:os._id}}"><button><i class="far fa-plus-square"></i></button></router-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      msg:null,
      os: {},
      cliente:{},
      servicos:{},
      materiais:{}
    };
  },
  filters: {
    data: function (value) {
      var newData = moment(value).utc().locale("pt-br").format("L");
      return newData;
    },
    dia: function (value) {
      var newDia = moment(value).utc().locale("pt-br").format("dddd").toUpperCase();
      return newDia;
    },
    money:function(value){
      var newMoney = (value).toLocaleString('pt-br',{currency:'BRL',style:'currency'});
      return newMoney;
    }
  },
  mounted() {
    this.openOS();
  },
  methods: {
    openOS() {
      var id = this.$route.params.id;
      axios
        .get("http://localhost:3000/ordensservico/openos/" + id)
        .then((response) => {
          this.os = response.data;
          this.cliente = response.data.cliente
        });
      //selectServicos
      axios.get("http://localhost:3000/servicos/selectAll/" + id).then((response)=>{
        this.servicos = response.data;
      });
      //selectMateriais
      axios.get("http://localhost:3000/materiais/selectAll/" + id).then((response)=>{
        this.materiais = response.data;
      });
    },
    deleteById(id){
      axios("http://localhost:3000/servicos/deleteById/"+ id).then((response)=>{
        this.msg = response.data;
        this.openOS();
      });
    },
    deleteByIdMaterial(id){
      axios("http://localhost:3000/materiais/deleteById/"+ id).then((response)=>{
        this.msg = response.data;
        this.openOS();
      });
    },
    calcValor(){
      var x = 0;
      for (let index = 0; index < this.servicos.length; index++) {
        x += this.servicos[index].valor;
      }
      for (let index = 0; index < this.materiais.length; index++) {
        x += this.materiais[index].valor;
      }
      return x
    }
  },
  created:function(){
        this.openOS();

  }
};
</script>
<style>
.tableOSaberta {
  max-width: 1000px;
  min-width: 1000px;
}
#table {
  table-layout: fixed;
  width: 100%;
  margin-bottom: 10px;
  max-width: 1000px;
}
#table2 {
  table-layout: fixed;
  width: 1000px;
}
.td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pure-table tr > td > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#buttonOS{
  text-align: end;
  max-width: 1000px;
  margin-top: 10px;
}
#buttonMat{
  text-align: end;
  max-width: 1000px;
  margin-top: 10px;
}

</style>