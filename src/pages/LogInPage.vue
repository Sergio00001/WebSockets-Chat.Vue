<template>
    <div class="login">
        <div class="login__background">
            <img src="@/assets/log-in_background.jpg" alt="background" class="background__img">
        </div>
        <div class="login__wrapper">
            <form class="login__form">
                <h1 class="login__header">Secret Chat</h1>
                <div class="login__logo">
                    <img src="@/assets/private-chat.png" alt="logo" class="login__img">
                </div>
                <input v-model="$store.state.userName" placeholder="Введите ваш ник" type="text" class="login__name">
                <button class="login__btn" type="submit"
                    @click.prevent="$store.dispatch('startSocket')">Присоединиться</button>
            </form>
        </div>
    </div>
</template>
<script>

export default {

}
</script>
<style scoped lang="scss">
.login {
    position: relative;
}

.background__img {
    width: 100%;
    height: auto;
}

.login__wrapper {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.login__form {
    display: flex;
    flex-direction: column;
    border-radius: 13px;
    padding: 15px;
    width: 300px;
    height: 300px;
    margin: 10px;
    background-color: rgba(255, 255, 255, 0.89);
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
    outline: none;
    padding-left: 10px;
    border-left: 0px;
    border-right: 0px;
    border-top: 0px;
    border-bottom: 1px solid black;
    transition: all 0.5s ease 0s;

    &::placeholder {
        position: absolute;
        transition: all 0.5s ease 0s;
        transform: translate(0px, 0px);
        padding-top: 5px;
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
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: black;
        color: white;
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
</style>