let dragged = null
let countWin = 0

const winCards = [...document.querySelectorAll('.card--stack')]

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


function drop(draggedElement, target){
    const attriDragged = draggedElement.getAttribute('data-card-value')
    const attriTarget = target.getAttribute('data-card-value')
    const isEmpty = attriTarget === null

    const columnOfTarget = target.closest('.column-cards')
    const columnOfDragged = draggedElement.closest('.column-cards')

    const arrayColumnDragged = [...columnOfDragged.children]
    const indexOfDragged = arrayColumnDragged.indexOf(draggedElement)

    const NumAndTypeOfCardDragged = attriDragged.split(' ')
    
    const valueNumDragged = parseInt(NumAndTypeOfCardDragged[0])

    //if target it's a [data-card-empty]
    if (attriTarget === null){
        for(let i = indexOfDragged; i < arrayColumnDragged.length; i++){
            columnOfTarget.appendChild(arrayColumnDragged[i])
        }

        target.classList.add('card-game--empty-hide')
        const confirmCards = columnOfDragged.querySelector('[data-card-value]')

        if(confirmCards === null){
            const emptyPlace = columnOfDragged.querySelector('[data-card-empty]')
            emptyPlace.classList.remove('card-game--empty-hide')
        }  
        
    } else{
        const NumAndTypeOfCardTarget = attriTarget.split(' ')
        
        const valueNumTarget = parseInt(NumAndTypeOfCardTarget[0])
    
        if(valueNumDragged + 1 === valueNumTarget){

            for(let i = indexOfDragged; i < arrayColumnDragged.length; i++){
                columnOfTarget.appendChild(arrayColumnDragged[i])
            }

            const confirmCards = columnOfDragged.querySelector('[data-card-value]')

            if(confirmCards === null){
                const emptyPlace = columnOfDragged.querySelector('[data-card-empty]')
                emptyPlace.classList.remove('card-game--empty-hide')
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

                const confirmCards = columnOfTarget.querySelector('[data-card-value]')
                if(confirmCards === null){
                    const emptyPlace = columnOfTarget.querySelector('[data-card-empty]')
                    emptyPlace.classList.remove('card-game--empty-hide')
                }

                winCards[0].dataset.cardWin = true

                countWin += 1
            }
        }
    } 
}