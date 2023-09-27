<script setup lang="ts">
import {Notification} from "@/data/notification";
import {computed, defineProps} from "vue"
interface Props {
    notification: Notification
}

const props = defineProps<Props>();

const isError = computed(() => {
    return props.notification.type == "error";
})
</script>

<template>
<div class="notification d-flex align-items-center w-100 p-2 my-2 rounded" :class="{ 'bg-danger': isError, 'bg-success': !isError }">{{props.notification.message}}</div>
</template>

<style scoped lang="scss">
.notification {
    min-height: 40px;
}
</style>