import { createStore } from 'vuex'

export default createStore({
  state: {
    connection: null,
    messages: [],
    connected: false,
    userName: '',
    messageText: ''
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
      state.userName = state.messageText = ''
    }
  },
  actions: {
    startSocket({ state, commit }) {
      commit('startConnection')
      console.log(state.connection);
      state.connection.onopen = () => {
        commit('logIn')
        const message = {
          event: 'connection',
          userName: state.userName,
          id: Date.now()
        }
        state.connection.send(JSON.stringify(message))
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
