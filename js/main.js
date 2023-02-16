
import * as functions from "./functions.js"

let dragged = null

const getCardsButton = document.querySelector('.get-cards')

document.addEventListener('dragstart', e=>{
    if(e.target.matches('[data-card-value]')){
        dragged = e.target
    }
})

document.addEventListener('dragend', e=>{
    if(e.target.matches('[data-card-value]')){
        
    }
})

document.addEventListener('dragover', e=>{
    if(e.target.matches('[data-card-value]') || e.target.matches('[data-card-empty]')){
        e.preventDefault()
    }
})

document.addEventListener('drop', e=>{
    if(e.target.matches('[data-card-value]') || e.target.matches('[data-card-empty]')){
        e.preventDefault()
        functions.drop(dragged, e.target)
    }
})

getCardsButton.addEventListener('click', e =>{

    functions.getMoreCards()
    
})

const openSlotsBtns = document.querySelectorAll('[data-save-load-game]')

openSlotsBtns.forEach(openSlot =>{
    openSlot.addEventListener('click', e =>{
        const saveOrLoad = e.target.getAttribute('data-save-load-game')
        const saveSlotsBox = document.querySelector('[data-slots="save"]')
        const loadSlotsBox = document.querySelector('[data-slots="load"]')

        if(saveOrLoad === 'save'){
            if(loadSlotsBox.dataset.slotsClosed === 'true') saveSlotsBox.dataset.slotsClosed = 'false'
        } else{
            if(saveSlotsBox.dataset.slotsClosed === 'true') loadSlotsBox.dataset.slotsClosed = 'false'
        }
    })

})

const closeSlotsBtns = document.querySelectorAll('[data-close-slots]')

closeSlotsBtns.forEach(closeSlot =>{
    closeSlot.addEventListener('click', e =>{
        const closestSlotsBox = closeSlot.closest('[data-slots]')
        closestSlotsBox.dataset.slotsClosed = 'true'
    })
})


/*
const hola = document.querySelector('.column-cards')

let carta = new Card('3','spades',hola)

carta.buildCardBack()

let cartaNueva = new Card('2', 'spades', hola)

cartaNueva.build()
*/
