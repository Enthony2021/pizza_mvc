let clientHome = document.querySelector('.client-home')
let mesa = document.querySelector('span').innerHTML
const retornoSom = new Audio('../sounds/somretorno.mp3')


// Mostra carregamento de resposta
const carregando = () => {
    const loading = document.createElement('span')
    loading.classList.add('loading')
    loading.innerHTML = `<p>Loading...</p>`
    clientHome.appendChild(loading)
}


// Envio de Chamada 
document.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (e.target.id === 'cardapio' || 'conta' || 'garcon') {
        const chamadaMesa = await e.target.children[0].value
        const chamadaTipo = await e.target.children[1].innerHTML
        socket.emit('chamada', [chamadaMesa, chamadaTipo])        
    }
})


// Feedback de retorno do administrador
socket.on('retornoAdm', socketData => {
    //Número da mesa vindo do socketData
    const mesaNumber = socketData[1]

    if (mesa == mesaNumber) {
        retornoSom.play()
        const flashMessage = document.createElement('span')
        flashMessage.classList.add('flash-message')
        flashMessage.innerHTML = socketData[0]
        
        carregando()


        setTimeout(() => {
            const loadingBox = document.getElementsByClassName('loading')[0]
            loadingBox.remove()
            clientHome.appendChild(flashMessage)
        }, 1900)

        // Exclui flash message
        setTimeout(() => {
            flashMessage.remove()
        }, 5000)
    }
})