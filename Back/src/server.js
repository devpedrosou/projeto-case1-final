const app = require('./app.js')

const port = 6808


app.listen(port,  ()=>{

    console.log(`Server rodando em http://localhost:${port}/`)
})