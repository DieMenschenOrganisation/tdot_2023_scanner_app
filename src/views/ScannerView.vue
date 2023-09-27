<script setup lang="ts">
import {computed, ComputedRef, ref, Ref} from "vue";
import {useToastStore} from "@/stores/toastStore";
import { QrcodeStream } from 'vue-qrcode-reader'

const toastStore = useToastStore();

const isChecked: Ref<boolean> = ref(false);

const scannerText: ComputedRef<string> = computed((): string => {
    return isChecked.value ? "Toggle to deactivate scanner!" : "Toggle to activate scanner!";
})


function onDetect(detectedCodes: {rawValue: string}[]) {
    const value = detectedCodes[0].rawValue;

    toastStore.addNotification("info", `Scanned QR-Code: ${value}`)
}

const onError = err => {
    let error;
    if (err.name === 'NotAllowedError') {
        error = 'you need to grant camera access permission'
    } else if (err.name === 'NotFoundError') {
        error = 'no camera on this device'
    } else if (err.name === 'NotSupportedError') {
        error = 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error = 'is the camera already in use?'
    } else if (err.name === 'OverconstrainedError') {
        error = 'installed cameras are not suitable'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error = 'Stream API is not supported in this browser'
    } else if (err.name === 'InsecureContextError') {
        error = 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
        error = err.message
    }

    toastStore.addNotification("error", error);
}

function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
    }
}
</script>

<template>
    <div id="scanner" class="position-absolute top-50 start-50 translate-middle d-flex flex-column border border-4 border-primary rounded-5 overflow-hidden">
        <qrcode-stream @detect="onDetect" @error="onError" :track="paintBoundingBox"/>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables.scss";
#scanner {
    width: min(75vw, 75vh);
    aspect-ratio: 1;

    background-color: $dark-mode-1;
}
</style>