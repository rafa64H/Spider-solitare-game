import * as functions from './functions.js'

export default class Card {
    constructor(numValue, typeCard, column){
        this.value = numValue
        this.typeCard = typeCard
        this.column = column
        this.cardElement = 0
    }

    build(){
        const card = document.createElement('div')
        card.classList.add('card-game')
        card.dataset.cardValue = `${this.value} ${this.typeCard}`
        card.setAttribute('draggable', 'true')
        this.column.appendChild(card)

        functions.verifyIfDraggable(card, this.column)
    }

    buildCardBack(){
        const card = document.createElement('div')
        card.classList.add('card-game')
        card.dataset.cardValue = `${this.value} ${this.typeCard}`
        card.dataset.cardBack = ''
        card.setAttribute('draggable', 'false')
        this.column.appendChild(card)
    }
}