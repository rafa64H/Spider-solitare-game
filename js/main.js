import * as functions from "./functions.js"
functions.newGame()
functions.verifyIfGameSaved()


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

const newGameBtn = document.querySelector('[data-new-game]')

newGameBtn.addEventListener('click', e =>{
    functions.newGame()
})

const openSlotsBtns = document.querySelectorAll('[data-save-load-game]')

openSlotsBtns.forEach(openSlot =>{
    openSlot.addEventListener('click', e =>{
        const saveOrLoad = e.target.getAttribute('data-save-load-game')
        const saveSlotsBox = document.querySelector('[data-slots="save"]')
        const loadSlotsBox = document.querySelector('[data-slots="load"]')

        if(saveOrLoad === 'save'){
            saveSlotsBox.dataset.slotsClosed = 'false'
            if(loadSlotsBox.dataset.slotsClosed === 'false') loadSlotsBox.dataset.slotsClosed = 'true'
        } else{
            loadSlotsBox.dataset.slotsClosed = 'false'
            if(saveSlotsBox.dataset.slotsClosed === 'false') saveSlotsBox.dataset.slotsClosed = 'true'
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

const saveSlots = document.querySelectorAll('[data-save-slot]')

saveSlots.forEach((slot) => {
    slot.addEventListener('click', e => {
        let slotNumber = slot.getAttribute('data-save-slot')
        functions.saveGame(slotNumber)
    })
})

const loadSlots = document.querySelectorAll('[data-load-slot]')

loadSlots.forEach((slot) => {
    slot.addEventListener('click', e => {
        let slotNumber = slot.getAttribute('data-load-slot')
        functions.loadGame(slotNumber)
    })
})