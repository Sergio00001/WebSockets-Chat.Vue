<template>
    <div class="sendMessage" v-if="$store.state.connected">
        <div class="form">
            <input v-model="$store.state.messageText" placeholder="Введите ваше сообщение" type="text" class="message">
            <button class="btn" type="submit" @click="$store.dispatch('sendMessage')">Отправить</button>
        </div>
    </div>
    <div class="sendMessage" v-else>
        <div class="form">
            <input v-model="$store.state.userName" placeholder="Введите ваш ник" type="text" class="message">
            <button class="btn" @click="$store.dispatch('startSocket')">Войти</button>
        </div>
    </div>
    <div class="container">
        <div class="messages" v-for="mes in $store.state.messages" :key="mes.id">
            <p class="user" v-if="mes.event === 'connection'">Пользователь: {{ mes.userName }} подключился к нашему чату
            </p>
            <p class="text" v-else>{{ mes.userName }}: {{ mes.message }}</p>
        </div>
    </div>
</template>
<script>

export default {
}
</script>
<style scoped lang="scss">
.sendMessage {
    border: 3px solid teal;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 500px;
    padding: 25px;
}

.form {
    display: flex;
    flex-direction: column;
}

.message {
    width: 300px;
    height: 35px;
    padding-left: 15px;
    border: 2px solid teal;
    border-radius: 4px;
    outline: none;
}

.btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 30%;
    margin-left: 70%;
    padding: 7px 0px;
    background-color: rgba(255, 255, 255, 0);
    border: 2px solid teal;
    color: teal;
    border-radius: 4px;
    transition: all 0.3s ease 0s;

    &:hover {
        background-color: teal;
        color: white;
    }
}

.messages {
    margin-top: 25px;
}

.text {
    background-color: teal;
    display: inline-block;
    border-radius: 30px;
    color: white;
    padding: 6px 20px;
}

.user {
    font-size: 16px;
    color: gray;
    padding: 6px 20px;
}
</style>