import express from 'express'
import postsRouter from './routes/posts.js'
import connectDB from './config/db.js'
import cors from 'cors'
import { cpus } from 'os'
import cluster from 'cluster'
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Connect to database
connectDB()

// API route
app.use('/api/posts', postsRouter)

app.get('/', (req, res) => {
	res.send('Yay!! Backend of wanderlust app is now accessible ')
})

const nCpus = cpus().length
if (cluster.isPrimary) {
	for (let index = 0; index < nCpus; index++) {
		cluster.fork()
	}
} else {
	app.listen(port, () => {
		console.log(`Server is running on port ${port}, PID: ${process.pid}`)
	})
}

// To respawn new worker when one gets killed
cluster.on('exit', (worker, _, __) => {
	console.log(`Worker ${worker.pid} has been killed`)
	console.log('Starting new worker')
	cluster.fork()
})

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason)
	process.exit(1)
})

export default app
