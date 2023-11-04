<script setup lang="ts">
import {inject, ref} from "vue";
import {useToastStore} from "@/stores/toastStore";
import {QrcodeStream} from 'vue-qrcode-reader'
import {useRouter} from "vue-router";
import axios from "axios";

const backendIP = inject("backendIP");
const router = useRouter();
const toastStore = useToastStore();

const userID = localStorage.getItem("userID");
axios.get(backendIP + "user/" + userID).catch(async reason => {
    toastStore.addNotification("error", reason.response.data)
    localStorage.removeItem("userID")
    await router.push("register");
})

const boundingBox = getComputedStyle(document.documentElement).getPropertyValue("--bounding-box");


const isLoading = ref(true);

function onCamera() {
    isLoading.value = false;
}

function onDetect(detectedCodes: { rawValue: string }[]) {
    const value = detectedCodes[0].rawValue;

    const [type, qrValue] = value.split("/");

    if (type === "redeem") {
        axios.get(backendIP + `scan/canRedeem/${userID}&${qrValue}`).then(() => {
            axios.get(backendIP + `scan/redeem/${userID}&${qrValue}`).then(response => {
                toastStore.addNotification("info", `Ihrem Konto wurden ${response.data} Punkte hinzugefügt!`)
            }).catch(reason => {
                toastStore.addNotification("error", reason.response.data);
            })
        }).catch(reason => {
            toastStore.addNotification("error", reason.response.data);
        })
        return;
    } else if (type === "notify") {
        axios.get(backendIP + `request?userID=${userID}&code=${qrValue}`).then(() => {
            toastStore.addNotification("info", "Erfolgreich gescannt!");
        }).catch(reason => {
            toastStore.addNotification("error", reason.response.data);
        })
        return;
    }

    toastStore.addNotification("error", "Ungültiger Qr-Code wurde eingescannt!")

}

const onError = err => {
    toastStore.addNotification("error", err);
    let error;
    if (err.name === 'NotAllowedError') {
        error = 'Sie müssen Kamerazugriff erlauben!'
    } else if (err.name === 'NotFoundError') {
        error = 'Dieses Gerät besitzt keine Kamera!'
    } else if (err.name === 'NotSupportedError') {
        error = 'secure context required (HTTPS, localhost)'
    } else if (err.name === 'NotReadableError') {
        error = 'Kamera wird bereits verwendet!'
    } else if (err.name === 'OverconstrainedError') {
        error = 'Keine passende Kamera gefunden!'
    } else if (err.name === 'StreamApiNotSupportedError') {
        error = 'Dieses Feature wird von Ihrem Browser nicht unterstützt!'
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
            boundingBox: {x, y, width, height}
        } = detectedCode

        ctx.lineWidth = 3
        ctx.strokeStyle = boundingBox
        ctx.strokeRect(x, y, width, height)
    }
}
</script>

<template>
    <div id="scanner"
         class="position-absolute top-50 start-50 translate-middle d-flex flex-column border border-4 border-primary rounded-5 overflow-hidden">
        <qrcode-stream @detect="onDetect" @camera-on="onCamera" @error="onError" :track="paintBoundingBox">
            <div class="w-100 h-100 d-flex justify-content-center align-items-center">
                <h1 class="loading-indicator" v-if="isLoading">Laden...</h1>
            </div>
        </qrcode-stream>
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