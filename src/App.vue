<script setup lang="ts">
import {useToastStore} from "@/stores/toastStore";
import ToastList from "@/components/ToastList.vue";
import {onUnmounted, provide} from "vue";

provide("backendIP", "https://backend.casino.schuelerprojekte.online/");

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
