document.querySelector('#show-all-cars').addEventListener('click', () => {
    fetch('http://localhost:3000/hot-rides-inventory/api/cars')
        .then(data => data.json())
        .then(data => {
            injectCars(data)
        })

})

document.querySelector('#search').addEventListener('click', () => {
    let searchTerm = document.querySelector('#search-term').value
    let typeOfSearch = document.querySelector('#type-of-earch').value
    fetch(`http://localhost:3000/hot-rides-inventory/api/cars/${typeOfSearch}/${searchTerm}`)
        .then(data => data.json())
        .then(data => {
            injectCars(data)
        })
})

const injectCars = (data) => {
    document.querySelector('#cars').innerHTML = ''
    document.querySelector('#message').innerHTML = ''
    document.querySelector('#sorry-gif').innerHTML = ''
    if(data.length === 0){
        document.querySelector('#message').innerHTML = '<h1 style="text-align: center">Ya know. Theres nothing matching your search</h1>'
        fetch('https://api.giphy.com/v1/gifs/search?q=sorry&api_key=eiP5975LHBU2sYWF2sctF2d04ykiTWFk&limit=1')
        .then(data => data.json())
        .then(data => {
           document.querySelector('#sorry-gif').innerHTML = `<p style="text-align: center"><img src="${data.data[0].images.original.url}"></p>`
           
        })
    }
    for (let i = 0; i < data.length; i++) {
        let carContainer = document.createElement('div')
        let content = `
        <div class="car">
            <h1>${data[i].make}</h1>
            <img src="${data[i].photo}">
        </div>`
        carContainer.innerHTML = content
        document.querySelector('#cars').appendChild(carContainer)
    }
}








