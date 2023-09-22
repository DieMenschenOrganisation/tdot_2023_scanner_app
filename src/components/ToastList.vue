<script setup lang="ts">
import {useToastStore} from "@/stores/toastStore";
import Toast from "@/components/Toast.vue";

const toastsStore = useToastStore();
</script>

<template>
    <TransitionGroup name="toast" tag="div" id="toastList" class="d-flex flex-column justify-content-end position-absolute bottom-0 start-0 p-2 vw-100 vh-100">
        <Toast v-for="(notification, index) in toastsStore.viewedNotifications" :key="notification" :notification="notification" :style="{'z-index': -index}"/>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.toast-move, /* apply transition to moving elements */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.75s ease-in-out;
}

.toast-enter-from {
    opacity: 0;
    scale: 0.0;
}
.toast-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
    position: absolute;
}

.testButton {
    position: absolute;
    top: 10px;
    left: 10px;
}
</style>