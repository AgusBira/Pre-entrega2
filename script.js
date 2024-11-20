function main(){
    let juegos = [
        {id: 1123 , nombre: "The Legend of Zelda: Breath of the Wild" ,precio: 100,stock:3,categoria:"aventura",console: "Nintendo Switch" , rutaimg: "img/tloztotk.jpg"},
        {id: 2231 , nombre: "Red Dead Redemption 2" ,precio: 100,stock:3,categoria:"aventura",console: "PC/PS5/XBOX",rutaimg:"img/rdr2.jpeg"},
        {id: 3334 , nombre: "Call of Duty: Black ops 6" ,precio: 120,stock:3,categoria:"shooter",console: "PC/PS5/XBOX",rutaimg:"img/codbo6.jpg"},
        {id: 4516 , nombre: "NBA 2K25" ,precio: 120,stock:3,categoria:"deportes",console: "PC/PS5/XBOX",rutaimg:"img/nba2k25.jpg"},
        {id: 1010 , nombre: "Cities: Skylines" ,precio: 80,stock:3,categoria:"simulacion",console: "PC/PS5/XBOX",rutaimg:"img/citiesskylines.jpg"},
        {id: 1231 , nombre: "Doom Eternal" ,precio: 80,stock:3,categoria:"shooter",console: "PC/PS5/XBOX",rutaimg:"img/doometernal.jpeg"},
        {id: 1246 , nombre: "Farming Simulator 25" ,precio: 60,stock:3,categoria:"simulacion",console: "PC/PS5/XBOX",rutaimg:"img/farmsimulator25.jpg"},
        {id: 1241 , nombre: "The Legend of Zelda: Tears of the Kingdom" ,precio: 120,stock:3,categoria:"aventura",console: "Nintendo Switch", rutaimg: "img/tlozbotw.jpeg"}
        ]
    let categorias = ["Aventura","Shooter","Deportes","Simulacion"]
    let carrito = []
    crearTarjetaJuegos(juegos)


    let botonesAgregarProductos = document.getElementsByClassName("botonAgregarCarrito")
    for (const boton of botonesAgregarProductos) {
        boton.addEventListener("click",(e) => agregarJuegoCarrito(e,juegos,carrito))
    }    
    



}
let crearTarjetaJuegos = (juegos) =>{
    let containerJuegos = document.getElementById("container-juegos")
    juegos.forEach((juego) =>{
        let unidades = "Unidades: "+ juego.stock
        if(juego.stock === 0){
            unidades = "No hay stock"
        }
        containerJuegos.innerHTML += `<div class = "container__juegos__tarjeta">
            <div class = "container__img"><img src=${juego.rutaimg} alt=${juego.nombre}></div>
            <div class ="container__juegos__tarjeta__info">
                <h2>${juego.nombre}</h2>
                <p>${juego.console}</p>
                <p>${unidades}</p>
                <h3>$${juego.precio}</h3>
            </div>
            <div class = "container__juegos__tarjeta__botoncontainer"><button class = "botonAgregarCarrito" id =${juego.id}>Agregar al carrito</button></div>
        </div>`
    })

}

let agregarJuegoCarrito = (e,juegos,carrito) =>{
    let id = Number(e.target.id)
    let juegoOriginal = juegos.find((juego) => juego.id === id)
    let indiceCarrito = carrito.findIndex((juego) => juego.id === id)
    if (indiceCarrito === -1){
        carrito.push({
            id: juegoOriginal.id,
            nombre: juegoOriginal.nombre,
            precio:juegoOriginal.precio,
            unidades: 1

        })
    }else{
        juegoOriginal.stock = juegoOriginal.stock - 1
        if(juegoOriginal.stock !== 0){
            carrito[indiceCarrito].unidades++
        }
    }
    console.log(carrito)
}

/* let agregarCarrito = (juegos,id, carrito) =>{
        if(juegos.some((juego) => juego.id === id)){
            juegos.forEach(juego => {
                if(juego.id === id && juego.stock > 0){
                    carrito.push(juego)
                    juego.stock = juego.stock -1
                } else if (juego.stock === 0){
                    return alert("No hay mas stock de ese videojuego")
                }
            });
        }
        return carrito
}
let precioTotal = (carrito) => {
    sumaTotal = 0
    carrito.forEach((juego) => {
        sumaTotal = sumaTotal + juego.precio
    })
    return sumaTotal
}
let filtrarCategorias = (catIngresada,juegos) =>{
    let juegosFiltrados = juegos.filter((juego) => juego.categoria === catIngresada )
    let nombreJuegosFiltrados = juegosFiltrados.map((juego) => juego.nombre)
    return nombreJuegosFiltrados
} */
main()
