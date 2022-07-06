import { createStore } from 'vuex'

export default createStore({
  state: {
    connection: null,
    messages: [],
    connected: false,
    userName: '',
    messageText: '',
    showBackground: false,
    loginIsEmpty: true,
  },
  getters: {
  },
  mutations: {

    startConnection(state) {
      state.connection = new WebSocket('ws://localhost:5000')
    },

    logIn(state) {
      state.connected = true
    },

    logOut(state) {
      state.connected = false
    },

    clearMessage(state) {
      state.messageText = ''
    },

    clearUserName(state) {
      state.userName = ''
    },

    hideLoginBtn(state) {
      state.loginIsEmpty = true
    },

    lazyBackground(state) {
      setTimeout(() => {
        state.showBackground = true
      }, 300);
    },

    loginValidation(state) {
      if (state.userName !== '') {
        state.loginIsEmpty = false
      } else {
        state.loginIsEmpty = true
      }
    }
  },
  actions: {
    startSocket({ state, commit }) {
      commit('startConnection')
      console.log('socket connected');
      state.connection.onopen = () => {
        commit('logIn')
        const message = {
          event: 'connection',
          userName: state.userName,
          id: Date.now()
        }
        state.connection.send(JSON.stringify(message))
        commit('hideLoginBtn')
      }

      state.connection.onmessage = (event) => {
        const message = JSON.parse(event.data)
        state.messages.push(message)
      }

      state.connection.onclose = () => {
        console.log('socket is closed');
      }

      state.connection.onerror = () => {
        console.log('socket has error');
      }
    },

    sendMessage({ state, commit }) {
      const message = {
        userName: state.userName,
        message: state.messageText,
        id: Date.now(),
        event: 'message',
      }
      state.connection.send(JSON.stringify(message))
      commit('clearMessage')
    }
  },
})
