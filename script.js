const apiKey = '854327abb74c64f7f6e897858d40d1db'
const language = 'es'
const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
const diferenciaKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        peticionDatosClima(ciudad)
    }
});

function peticionDatosClima(ciudad){
    // peticion a la api clima 
    fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}&lang=${language}`)
        .then(response => response.json())
        .then(response => mostrarDatosClima(response))
}

function mostrarDatosClima(response){
    // seleccionar div de datosClima y borrar contenido
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''

    // obtener datos
    const ciudad = response.name
    const pais = response.sys.country
    const temperatura = Math.round(response.main.temp - diferenciaKelvin)
    const descripcion = response.weather[0].description
    const humedad = response.main.humidity
    const icono = response.weather[0].icon

    // crear elementos en div de datosClima y mostrar elementos
    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudad}, ${pais}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `Temperatura actual: ${temperatura}º C`

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad actual: ${humedad}%`

    const iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `Descripción meteorológica: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconInfo)
    divDatosClima.appendChild(descripcionInfo)

}