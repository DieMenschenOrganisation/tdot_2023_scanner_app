<script setup>
import {useToastStore} from "@/stores/toastStore";
import ToastList from "@/components/ToastList.vue";
import {onUnmounted} from "vue";

useToastStore().startUpdater();

onUnmounted(() => {
    console.log(useToastStore().stopUpdater())
})

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
        <ToastList></ToastList>
        <button id="btn" @click="add">add</button>
        <router-view></router-view>
    </main>
</template>

<style scoped>
#btn {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>
