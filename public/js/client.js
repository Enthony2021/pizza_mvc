// Envio de Chamada 
document.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (e.target.id === 'cardapio' || 'conta' || 'garcon') {
        const chamadaMesa = await e.target.children[0].value
        const chamadaTipo = await e.target.children[1].innerHTML
        socket.emit('chamada', [chamadaMesa, chamadaTipo])
    }

})