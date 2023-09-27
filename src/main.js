import './assets/main.scss'

import {createApp} from 'vue'
import {createRouter, createWebHashHistory} from "vue-router";
import RegisterView from "@/views/RegisterView.vue";
import ScannerView from "@/views/ScannerView.vue";
import App from "@/App.vue";
import { createPinia } from "pinia";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/register",
            name: "register",
            component: RegisterView,
        },
        {
            path: "/scanner",
            name: "scanner",
            component: ScannerView
        },
        {
            path: "/",
            name: "base",
            redirect: "/register",
        },
    ]
})

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app')
