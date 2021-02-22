import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Filmes from '../views/Filmes.vue'
import Series from '../views/Series.vue'
import Categorias from '../views/Categorias.vue'
import Ordensdeservico from '../views/Ordensdeservico.vue'
import ListarOS from '../views/Ordensdeservico/ListarOS.vue'
import AdicionarOS from '../views/Ordensdeservico/AdicionarOS.vue'
import OSAberta from '../views/Ordensdeservico/OSAberta.vue'
import AddServico from '../views/Servicos/Adicionarservicos.vue'
import UpdateServico from '../views/Servicos/UpdateServico.vue'
import Adicionarmateriais from '../views/Materiais/Adicionarmateriais.vue'
import updateMaterial from '../views/Materiais/UpdateMaterial.vue'
import updateOS from '../views/Ordensdeservico/UpdateOS.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/filmes/:slug',
    name: 'Filmes',
    component: Filmes
  },
  {
    path: '/series',
    name: 'Series',
    component: Series,
    children: [
      {
        path: 'categorias',
        name: 'Categorias',
        component: Categorias
      }
    ]

  },
  {
    path: '/ordens-de-servico',
    name: 'Ordensdeservicos',
    component: Ordensdeservico,
    children: [
      {
        path: 'listar',
        name: 'listar',
        component: ListarOS
      },
      {
        path: 'adicionar',
        name: 'AdicionarOS',
        component: AdicionarOS
      },
      {
        path: 'os-aberta/:id',
        name: 'OSAberta',
        component: OSAberta,
      },
      {
        path: 'updateOS/:id',
        name: 'updateOS',
        component: updateOS
      },
      {
        path: 'servicos/:id',
        name: 'addServico',
        component: AddServico
      },
      {
        path: 'updateServico/:idServ',
        name: 'updateServico',
        component: UpdateServico
      },
      {
        path: 'materiais/:id',
        name: 'Adicionarmateriais',
        component: Adicionarmateriais
      },
      {
        path:'updateMaterial/:idMat',
        name: 'updateMaterial',
        component: updateMaterial
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
