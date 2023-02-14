import Card from "./class.js"

let dragged = null
let countWin = 0

const winCards = [...document.querySelectorAll('.card--stack')]

const getCardsButton = document.querySelector('.get-cards')
let getCardsCount = 5

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
        drop(dragged, e.target)
    }
})

getCardsButton.addEventListener('click', e =>{
    if(getCardsCount === 0){

    }else{
        const gamePlace = document.querySelector('.game-place')
        const gamePlaceColumns = [...gamePlace.children]
    
        gamePlaceColumns.forEach(column => {
            let arrayAttributes = getValuesForDataAttr()
            let newCard = new Card(arrayAttributes[0], arrayAttributes[1], column)
            if(column.querySelector('[data-card-value]') === null){
                column.querySelector('[data-card-empty]').classList.add('card-game--empty-hide')
            }
            newCard.build()
        });
        getCardsCount -= 1
    }
    if(getCardsCount === 0){
        getCardsButton.dataset.getCards = 'false'
    }
    
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

function drop(draggedElement, target){
    const attriDragged = draggedElement.getAttribute('data-card-value')
    const attriTarget = target.getAttribute('data-card-value')

    const columnOfTarget = target.closest('.column-cards')
    const columnOfDragged = draggedElement.closest('.column-cards')

    const arrayColumnDragged = [...columnOfDragged.children]
    const indexOfDragged = arrayColumnDragged.indexOf(draggedElement)

    const arrayColumnTarget = [...columnOfTarget.children]
    const indexOfTarget = arrayColumnTarget.indexOf(target)

    const attriDraggedSplit = attriDragged.split(' ')
    
    const valueNumDragged = parseInt(attriDraggedSplit[0])

    //if target it's a [data-card-empty]
    if (attriTarget === null){
        if(indexOfTarget === arrayColumnTarget.length-1){
            for(let i = indexOfDragged; i < arrayColumnDragged.length; i++){
                columnOfTarget.appendChild(arrayColumnDragged[i])
            }
    
            target.classList.add('card-game--empty-hide')
            confirmCards(columnOfDragged)            
        }

        
    } else{
        if(indexOfTarget === arrayColumnTarget.length-1){
            const attriTargetSplit = attriTarget.split(' ')
        
            const valueNumTarget = parseInt(attriTargetSplit[0])
        
            if(valueNumDragged + 1 === valueNumTarget){
    
                for(let i = indexOfDragged; i < arrayColumnDragged.length; i++){
                    columnOfTarget.appendChild(arrayColumnDragged[i])
                }
    
                confirmCards(columnOfDragged)
            }
        }
   }

   const arrayOfTarget = [...columnOfTarget.children]
   const attributeLastTarget = arrayOfTarget[arrayOfTarget.length-1].getAttribute('data-card-value')
   const splitAttributeLastTarget = attributeLastTarget.split(' ')
   const valueLastTarget = parseInt(splitAttributeLastTarget[0])

   if(valueLastTarget === 1){
        tryRemovePileOfCards(arrayOfTarget, columnOfTarget)
   }


   const updatedArrColumnDragged = [...columnOfDragged.children]
   const lastCardColumnDragged = updatedArrColumnDragged[updatedArrColumnDragged.length-1]
   if(lastCardColumnDragged.getAttribute('data-card-back') === ''){
        cardBackToCard(lastCardColumnDragged)
   }
   verifyIfDraggable(lastCardColumnDragged, columnOfDragged)

}

function tryRemovePileOfCards(arrayOfTarget, columnOfTarget){
   
    const possiblyRemoveCards = []
    
    for(let i = arrayOfTarget.length -2; i>= 1; i--){

        let currentCard = arrayOfTarget[i]
        let beforeCard = arrayOfTarget[i+1]

        let attributeCard = currentCard.getAttribute('data-card-value')
        let attributeBefore = beforeCard.getAttribute('data-card-value')
        
        let splitArrayCurrent = attributeCard.split(' ')
        let splitArrayBefore = attributeBefore.split(' ')

        let valueCard = parseInt(splitArrayCurrent[0])
        let valueCardBefore = parseInt(splitArrayBefore[0])

        if(valueCard-1 === valueCardBefore){

            if(valueCardBefore === 1)possiblyRemoveCards.push(beforeCard)
            possiblyRemoveCards.push(currentCard)

            if(valueCard === 13){

                possiblyRemoveCards.forEach(toRemove => {
                    toRemove.remove()
                });

                confirmCards(columnOfTarget)

                winCards[0].dataset.cardWin = true

                countWin += 1
            }
        }
    } 
}


export function verifyIfDraggable(lastCard,column){
    const arrayColumn = [...column.children]
    const beforeLastCard = arrayColumn[arrayColumn.indexOf(lastCard)-1]
    
    if(lastCard.getAttribute('data-card-empty') === ''){
    } 
    
    else if(beforeLastCard.getAttribute('data-card-value') === null){
        lastCard.setAttribute('draggable', 'true')   
    } 

    else{
        const attributeLastCard = lastCard.getAttribute('data-card-value').split(' ')
        const attributeBeforeLastCard = beforeLastCard.getAttribute('data-card-value').split(' ')
        
        const beforeLastCardValue = parseInt(attributeBeforeLastCard[0])
        const lastCardValue = parseInt(attributeLastCard[0])
    
        if(beforeLastCardValue <= lastCardValue){
    
            for(let i = 0; i<arrayColumn.indexOf(lastCard); i++){
                if(arrayColumn[i].getAttribute('data-card-empty') === ''){}
                arrayColumn[i].setAttribute('draggable', 'false')
            }
        }else{
            arrayColumn.forEach(card => {
                card.setAttribute('draggable', 'true')
            });       
        }
    }

}

function cardBackToCard(lastCard){
    const arrayAttributes = getValuesForDataAttr()
    const toDataAttribute = arrayAttributes.join(' ')

    delete lastCard.dataset.cardBack
    lastCard.dataset.cardValue = toDataAttribute
    lastCard.setAttribute('draggable', 'true')
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getValuesForDataAttr(){
    const valueCard = String(randomNumber(1,13))
    let typeCard = randomNumber(1,4)

    switch(typeCard){
        case 1: typeCard = 'clubs'
        break;
        case 2: typeCard = 'diamonds'
        break; 
        case 3: typeCard = 'hearts' 
        break;
        case 4: typeCard = 'spades'
    }

    const arrayValues = [valueCard, typeCard]
    return arrayValues
}

function confirmCards(column){
    const verify = column.querySelector('[data-card-value], [data-card-back]')
    const emptyPlace = column.querySelector('[data-card-empty]')
    
    if(verify === null){
        emptyPlace.classList.remove('card-game--empty-hide')
    }
}
/*
const hola = document.querySelector('.column-cards')

let carta = new Card('','',hola)

carta.buildCardBack()

let cartaNueva = new Card('2', 'spades', hola)

cartaNueva.build()*/