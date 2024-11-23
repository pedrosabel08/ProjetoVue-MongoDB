import { createRouter, createWebHistory } from 'vue-router'
import VerCurriculos from '../components/VerCurriculos.vue'  // Ajuste o caminho conforme necessário
import VerDetalhes from '../components/VerDetalhes.vue'  // Ajuste o caminho conforme necessário
import HomePage from '../components/HomePage.vue' // Certifique-se de que este componente existe

const routes = [
    {
        path: '/',
        name: 'Home',  // Ou qualquer outra página inicial
        component: HomePage // Ajuste conforme necessário
    },
    {
        path: '/curriculos',
        name: 'VerCurriculos',
        component: VerCurriculos
    },
    {
        path: '/curriculo/:id', // Usando :id para capturar o ID do currículo
        name: 'VerDetalhes',
        component: VerDetalhes,
        props: true  // Passando o id como prop para o componente VerDetalhes
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
