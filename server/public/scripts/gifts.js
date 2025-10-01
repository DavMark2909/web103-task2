const renderGifts = async () => {
    
    const response = await fetch('/events')
    const data = await response.json()
    allGifts = data; // <-- This line is critical!

    // updateGiftList(); // <-- This will render the filtered/sorted list

    const mainContent = document.getElementById('main-content')

    if (data) {

        data.map(gift => {
            const card = document.createElement('div')
            card.classList.add('card')

            const topContainer = document.createElement('div')
            topContainer.classList.add('top-container')

            const bottomContainer = document.createElement('div')
            bottomContainer.classList.add('bottom-container')

            topContainer.style.backgroundImage = `url(${gift.image})`

            const name = document.createElement('h3')
            name.textContent = gift.eventName
            bottomContainer.appendChild(name)

            const pricePoint = document.createElement('p')
            pricePoint.textContent = 'Price: ' + gift.price
            bottomContainer.appendChild(pricePoint)

            const artist = document.createElement('p')
            artist.textContent = 'Artist: ' + gift.artists
            bottomContainer.appendChild(artist)

            const link = document.createElement('a')
            link.textContent = 'Read More'
            link.setAttribute('role', 'button')
            link.href = `/events/${gift.id}`
            bottomContainer.appendChild(link)

            card.appendChild(topContainer)
            card.appendChild(bottomContainer) 
            mainContent.appendChild(card)
        })
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
    }
}

const renderGift = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/events')
    const data = await response.json()
    const giftContent = document.getElementById('gift-content')
    let gift
    gift = data.find(gift => gift.id === requestedID)
    if (gift) {
        document.getElementById('image').src = gift.image
        document.getElementById('name').textContent = gift.eventName
        document.getElementById('pricePoint').textContent = 'Price: ' + gift.price
        document.getElementById('artist').textContent = 'Artist: ' + gift.artists
        document.getElementById('genre').textContent = 'Genre: ' + gift.genre
        document.getElementById('venue').textContent = 'Place: ' + gift.venue
        // document.getElementById('description').textContent = gift.description
        document.title = `Events - ${gift.eventName}`
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        giftContent.appendChild(message)
    }
}


// Add filter and sort controls to the DOM
const controlsContainer = document.createElement('div')
controlsContainer.style.display = 'flex';
controlsContainer.style.justifyContent = 'center';
controlsContainer.style.gap = '20px';
controlsContainer.style.margin = '20px 0';

// Genre filter
const genreSelect = document.createElement('select')
genreSelect.innerHTML = `<option value="">All Genres</option>`
controlsContainer.appendChild(genreSelect)

// Price sort
const sortSelect = document.createElement('select')
sortSelect.innerHTML = `
  <option value="">Sort by Price</option>
  <option value="asc">Price: Low to High</option>
  <option value="desc">Price: High to Low</option>
`

const genres = ['House', 'Rave', 'Hip-Hop'];
genres.forEach(genre => {
  const option = document.createElement('option');
  option.value = genre;
  option.textContent = genre;
  genreSelect.appendChild(option);
});

controlsContainer.appendChild(sortSelect)

document.body.insertBefore(controlsContainer, document.body.querySelector('main'))

let allGifts = []



function updateGiftList() {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''
    let filtered = [...allGifts]
    if (genreSelect.value) {
        filtered = filtered.filter(gift => gift.genre === genreSelect.value)
    }
    if (sortSelect.value === 'asc') {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortSelect.value === 'desc') {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }
    if (filtered.length === 0) {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        mainContent.appendChild(message)
        return
    }
    filtered.map(gift => {
        const card = document.createElement('div')
        card.classList.add('card')

        const topContainer = document.createElement('div')
        topContainer.classList.add('top-container')
        topContainer.style.backgroundImage = `url(${gift.image})`

        const bottomContainer = document.createElement('div')
        bottomContainer.classList.add('bottom-container')

        const name = document.createElement('h3')
        name.textContent = gift.eventName
        bottomContainer.appendChild(name)

        const pricePoint = document.createElement('p')
        pricePoint.textContent = 'Price: ' + gift.price
        bottomContainer.appendChild(pricePoint)

        const artist = document.createElement('p')
        artist.textContent = 'Artist: ' + gift.artists
        bottomContainer.appendChild(artist)

        const genre = document.createElement('p')
        genre.textContent = 'Genre: ' + gift.genre
        bottomContainer.appendChild(genre)


        const link = document.createElement('a')
        link.textContent = 'Read More'
        link.setAttribute('role', 'button')
        link.href = `/events/${gift.id}`
        bottomContainer.appendChild(link)

        card.appendChild(topContainer)
        card.appendChild(bottomContainer)
        mainContent.appendChild(card)
    })
}

genreSelect.addEventListener('change', updateGiftList)
sortSelect.addEventListener('change', updateGiftList)

// renderGifts()

const pathParts = window.location.pathname.split('/').filter(Boolean)

if (pathParts.length === 0) {
    // /gifts
    renderGifts()
} else if (pathParts.length === 2 && pathParts[0] === "events") {
    // /gifts/:id
    renderGift()
} else {
    // everything else
    window.location.href = '../404.html'
}
