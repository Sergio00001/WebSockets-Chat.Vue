import { createStore } from 'vuex'
import socket from '@/socket/socket.js'

export default createStore({
  state: {
    connection: null,
    messages: [],
    usersOnline: [],
    userName: '',
    chatRoom: '',
    messageText: '',
    showBackground: false,
    loginIsEmpty: true,
  },

  getters: {},

  mutations: {
    setOnline(state, arr) {
      state.usersOnline = arr
    },

    setLeave(state, arr) {
      state.usersOnline = arr
    },


    setMessages(state, msg) {
      state.messages.unshift(msg)
      state.messages = [...new Set(state.messages)]
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
      if (state.userName && state.chatRoom && state.userName.length <= 10) {
        state.loginIsEmpty = false
      } else {
        state.loginIsEmpty = true
        if (state.userName.length > 10) {
          state.userName = `long name!`
        }
      }
    },
  },

  // Working with socket requests
  actions: {
    connect({ state, dispatch }) {
      const msg = {
        id: Date.now(),
        event: 'connection',
        userName: state.userName,
        room: state.chatRoom
      }
      dispatch('sendMessage', msg)
    },

    leaveChat({ state, dispatch }) {
      const msg = {
        id: Date.now(),
        event: 'close',
        userName: state.userName,
        room: state.chatRoom
      }
      dispatch('sendMessage', msg)
    },

    createMessage({ state, dispatch }) {
      const msg = {
        id: Date.now(),
        event: 'message',
        userName: state.userName,
        messageText: state.messageText,
        room: state.chatRoom
      }
      dispatch('sendMessage', msg)
    },

    sendMessage({ state }, msg) {
      socket.emit('sendMessage', msg)
      socket.on('allMsg', msg => {
        state.messages.unshift(msg)
      })
      socket.on('join', arr => {
        state.usersOnline = arr
      })
      socket.on('leave', arr => {
        state.usersOnline = arr
      })
      socket.on('message', () => {
        if (state.messageText) {
          state.messages = [...new Set(state.messages)]
          state.messageText = ''
        }
      })
    },
  },
})

