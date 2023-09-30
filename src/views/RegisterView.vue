<script setup lang="ts">
import {inject, ref, type Ref} from "vue";
import axios from "axios";
import {useToastStore} from "@/stores/toastStore";
import {useRouter} from "vue-router";

const toastStore = useToastStore();

const router = useRouter();
if (localStorage.getItem("userID") !== null) router.push("scanner");

toastStore.addNotification("error", "Bitte keinen privaten Tab verwenden, da es dadurch zu verlust Ihres Kontos kommen könnte!")

const backendIP = inject("backendIP");
const name: Ref<string> = ref("");

function handleSubmit(): void {
    axios.post(backendIP+"user/", { name: name.value }).then((response) => {
        localStorage.setItem("userID", response.data);
        toastStore.addNotification("info", "Account wurde angelegt!")
        router.push("scanner")
    }).catch(reason => {
        console.log(reason)
        toastStore.addNotification("error", reason.response.data)
    })
}

</script>

<template>
    <div id="register-header" class="d-flex justify-content-center align-items-center">
        <h1 id="header-text" class="fw-semibold">Willkommen!</h1>
    </div>

    <form id="form" @submit.prevent="handleSubmit"
         class="position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center p-2 rounded-4">
        <div id="register-header">
            <h3 id="register-text">Registrieren</h3>
        </div>
        <div id="name-input">
            <input id="input" class="form-control" type="text" placeholder="Dein Name:" v-model="name">
        </div>
        <div id="register-button">
            <button id="button" type="submit" class="btn text-light btn-primary" @submit.prevent>Legen Sie los!</button>
        </div>
    </form>
</template>

<style scoped lang="scss">
@import "@/assets/variables";

#register-header {
    height: 150px;
}

@media screen and (orientation:landscape) {
    #register-header * {
        display: none;
    }
}

#form {
    width: 90vw;
    height: 200px;

    background: rgba($dark-mode-1, 0.6);
    backdrop-filter: blur(3px);
    box-shadow: 10px 5px 5px rgba(#000, 0.25);
    -webkit-backdrop-filter: blur(7px);

    & * {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 40%;
        width: 100%;
    }

    #name-input {
        #input {
            height: 40px;
            width: 90%;

            box-shadow: 5px 5px 5px rgba(#000, 0.25);
        }
    }

    #register-button {
        #button {
            height: 40px;
            width: 90%;

            box-shadow: 5px 5px 5px rgba(#000, 0.25);
        }
    }
}
</style>