<script setup>

</script>

<template>
    <div id="register-header" class="d-flex justify-content-center align-items-center">
        <h1 id="header-text" class="fw-semibold">Willkommen!</h1>
    </div>

    <div id="form"
         class="position-absolute top-50 start-50 d-flex flex-column justify-content-center align-items-center">
        <div id="register-header">
            <h3 id="register-text">Registrieren</h3>
        </div>
        <div id="name-input">
            <input id="input" class="form-control" type="text" placeholder="Dein Name:">
        </div>
        <div id="register-button">
            <button id="button" class="btn text-light btn-primary w-50">Legen Sie los!</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables";

#register-header {
    height: 150px;
}

#form {
    transform: translate(-50%, -50%);

    width: 90vw;
    height: 200px;

    box-sizing: border-box;
    padding: 10px;

    border-radius: 20px;

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

            box-shadow: 5px 5px 5px rgba(#000, 0.25);
        }
    }
}
</style>