import { createStore } from 'vuex'

export default createStore({
  state: {
    connection: null,
    messages: [],
    usersOnline: [],
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

    setOnline(state) {
      state.usersOnline = state.messages.filter(user => user.event === 'connection')
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
    },

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
        state.messages.unshift(message)
        console.log(message);
        commit('setOnline')
        if (message.event === 'close') {
          state.usersOnline = state.usersOnline.filter(user => user.userName !== message.userName)
        }
      }

      state.connection.onclose = () => {
        console.log('socket closed');
      }

      state.connection.onerror = () => {
        console.log('something wrong');
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
    },

    closeConnection({ state }) {
      const message = {
        userName: state.userName,
        id: Date.now(),
        event: 'close'
      }
      state.connection.send(JSON.stringify(message))
    }
  },
})
