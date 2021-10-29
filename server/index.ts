import express, {Request, Response} from 'express'
import http from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { ServerOptions, Server } from 'socket.io'

const app = express()
const next = require('next')
const server = new http.Server(app)

const io = new Server(server, { origins: "*:*" } as Partial<ServerOptions>)
const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

// fake DB
type Messages = {
    chat1: string[],
    chat2: string[],
}

const messages: { [key: string]: string[] } = {
    chat1: [],
    chat2: []
}

// socket.io server
io.on('connection', socket => {
    socket.on('message.chat1', data => {
        messages['chat1'].push(data)
        socket.broadcast.emit('message.chat1', data)
    })
    socket.on('message.chat2', data => {
        messages['chat2'].push(data)
        socket.broadcast.emit('message.chat2', data)
    })
})

nextApp.prepare().then(() => {
    app.use('/api/v1', createProxyMiddleware({
        target: 'http://localhost:8000', 
        pathRewrite: {
            '^/api/v1': '/api/v1'
        },
        changeOrigin: false,
    }))
    
    app.get('/messages/:chat', (req, res) => {
        res.json(messages[req.params.chat])
    })

    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    app.post('*', (req, res) => {
        return nextHandler(req, res)
    })

    app.put('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, "0.0.0.0", () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})
