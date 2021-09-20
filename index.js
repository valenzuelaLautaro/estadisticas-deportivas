const fs = require('fs')

const archivo = (nombre, delimitador) => {
  const contenido = fs.readFileSync(nombre).toString()
  return contenido.split(delimitador)
}

const equipoA = archivo('basket/equipo-A.txt', '\n')
const equipoB = archivo('basket/equipo-B.txt', '\n')
const partido = archivo('basket/partido.log', '\n')

// {
//   apellido o nombre: puntos,
//   apellido o nombre: puntos
// }
const puntosEquipo = (registro, equipo) => {
  const registroEquipo = registro.filter(anotacion => {
    // "APELLIDO,TIPO"
    let apellido = anotacion.split(',')[0]
    let apellidos = equipo.map(nombreCompleto => nombreCompleto.split(" ")[1])
    
    return apellidos.includes(apellido)
  })

  const puntos = {}
  let total = 0
  registroEquipo.forEach(anotacion => {
    const apellido = anotacion.split(",")[0] 
    let tanto = anotacion.split(",")[1]
    tanto = (tanto === 'DOBLE') ? 2 : 3
    puntos[apellido] = puntos[apellido] || 0
    puntos[apellido] += tanto // puntos[apellido] = puntos[apellido] + tanto
    total += tanto
  })

  return {
    total,
    puntos
  }
}

const puntosEquipoA = puntosEquipo(partido, equipoA)
const puntosEquipoB = puntosEquipo(partido, equipoB)

console.log(puntosEquipoA, puntosEquipoB)

const puntosB = (puntos) => {
  return puntos.total
}
const puntosA = (puntos) => {
  return puntos.total
}

const resultadoFinal = () => {
  const resultado = {
    equipoA : puntosA(puntosEquipoA),
    equipoB : puntosB(puntosEquipoB)
  }
  return 'Equipo A ' + resultado.equipoA + ' vs ' + resultado.equipoB + ' Equipo B'
}
console.log(resultadoFinal())

const goleador = () => {
  let masPuntos = 0
  for(let jugador in puntosEquipoA.puntos){
    if(jugador > masPuntos){
      masPuntos = jugador
    }
  }
  for(let jugador in puntosEquipoB.puntos){
    if(jugador > masPuntos){
      masPuntos = jugador
    }
  }
  return masPuntos
}


const distribucionDePuntaje = (registro) => {
  let dobles = 0
  let triples = 0
  registro.forEach(anotacion => {
    let tanto = anotacion.split(',')[1]
    if(tanto === 'TRIPLE'){
      triples++
    } else if (tanto === 'DOBLE'){
      dobles++
    }
  })
  return {
    triples, dobles
  }
}
const distribucionPartido = distribucionDePuntaje(partido)
console.log('Triples: ' + distribucionPartido.triples + '. Dobles: ' + distribucionPartido.dobles + '.')

