const fs = require('fs')

const archivo = (nombre, delimitador) => {
  const contenido = fs.readFileSync(nombre).toString()
  return contenido.split(delimitador)
}

const equipoA = archivo('basket/equipo-A.txt', '\n')
const equipoB = archivo('basket/equipo-B.txt', '\n')
const partido = archivo('basket/partido.log', '\n')

const puntosEquipo = (registro, equipo) => {
  const registroEquipo = registro.filter(anotacion => {
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

const puntos = (equipo) => {
  return equipo.total
}
const resultadoFinal = (equipo1, equipo2) => {
  const resultado = {
    equipoA : puntos(equipo1),
    equipoB : puntos(equipo2)
  }
  return resultado
}
console.log(resultadoFinal(puntosEquipoA, puntosEquipoB))

const goleador = () => {
  let masPuntos = 0
  let jugador
  const valoresA = Object.entries(puntosEquipoA.puntos)
  const valoresB = Object.entries(puntosEquipoB.puntos)

  for(let i = 0; i < valoresA.length; i++){
    if(valoresA[i][1] > masPuntos){
      masPuntos = valoresA[i][1]
      jugador = valoresA[i][0]
    }
  }
  for(let i = 0; i < valoresA.length; i++){
    if(valoresB[i][1] > masPuntos){
      masPuntos = valoresB[i][1]
      jugador = valoresB[i][0]
    }
  }
  return 'Goleador del partido: ' + jugador + ' con ' + masPuntos + ' puntos.'
}
console.log(goleador())

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
  return 'Triples: ' + triples + '. Dobles: ' + dobles
}
const distribucionPartido = distribucionDePuntaje(partido)
console.log(distribucionPartido)