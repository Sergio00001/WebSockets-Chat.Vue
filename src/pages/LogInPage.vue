<template>
    <div class="login">
        <div class="login__background" :class="{ 'active': $store.state.showBackground }">
        </div>
        <div class="login__wrapper" :class="{ 'active': $store.state.showBackground }">
            <div class="login__form">
                <h1 class="login__header">Secret Chat</h1>
                <div class="login__logo">
                    <img src="@/assets/private-chat.png" alt="logo" class="login__img">
                </div>
                <input v-model.trim="$store.state.userName" @keyup="$store.commit('loginValidation')"
                    placeholder="Введите ваш ник" type="text" class="login__name">
                <input v-model.trim="$store.state.chatName" @keyup="$store.commit('loginValidation')"
                    placeholder="Введите название комнаты" type="text" class="login__name">
                <button class="login__btn" :class="{ 'active': !$store.state.loginIsEmpty }"
                    @click.prevent="$store.dispatch('startSocket'), $router.push('/chat')">Войти</button>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    mounted() {
        this.$store.commit('lazyBackground')
    }
}
</script>
<style scoped lang="scss">
.login {
    position: relative;
}

.login__background {
    opacity: 0;
    transition: all 1s;
    background-image: url('@/assets/log-in_background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100vh;

    &.active {
        opacity: 1;
    }
}


.login__wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    opacity: 0;
    transition: all 0.3s ease 0.3s;

    &.active {
        opacity: 1;
    }
}

.login__form {
    display: flex;
    flex-direction: column;
    border-radius: 13px;
    padding: 25px;
    width: 300px;
    height: auto;
    margin: 10px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 5px rgb(168, 168, 168);
}

.login__header {
    text-align: center;
}

.login__name {
    background-color: rgba(255, 255, 255, 0);
    height: 30px;
    margin-bottom: 25px;
    color: black;
    padding-left: 10px;
    border: 1px solid black;
    border-radius: 4px;
    transition: all 0.5s ease 0s;
    outline-color: black;

    &::placeholder {
        transition: all 0.5s ease 0s;
        transform: translate(0px, 0px);
        opacity: 1;
        color: black;
    }

    &:focus::placeholder {
        opacity: 0;
        transform: translate(10px, 0px);
    }
}

.login__btn {
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid black;
    transition: all 0.4s ease 0s;
    border-radius: 14px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    color: black;

    &:hover {
        background-color: black;
        color: white;
    }


    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
    }
}

.login__logo {
    display: flex;
    justify-content: center;
    width: 70px;
    margin: 0 auto;
    padding: 15px;
    box-shadow: 0px 0px 10px rgba(99, 99, 99, 0.483);
    border-radius: 50%;
    margin-top: 20px;
    margin-bottom: 30px;
}

.login__img {
    width: 100%;
    height: auto;
}

@media(max-width: 767px) {

    .login__header {
        font-size: 20px;
    }

    .login__logo {
        width: 50px;
        padding: 10px;
    }

    .login__form {
        width: 250px;
        padding: 10px;
    }
}

@media(max-width: 550px) {
    .login__form {
        width: 150px;
    }

    .login__header {
        font-size: 13px;
    }

    .login__logo {
        width: 35px;
        padding: 8px;
        margin-top: 12px;
        margin-bottom: 10px;
    }

    .login__name {
        font-size: 9px;
        margin-bottom: 10px;
        padding-left: 2px;
    }

    .login__btn {
        height: 25px;
        font-size: 11px;
    }

}

@media(min-width: 1300px) {
    .login__name {
        font-size: 18px;
    }

    .login__btn {
        font-size: 18px;
    }
}

@media(min-width: 1440px) {
    .login__form {
        width: 350px;
    }
}

@media(min-width: 1600px) {
    .login__form {
        width: 400px;
    }

    .login__header {
        font-size: 40px;
    }

    .login__logo {
        width: 100px;
        padding: 20px;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .login__name {
        font-size: 25px;

    }

    .login__btn {
        font-size: 25px;
        height: 60px;
    }
}
</style>