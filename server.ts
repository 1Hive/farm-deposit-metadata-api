import express from 'express'

const app = express()

app.use('/api/metadata/xdai', require('./routes/xdai'))
app.use('/api/metadata/polygon', require('./routes/polygon'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))