import Card from "./class.js"

const cards1 = [
    [['1', 'clubs'], ['2', 'clubs'], ['3', 'clubs'],
    ['4', 'clubs'], ['5', 'clubs'], ['6', 'clubs'],
    ['7', 'clubs'], ['8', 'clubs'], ['9', 'clubs'],
    ['10', 'clubs'], ['11', 'clubs'], ['12', 'clubs'],
    ['13', 'clubs']],

    [['1', 'diamonds'], ['2', 'diamonds'], ['3', 'diamonds'],
    ['4', 'diamonds'], ['5', 'diamonds'], ['6', 'diamonds'],
    ['7', 'diamonds'], ['8', 'diamonds'], ['9', 'diamonds'],
    ['10', 'diamonds'], ['11', 'diamonds'], ['12', 'diamonds'],
    ['13', 'diamonds']],

    [['1', 'hearts'], ['2', 'hearts'], ['3', 'hearts'],
    ['4', 'hearts'], ['5', 'hearts'], ['6', 'hearts'],
    ['7', 'hearts'], ['8', 'hearts'], ['9', 'hearts'],
    ['10', 'hearts'], ['11', 'hearts'], ['12', 'hearts'],
    ['13', 'hearts']],

    [['1', 'spades'], ['2', 'spades'], ['3', 'spades'],
    ['4', 'spades'], ['5', 'spades'], ['6', 'spades'],
    ['7', 'spades'], ['8', 'spades'], ['9', 'spades'],
    ['10', 'spades'], ['11', 'spades'], ['12', 'spades'],
    ['13', 'spades']]
]
    
const cards2 = [
    [['1', 'clubs'], ['2', 'clubs'], ['3', 'clubs'],
    ['4', 'clubs'], ['5', 'clubs'], ['6', 'clubs'],
    ['7', 'clubs'], ['8', 'clubs'], ['9', 'clubs'],
    ['10', 'clubs'], ['11', 'clubs'], ['12', 'clubs'],
    ['13', 'clubs']],

    [['1', 'diamonds'], ['2', 'diamonds'], ['3', 'diamonds'],
    ['4', 'diamonds'], ['5', 'diamonds'], ['6', 'diamonds'],
    ['7', 'diamonds'], ['8', 'diamonds'], ['9', 'diamonds'],
    ['10', 'diamonds'], ['11', 'diamonds'], ['12', 'diamonds'],
    ['13', 'diamonds']],

    [['1', 'hearts'], ['2', 'hearts'], ['3', 'hearts'],
    ['4', 'hearts'], ['5', 'hearts'], ['6', 'hearts'],
    ['7', 'hearts'], ['8', 'hearts'], ['9', 'hearts'],
    ['10', 'hearts'], ['11', 'hearts'], ['12', 'hearts'],
    ['13', 'hearts']],

    [['1', 'spades'], ['2', 'spades'], ['3', 'spades'],
    ['4', 'spades'], ['5', 'spades'], ['6', 'spades'],
    ['7', 'spades'], ['8', 'spades'], ['9', 'spades'],
    ['10', 'spades'], ['11', 'spades'], ['12', 'spades'],
    ['13', 'spades']]
]

function newGame(){
    const gamePlace = document.querySelector('.game-place')
    const gamePlaceArr = [...gamePlace.children]

    gamePlaceArr.forEach((column, index) => {
        if(index<=1){
            for(let i = 0; i<= 5; i++){
                let attriArr = getValuesForDataAttr(cards1)
                let card = new Card(attriArr[0], attriArr[1], column)
                if(i === 5){
                    card.build()
                }else{
                    card.buildCardBack()
                }
            }
        } 

        else if(index<=3){
            for(let i = 0; i<= 5; i++){
                if(i === 5){
                    let attriArr = getValuesForDataAttr(cards2)
                    let card = new Card(attriArr[0], attriArr[1], column)
                    card.build()
                }else{
                    let attriArr = getValuesForDataAttr(cards1)
                    let card = new Card(attriArr[0], attriArr[1], column)
                    card.buildCardBack()
                }
            }
        }
        
        else{
            for(let i = 0; i<= 4; i++){
                let attriArr = getValuesForDataAttr(cards1)
                let card = new Card(attriArr[0], attriArr[1], column)
                if(i === 4){
                    card.build()
                }else{
                    card.buildCardBack()
                }
            }
        }
    });

    console.log(cards1)
    console.log(cards2)
}

newGame()

const getCardsButton = document.querySelector('.get-cards')

let countWin = 0
let getCardsCount = 5

const winCards = [...document.querySelectorAll('.card--stack')]

