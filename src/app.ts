import { getRandomInt } from './utils';
let squares: NodeListOf<HTMLDivElement>;
let loserCount = 0;
const guessingGameName = document.querySelector('.guessingGameName');
const restart = document.querySelector('restart');
export function runApp() {
    const secretNumber = getRandomInt(1, 6);
    squares = document.querySelectorAll('.square');
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            sq.dataset.winner = 'true';
        }
        currentSquare++;
        sq.addEventListener('click', handleClick);
    });

}
function handleRestart() {
    location.reload(true);
}

function handleClick() {
    const isWinner = this.dataset.winner === 'true';
    const clickedSquare = this as HTMLDivElement;
    if (isWinner) {
        clickedSquare.classList.add('winner');
        guessingGameName.textContent = 'YOU WIN!!';
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
            }
            s.removeEventListener('click', handleClick);
            s.addEventListener('click', handleRestart);
        });

    } else {
        if (loserCount < 4) {
            clickedSquare.classList.add('loser');
        } else {
            clickedSquare.classList.add('loser');
            guessingGameName.textContent = 'YOU LOSE';
            squares.forEach(s => {
                if (s !== clickedSquare) {
                    s.classList.add('loser');
                }
                s.removeEventListener('click', handleClick);
                s.addEventListener('click', handleRestart);

            });
        }
        loserCount++;
    }
}
