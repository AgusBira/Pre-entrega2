function main(){
    let juegos = [
        {id: 1123 , nombre: "The Legend of Zelda: Breath of the Wild" ,precio: 100,stock:3,categoria:"aventura"},
        {id: 2231 , nombre: "Red Dead Redemption 2" ,precio: 100,stock:3,categoria:"aventura"},
        {id: 3334 , nombre: "Call of Duty" ,precio: 120,stock:3,categoria:"shooter"},
        {id: 4516 , nombre: "NBA 2K25" ,precio: 120,stock:3,categoria:"deportes"},
        {id: 1010 , nombre: "Cities: Skylines" ,precio: 80,stock:3,categoria:"simulacion"},
        {id: 1231 , nombre: "Doom Eternal" ,precio: 80,stock:3,categoria:"shooter"},
        {id: 1246 , nombre: "Farming Simulator 25" ,precio: 60,stock:3,categoria:"simulacion"},
        {id: 1241 , nombre: "The Legend of Zelda: Tears of the Kingdom" ,precio: 120,stock:3,categoria:"tecnologia"}
        ]
    let menu = Number(prompt("BIENVENIDO A LA TIENDA DE VIDEOJUEGOS\n"+ "-----------------------------------\n" + "Que le gustaria hacer??\n" + "1 - Comprar\n" + "2 - Salir"))
    let carrito = []
    while (menu != 2) {
        if(menu === 1 ){
            let id = Number(prompt("SELECCIONE EL JUEGO QUE DESEA COMPRAR POR ID:\n" +  "-----------------------------------\n" + mostrarJuegos(juegos)+ "\n" +"-----------------------------------\n"+"1 - Ver carrito\n" + "2 - Salir\n" + "3 - Comprar\n" + "4 - Filtrar por categoria"))   
            while (id !== 2){
                agregarCarrito(juegos,id,carrito)
                let nombresJuegos = carrito.map((juego) => {return[juego.nombre]})
                id = Number(prompt("SELECCIONE EL JUEGO QUE DESEA COMPRAR POR ID:\n" +  "-----------------------------------\n" + mostrarJuegos(juegos)+ "\n" +"-----------------------------------\n"+"1 - Ver carrito\n" + "2 - Salir\n" + "3 - Comprar\n" + "4 - Filtrar por categoria"))    
                if(id === 1){
                    if(carrito.length === 0){
                        alert("No hay juegos en su carrito aun")
                    }else{
                        alert("SUS JUEGOS EN EL CARRITO SON:\n" + nombresJuegos.join("\n"))
                    }
                }else if(id === 3){
                    if(carrito.length === 0){
                        alert("Su carrito")
                    }else{
                        prompt("SUS JUEGOS EN EL CARRITO SON:\n" + nombresJuegos.join("\n") + "\n"+"-----------------------------------\n" + "El total de su compra es: "+ "$" + precioTotal(carrito) +  "\n" + "-----------------------------------\n" + "Desea comprar??\n" + "1 - Comprar\n" + "2 - No comprar")
                    }
                    
                }

            }
        }
        menu = Number(prompt("BIENVENIDO A LA TIENDA DE VIDEOJUEGOS\n"+ "-----------------------------------\n" + "Que le gustaria hacer??\n" + "1 - Comprar\n" + "2 - Salir"))
    } 
}
let mostrarJuegos = (juegos) =>{
    let filtro = juegos.map((juego) => {return[
        juego.nombre + " " + "ID: "+juego.id 
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
main()