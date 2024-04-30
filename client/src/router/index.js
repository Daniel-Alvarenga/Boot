import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/aluno/Login.vue';
import Register from '../views/aluno/Register.vue';
import TokenRegister from '../views/aluno/TokenRegister.vue';
import RecoveryAluno from '../views/aluno/RecoveryAluno.vue';
import ValidateRecovery from '../views/aluno/ValidateRecovery.vue';
import LoginAdmin from '../views/admin/LoginAdmin.vue';
import NotFound from '../views/NotFound.vue';
import RegisterProfessor from '../views/admin/RegisterProfessor.vue';
import RegisterCoordenador from '../views/admin/RegisterCoordenador.vue';
import RegisterCurso from '../views/admin/RegisterCurso.vue';
import RegisterFuncionario from '../views/admin/RegisterFuncionario.vue';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Home2',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register/token',
        name: 'TokenRegister',
        component: TokenRegister
    },
    {
        path: '/recovery',
        name: 'RecoveryAluno',
        component: RecoveryAluno
    },
    {
        path: '/recovery/validate',
        name: 'ValidateRecovery',
        component: ValidateRecovery
    },
    {
        path: '/admin/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path: '/admin/register/professor', 
        name : "RegisterProfessor",
        component: RegisterProfessor
    },
    {
        path: '/admin/register/coordenador', 
        name : "RegisterCoordenador",
        component: RegisterCoordenador
    },
    {
        path: '/admin/register/curso', 
        name : "RegisterCurso",
        component: RegisterCurso
    },
    {
        path: '/admin/register/funcionario',
        name: 'RegisterFuncionario',
        component: RegisterFuncionario
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;