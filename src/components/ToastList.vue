<script setup lang="ts">
import {useToastStore} from "@/stores/toastStore";
import Toast from "@/components/Toast.vue";

const toastsStore = useToastStore();
</script>

<template>
    <TransitionGroup name="toast" tag="div" id="toastList" class="position-absolute bottom-0 start-0 p-2 w-100">
        <Toast v-for="notification in toastsStore.viewedNotifications" :key="notification" :notification="notification"/>
    </TransitionGroup>
</template>

<style scoped lang="scss">
.toast-move, /* apply transition to moving elements */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(30px);
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