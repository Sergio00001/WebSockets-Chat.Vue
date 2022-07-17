import { io } from 'socket.io-client'

const options = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket']
}


const socket = io('https://fathomless-gorge-28040.herokuapp.com/', options)

export default socket