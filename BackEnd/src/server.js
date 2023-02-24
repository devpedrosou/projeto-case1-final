const app = require('./app')

// escolhendo a porta em que o servidor será aberto
const port = 8520

// abrindo o servidor na porta escolhida
app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}/`)
})