export function drop(draggedElement, target){
    const attriDragged = draggedElement.getAttribute('data-card-value')
    const attriTarget = target.getAttribute('data-card-value')
    const isTargetEmpty = target.getAttribute('data-card-empty')

    const columnOfTarget = target.closest('.column-cards')
    const columnOfDragged = draggedElement.closest('.column-cards')

    const arrayColumnDragged = [...columnOfDragged.children]
    const indexOfDragged = arrayColumnDragged.indexOf(draggedElement)

    const arrayColumnTarget = [...columnOfTarget.children]
    const indexOfTarget = arrayColumnTarget.indexOf(target)

    const attriDraggedSplit = attriDragged.split(' ')
    const valueNumDragged = parseInt(attriDraggedSplit[0])

    //if target it's a [data-card-empty]
    if (isTargetEmpty === ''){
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

   if(valueLastTarget === 1/*If last card after drop is an ace*/){
        tryRemovePileOfCards(arrayOfTarget, columnOfTarget)
   }


   const updatedArrColumnDragged = [...columnOfDragged.children]
   const lastCardColumnDragged = updatedArrColumnDragged[updatedArrColumnDragged.length-1]
   const updatedArrColumnTarget = [...columnOfTarget.children]
   const lastCardColumnTarget = updatedArrColumnTarget[updatedArrColumnTarget.length-1]

   if(lastCardColumnDragged.getAttribute('data-card-back') === ''){
        cardBackToCard(lastCardColumnDragged)
   }
   verifyIfDraggable(lastCardColumnDragged, columnOfDragged)
   verifyIfDraggable(lastCardColumnTarget, columnOfTarget)
}

export function tryRemovePileOfCards(arrayOfColumn, column){
   
    const possiblyRemoveCards = []
    
    for(let i = arrayOfColumn.length-2 /*start at ace card index-1*/; i>= 1 /*do not include [data-card-empty]*/; i--){

        let currentCard = arrayOfColumn[i]
        let beforeCard = arrayOfColumn[i+1]

        let attributeCard = currentCard.getAttribute('data-card-value')
        let attributeBefore = beforeCard.getAttribute('data-card-value')
        
        let splitArrayCurrent = attributeCard.split(' ')
        let splitArrayBefore = attributeBefore.split(' ')

        let valueCard = parseInt(splitArrayCurrent[0])
        let valueCardBefore = parseInt(splitArrayBefore[0])

        if(valueCard-1 === valueCardBefore){

            if(valueCardBefore === 1)possiblyRemoveCards.push(beforeCard)
            //If this is removed it wont include ace card

            possiblyRemoveCards.push(currentCard)

            if(valueCard === 13){

                possiblyRemoveCards.forEach(toRemove => {
                    toRemove.remove()
                });

                confirmCards(column)

                winCards[countWin].dataset.cardWin = true

                countWin += 1
                break;
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
        for(let i = arrayColumn.length-2; i>=1; i--){
            let currentCard = arrayColumn[i]
            let beforeCard = arrayColumn[i+1]

            let isCurrentCardBack = currentCard.getAttribute('data-card-back')

            const attributeCurrentCard = currentCard.getAttribute('data-card-value').split(' ')
            const attributeBeforeCard = beforeCard.getAttribute('data-card-value').split(' ')
            
            const beforeCardValue = parseInt(attributeBeforeCard[0])
            const currentCardValue = parseInt(attributeCurrentCard[0])
        
            if( isCurrentCardBack === ''){
                break;
            } 
            
            else if(currentCardValue-1 === beforeCardValue){
                if(arrayColumn.indexOf(beforeCard) === arrayColumn.length-1) beforeCard.setAttribute('draggable', 'true')      
                
                currentCard.setAttribute('draggable', 'true')
            } 
            
            else{
                if(arrayColumn.indexOf(beforeCard) === arrayColumn.length-1) beforeCard.setAttribute('draggable', 'true')      
                for(let j = i; j >= 1; j--){
                    currentCard = arrayColumn[j]
                    currentCard.setAttribute('draggable', 'false')
                }
                break;
            } 
        }
    }

}

export function cardBackToCard(lastCard){
    delete lastCard.dataset.cardBack
    lastCard.setAttribute('draggable', 'true')
}

export function confirmCards(column){
    const verify = column.querySelector('[data-card-value], [data-card-back]')
    const emptyPlace = column.querySelector('[data-card-empty]')
    
    if(verify === null){
        emptyPlace.classList.remove('card-game--empty-hide')
    }
}

export function getMoreCards(){
    if(getCardsCount === 0){

    }else{
        const gamePlace = document.querySelector('.game-place')
        const gamePlaceColumns = [...gamePlace.children]
    
        gamePlaceColumns.forEach(column => {
            let arrayAttributes = getValuesForDataAttr(cards2)
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
}

export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function getValuesForDataAttr(cardsArr){
    const index1 = randomNumber(0, cardsArr.length-1)
    const index2 = randomNumber(0, cardsArr[index1].length-1)

    const arrayValues = cardsArr[index1][index2]

    cardsArr[index1].splice(index2,1)

    if(cardsArr[index1].length === 0) cardsArr.splice(index1, 1)
    return arrayValues
}