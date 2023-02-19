import Card from "./class.js"

let countWin = 0
let getCardsCount = 5

const winCards = [...document.querySelectorAll('.card--stack')]
const getCardsButton = document.querySelector('.get-cards')


let cards1 = []
    
let cards2 = []

export function newGame(){
    const allCards = document.querySelectorAll('.card-game:not([data-card-empty])')
    allCards.forEach(card =>{
        card.remove()
    })

    countWin = 0
    getCardsCount = 5
    getCardsButton.dataset.getCards = true

    winCards.forEach(winCard => {
        delete winCard.dataset.cardWin
    });

    cards1 = [
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

    cards2 = [
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
}

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

                if(currentCard.getAttribute('data-card-back') === '') break;

                possiblyRemoveCards.forEach(toRemove => {
                    toRemove.remove()
                });

                arrayOfColumn = [...column.children]
                const lastCardAfterRemove = arrayOfColumn[arrayOfColumn.length-1]
                if(lastCardAfterRemove.getAttribute('data-card-back') === '') delete lastCardAfterRemove.dataset.cardBack

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
    
    else{
        for(let i = arrayColumn.length-2; i>=1; i--){
            let currentCard = arrayColumn[i]
            let beforeCard = arrayColumn[i+1]
            if(i === arrayColumn.length-2){
                if(currentCard.getAttribute('data-card-back') === ''){
                    beforeCard.setAttribute('draggable', 'true')
                    break;
                }
            }

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

export function saveGame(slot){
    const columns = [...document.querySelector('.game-place').children]
    const arrayCardsSaved = [[], [], [], [], [], [], [], [], [], []]
    columns.forEach((column, index) => {
        const cards = [...column.querySelectorAll('.card-game:not([data-card-empty])')]
        
        cards.forEach((card,index2) =>{
            let cardValue = card.getAttribute('data-card-value')
            let isCardBack = card.getAttribute('data-card-back')
            let arrayCardValue = cardValue.split(' ')
            arrayCardValue.push(isCardBack)
            arrayCardsSaved[index].push(arrayCardValue)    
        })
    });

    localStorage.setItem(`slot${slot}Cards`, JSON.stringify(arrayCardsSaved))
    localStorage.setItem(`slot${slot}CountWin`, JSON.stringify(countWin))
    localStorage.setItem(`slot${slot}GetCards`, JSON.stringify(getCardsCount))
    localStorage.setItem(`slot${slot}Cards2`, JSON.stringify(cards2))

    verifyIfGameSaved()
}

export function loadGame(slot){
    let verify = parseInt(localStorage.getItem(`slot${slot}CountWin`))

    if(isNaN(verify)){
        const noSaveMessage = document.querySelector('[data-no-save-msg-show]')

        noSaveMessage.dataset.noSaveMsgShow = 'true'
        
        setTimeout(() =>{
            noSaveMessage.dataset.noSaveMsgShow = 'false'
        }, 2000)

    }else{

        const cardsOnGame = JSON.parse(localStorage.getItem(`slot${slot}Cards`))
        countWin = parseInt(localStorage.getItem(`slot${slot}CountWin`))
        getCardsCount = parseInt(localStorage.getItem(`slot${slot}GetCards`))
        cards2 = JSON.parse(localStorage.getItem(`slot${slot}Cards2`))    

        getCardsButton.dataset.getCards = 'false'
        if(getCardsCount > 0)getCardsButton.dataset.getCards = true
        
        winCards.forEach(winCard => {
            delete winCard.dataset.cardWin
        })
    
        if(countWin > 0) winCards.forEach((winCard, index) =>{
            if(index >= countWin){}
            
            else{winCard.dataset.cardWin = true}
        })
    
        const columns = [...document.querySelector('.game-place').children]
    
        columns.forEach(column => {
            const columnCardsBefore = [...column.querySelectorAll('.card-game:not([data-card-empty])')]
            
            columnCardsBefore.forEach(card => {
                card.remove()
            });
        })
    
        columns.forEach((column, index) => {
    
            for(let i = 0; i < cardsOnGame[index].length; i++){
                let valueCardArr = cardsOnGame[index][i]
                let loadCard = new Card(valueCardArr[0], valueCardArr[1], column)
    
                if(valueCardArr[2] !== null){
                    loadCard.buildCardBack()
                } else{
                    loadCard.build()
                }
            }
    
        });
    
        const cardEmptyAll = document.querySelectorAll('[data-card-empty]')
    
        columns.forEach(column => {
            confirmCards(column)
        })
    }

}

export function verifyIfGameSaved(){

    const slotsSave = [...document.querySelectorAll('[data-save-slot]')]
    const slotsLoad = [...document.querySelectorAll('[data-load-slot]')]

    slotsSave.forEach((saveSlot, index) => {
        const loadSlot = slotsLoad[index]


        const loadSlotPara = loadSlot.querySelector('[data-load-p]')
        const saveSlotPara = saveSlot.querySelector('[data-save-p]')
        
        let verify = parseInt(localStorage.getItem(`slot${index+1}CountWin`))
        if(isNaN(verify)){

        }else{
            saveSlotPara.textContent = `Game Saved`
            loadSlotPara.textContent = `Game Saved`
        }
    });
}