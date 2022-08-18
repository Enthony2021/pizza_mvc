let dashboard = document.querySelector('.dashboard')

// Recebimento de Chamada
socket.on('chamadaCli', socket => {
    const mesa = socket[0]
    const tipo = socket[1]
    console.log(typeof mesa, typeof tipo)


    let boxChamada = document.createElement('div')
    let lixeira = document.createElement('div')
    let chamada = document.createElement('div')

    boxChamada.classList.add('chamadas-box')
    lixeira.classList.add('excluir-chamada')
    chamada.classList.add('chamada')

    dashboard.appendChild(boxChamada)
    boxChamada.appendChild(chamada)
    boxChamada.appendChild(lixeira)

    chamada.innerHTML = `Mesa ${mesa}: Solicitando ${tipo}`
})