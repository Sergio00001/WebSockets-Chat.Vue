<template>
    <div class="chat__panel">
        <div class="all__users">
            <div class="users__panel">
                <a
                    href="https://sergio00001.github.io/WebSockets-Chat.Vue"
                    class="leave__chat"
                    @click="$store.dispatch('leaveChat')"
                >Покинуть Чат</a>
                <div
                    class="online__user"
                    v-for="user in $store.state.usersOnline"
                    :key="user.id"
                >
                    <div class="online__indicator"></div>
                    <h4 class="online__name">{{ user.userName }}</h4>
                </div>
            </div>
        </div>
        <div class="chat__area">
            <div class="chat__window">
                <div
                    class="window__message"
                    v-for="mes in $store.state.messages"
                    :key="mes.id"
                >
                    <div
                        class="message__wrapper"
                        v-if="mes.event === 'connection'"
                    >
                        <p class="user__message">В чат зашел: <strong>{{ mes.userName }}</strong></p>
                    </div>
                    <div
                        class="message__wrapper"
                        v-else-if="mes.event === 'close'"
                    >
                        <p class="user__message">Чат покинул: <strong>{{ mes.userName }}</strong></p>
                    </div>
                    <div
                        class="message__wrapper"
                        v-else
                    >
                        <h4 class="user__name">{{ mes.userName }}</h4>
                        <p class="user__message">{{ mes.messageText }}</p>
                    </div>
                </div>
            </div>
            <div class="send__message">
                <form class="message__form">
                    <input
                        v-model="$store.state.messageText"
                        placeholder="Сообщение..."
                        type="text"
                        class="message__input"
                    >
                    <button
                        class="send__btn"
                        type="submit"
                        @click.prevent="$store.dispatch('createMessage')"
                    ><img
                            src="@/assets/send_message.png"
                            alt="send"
                            class="send__img"
                        ></button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="scss">
// both elements
.chat__panel {
    display: flex;
    overflow: hidden;
}


// left-side panel
.all__users {
    width: 25%;
    height: 100vh;
    background-color: rgb(28 29 33);
    border-right: 1px solid black;
}

.leave__chat {
    display: flex;
    justify-content: right;
    padding: 10px;
    color: white;
    transition: all 0.3s ease 0s;
    font-weight: bold;
    font-size: 14px;
}


.online__user {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-right: 8px;
    padding: 15px;
    width: 100%;
    border: 1px solid rgb(216, 216, 216);
    border-left: 0px;
    border-right: 0px;
    border-bottom: 0px;
    color: white;

    &:last-child {
        border-bottom: 1px solid rgb(216, 216, 216);
    }
}

.online__indicator {
    height: 12px;
    width: 12px;
    background-color: greenyellow;
    border: 1px solid greenyellow;
    border-radius: 50%;
    margin-right: 10px;
    box-shadow: 0px 0px 5px 1px greenyellow;
}


// chat panel

.chat__area {
    width: 75%;
    height: 100vh;
}

// chat window
.chat__window {
    background-image: url('@/assets/chat_background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 93%;
    display: flex;
    flex-direction: column-reverse;
    overflow: scroll;
    overflow-x: hidden;
}

.window__message {
    padding-top: 10px;
    padding-left: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    display: flex;
}

.message__wrapper {
    border: 1px solid white;
    padding: 10px 15px;
    border-radius: 17px;
    background-color: white;
}

.user__name {
    color: black;
}

.user__message {
    color: black;
}


// sendMessage Form

.send__message {
    background-color: rgb(28 29 33);
    width: 100%;
    height: 7%;
    bottom: 0;
    border-top: 1px solid rgb(0, 0, 0);
    display: flex;
    align-items: center;
}

.message__form {
    display: flex;
    align-items: center;
}


.message__input {
    background-color: rgba(255, 255, 255, 0);
    color: white;
    outline: none;
    padding-left: 10px;
    border-left: 0px;
    border-right: 0px;
    border-top: 0px;
    border-bottom: 0px solid black;
    transition: all 0.5s ease 0s;
    width: 65vw;
    margin-left: 15px;
    margin-right: 10px;
    font-size: 17px;
    height: 43px;

    &::placeholder {
        transition: all 0.5s ease 0s;
        transform: translate(0px, 0px);
        opacity: 1;
        color: white;
    }

    &:focus::placeholder {
        opacity: 0;
        transform: translate(10px, 0px);
    }
}

.send__btn {
    cursor: pointer;
    padding: 5px;
    color: white;
    border: 0px;
    background-color: rgba(255, 255, 255, 0);
    transition: all 0.5s ease 0s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;

    &:hover {
        width: 60px;
    }
}

.send__img {
    width: 100%;
    height: auto;
}

@media(min-width: 1700px) {
    .leave__chat {
        font-size: 40px;
    }

    .online__name {
        font-size: 50px;
    }

    .online__indicator {
        margin-right: 20px;
        height: 25px;
        width: 25px;
    }

    .message__wrapper {
        border-radius: 25px;
        padding: 15px 25px;
    }

    .user__message {
        font-size: 50px;
    }

    .message__input {
        font-size: 40px;
    }
}

@media(max-width: 768px) {
    .message__input {
        width: 55vw;
    }
}

@media(max-width: 515px) {
    .leave__chat {
        text-align: center;
        justify-content: center;
        font-size: 10px;
        padding-left: 1px;
        padding-right: 1px;
    }

    .online__name {
        font-size: 9px;
    }

    .online__indicator {
        margin-right: 6px;
        height: 5px;
        width: 5px;
    }

    .user__message {
        font-size: 15px;
    }

    .online__user {
        justify-content: center;
        padding: 10px 0px;
    }
}

@media(max-width: 370px) {
    .message__input {
        width: 50vw;
    }

}
</style>