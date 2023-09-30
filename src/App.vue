<script setup lang="ts">
import {useToastStore} from "@/stores/toastStore";
import ToastList from "@/components/ToastList.vue";
import {onUnmounted, provide} from "vue";

const backendAddress = import.meta.env.VITE_BACKEND_IP + ":" + import.meta.env.VITE_BACKEND_PORT + "/";

provide("backendIP", backendAddress);

useToastStore().startUpdater();

onUnmounted(() => {
    useToastStore().stopUpdater();
})
</script>

<template>
    <main>
        <ToastList></ToastList>
        <router-view></router-view>
    </main>
</template>
