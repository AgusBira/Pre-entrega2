function main(){
    let juegos = [
        {id: 1123 , nombre: "The Legend of Zelda: Breath of the Wild" ,precio: 100,stock:3,categoria:"aventura",console: "Nintendo Switch" , rutaimg: "tloztotk.jpg"},
        {id: 2231 , nombre: "Red Dead Redemption 2" ,precio: 100,stock:3,categoria:"aventura",console: "PC/PS5/XBOX",rutaimg:"rdr2.jpeg"},
        {id: 3334 , nombre: "Call of Duty: Black ops 6" ,precio: 120,stock:3,categoria:"shooter",console: "PC/PS5/XBOX",rutaimg:"codbo6.jpg"},
        {id: 4516 , nombre: "NBA 2K25" ,precio: 120,stock:3,categoria:"deportes",console: "PC/PS5/XBOX",rutaimg:"nba2k25.jpg"},
        {id: 1010 , nombre: "Cities: Skylines" ,precio: 80,stock:3,categoria:"simulacion",console: "PC/PS5/XBOX",rutaimg:"citiesskylines.jpg"},
        {id: 1231 , nombre: "Doom Eternal" ,precio: 80,stock:3,categoria:"shooter",console: "PC/PS5/XBOX",rutaimg:"doometernal.jpeg"},
        {id: 1246 , nombre: "Farming Simulator 25" ,precio: 60,stock:3,categoria:"simulacion",console: "PC/PS5/XBOX",rutaimg:"farmsimulator25.jpg"},
        {id: 1241 , nombre: "The Legend of Zelda: Tears of the Kingdom" ,precio: 120,stock:3,categoria:"aventura",console: "Nintendo Switch", rutaimg: "tlozbotw.jpeg"}
        ]
    let categorias = ["Aventura","Shooter","Deportes","Simulacion"]
    let carrito = []
}
let mostrarJuegos = (juegos) =>{
    let filtro = juegos.map((juego) => {return[
        juego.nombre + " " + "ID: "+juego.id + " (Stock: " + juego.stock+ ")"
    ]})
    return filtro.join("\n")
}
let agregarCarrito = (juegos,id, carrito) =>{
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
}
main()

