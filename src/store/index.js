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
    getUsersOnline(state) {
      let getOnline = []
      getOnline = JSON.parse(localStorage.getItem('users'))
      if (getOnline !== null) {
        return state.usersOnline = getOnline
      }
    }
  },
  mutations: {

    startConnection(state) {
      state.connection = new WebSocket('ws://localhost:5000')
    },

    stopConnection(state) {
      localStorage.clear()
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

    getUsersOnline(state, message) {
      if (message !== null) {
        const user = JSON.parse(localStorage.getItem('users'))
        let users = []
        users.push(message)
        if (user !== null) {
          users = [...users, ...user]
        }
        localStorage.setItem('users', JSON.stringify(users))
        users = JSON.parse(localStorage.getItem('users'))
        if (users !== null) {
          state.usersOnline = users
        }
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
        console.log(message);
        commit('getUsersOnline', message.event === 'connection' ? message : null)
        state.messages.unshift(message)
      }

      state.connection.onclose = (event) => {
        console.log(event.data);
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
    },

    closeConnection({ state }) {
      const message = {
        userName: state.userName,
        id: Date.now(),
        event: 'close'
      }
      state.connection.send(JSON.stringify(message))
      console.log(state.usersOnline.shift(message.userName));
    }
  },
})
