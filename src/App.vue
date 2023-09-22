<script setup>
import {useToastStore} from "@/stores/toastStore";
import ToastList from "@/components/ToastList.vue";

useToastStore().startUpdater();

function add() {
    if (Math.random() > 0.5) {
        useToastStore().addNotification(
            "info",
            "This is a test info!",
        )
    } else {
        useToastStore().addNotification(
            "error",
            "This is a test error!",
        )
    }
}
</script>

<template>
    <main>
        <button id="btn" @click="add">add</button>
        <router-view></router-view>
        <ToastList></ToastList>
    </main>
</template>

<style scoped>
#btn {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>
