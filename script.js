const cards = document.querySelectorAll('.cards')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.toggle('flip');

    if(!hasFlippedCard)
    {
        //First Card Click
        hasFlippedCard = true
        firstCard = this

        return;
    }

    //Second Card Click
    secondCard = this

    checkIfMatch()
}

function checkIfMatch(){
    //Do Cards Match
    /** 2 Different methods to check */
        /**1.
        if(firstCard.dataset.match === secondCard.dataset.match)
        {
            //Its a match
            disableCards()
        }
        else
        {
            //Not a match
            unflipCards()
        }**/

        let isMatch = firstCard.dataset.match === secondCard.dataset.match;
        
        isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards(){
    lockBoard = true;
    
    setTimeout( () => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

/**This function executes immediately after its definition
 * because it is wrapped in a parenthesis and 
 * has an extra pair of parenthesis at its end.
 */
(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12)
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard))