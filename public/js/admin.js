let dashboard = document.querySelector('.dashboard')
let audioChamada = new Audio('../sounds/somchamada.mp3')
// _________________________________________________
// Funções de base e reutilizáveis

// Imprime chamadas
const imprimeChamada = (mesa, tipo, id) => {
    let boxChamada = document.createElement('div')
    let lixeira = document.createElement('div')
    let chamada = document.createElement('div')

    boxChamada.classList.add('chamadas-box')
    boxChamada.classList.add(`${mesa}`)
    lixeira.classList.add('excluir-chamada')
    lixeira.innerHTML = `<img src='../img/trash.png' class='lixeira-icon ${id}'>`
    chamada.classList.add('chamada')

    dashboard.appendChild(boxChamada)
    boxChamada.appendChild(chamada)
    boxChamada.appendChild(lixeira)

    chamada.innerHTML = `${mesa} - ${tipo}`
}

// Cria Id
const criaId = (min, max) => {
    const pre = Math.floor(Math.random() * 1000000000)
    const pro = Math.floor(Math.random() * 1000000000)
    const id = `${pre}${pro}`

    return id
}
// _________________________________________________________


// Persistir dados no localStorage
// Recupera Informações chamadas localStorage
const dataChamadas = JSON.parse(localStorage.getItem('data')) || []
console.log(dataChamadas)

// Imprime chamadas já salvas na tela na tela
dataChamadas.forEach((chamada) => {
    imprimeChamada(chamada.mesa, chamada.tipo, chamada.id)
})

// Função que salva as chamadas
const salveData = (mesa, tipo, id) => {
    const data = {
        id,
        mesa,
        tipo
    }

    // Verifica a duplicação de chamadas
    for (let i = 0; i < dataChamadas.length; i++) {
        const chamada = dataChamadas[i]
        if (chamada.mesa === data.mesa && chamada.tipo === data.tipo) {
            return false
        }
    }

    // Salva a chamada no localStorage
    dataChamadas.push(data)
    localStorage.setItem('data', JSON.stringify(dataChamadas))
    return true
}


// Recebimento de Chamada
socket.on('chamadaCli', socketData => {
    const id = criaId()
    const mesa = socketData[0]
    const tipo = socketData[1]

    const acao = salveData(mesa, tipo, id)

    if (acao === true) {
        imprimeChamada(mesa, tipo, id)
        audioChamada.play()
        socket.emit('retorno', ['Solicitação ENVIADA! Aguarde atendimento.', mesa])
    } else {
        socket.emit('retorno', ['Solicitação JÁ ENVIADA! Aguarde atendimento.', mesa])
    }
})


// Exlusão de chamada
document.addEventListener('click', (e) => {
    const lixeiraId = e.target.classList[1]
    let indexDelete = -1

    // Acha a chamada à excluir pelo Id
    for (let i = 0; i < dataChamadas.length; i++) {
        const chamadaId = dataChamadas[i].id
        if (lixeiraId == chamadaId) {
            indexDelete = dataChamadas.indexOf(dataChamadas[i])
        }
    }

    // Deleta a chamada pelo Id
    if (indexDelete > -1) {
        dataChamadas.splice(indexDelete, 1)
        localStorage.setItem('data', JSON.stringify(dataChamadas))
        e.target.parentNode.parentNode.remove()
    }



})