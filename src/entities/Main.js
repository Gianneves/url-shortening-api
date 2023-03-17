const input = document.querySelector('input')
const btn = document.querySelector('#button-url')


function createUrlShortlyCard(urlLink) {

    if (input.value === '') {
        input.classList.add('error-message')
        document.getElementById('errorText').innerText = 'Please add a link'

    } else {
        const card = document.createElement('div')
        card.classList.add('url-card')

        const anchor = document.createElement('a')
        anchor.classList.add('anchor-style')
        anchor.textContent = `${urlLink.result.full_short_link}`

        const btn = document.createElement('button')
        btn.innerText = 'Copy'
        btn.classList.add('short-square-btn')
    
        
        card.append(anchor, btn)
        document.querySelector('#url-links').append(card)
        clearHistory()

        input.value = ''

        btn.addEventListener('click', () => {

            if(btn.innerText === 'Copy') {
                btn.innerText = 'Copied!'
                btn.classList.add('success')
                navigator.clipboard.writeText(`${urlLink.result.full_short_link}`)
            } else {
                btn.innerText = 'Copy'
                btn.remove('success')
            }
        })
    }

    
}

function clearHistory() {
    document.querySelector('.link-to-remove').style.display = "block"
    document.querySelector('.link-to-remove').addEventListener('click', () => {
        document.querySelector('.url-card').remove()
        document.querySelector('.link-to-remove').style.display = "none"
    })
}

async function getUrlLinks() {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    const urlLink = await response.json({
        "ok": true,
        "result": {
            "code": "KCveN",
            "short_link": "shrtco.de/KCveN",
            "full_short_link": "https://shrtco.de/KCveN",
            "short_link2": "9qr.de/KCveN",
            "full_short_link2": "https://9qr.de/KCveN",
            "share_link": "shrtco.de/share/KCveN",
            "full_share_link": "https://shrtco.de/share/KCveN",
            "original_link": `${input.value}`
        }
    })
    createUrlShortlyCard(urlLink)
}

btn.addEventListener('click', () => {
    getUrlLinks()
})