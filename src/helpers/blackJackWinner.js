const blackJackWinner = (playerScore, computerScore) => {
    if (playerScore === 21 && computerScore === 21) {
        return ["Both you and computer got BlackJack draw", true];
    }

    if (playerScore === 21 || computerScore === 21) {
        if (playerScore === 21) {
            return ["You got BlackJack congratulations you win", true];
        } else if (computerScore === 21) {
            return ["Computer got BlackJack you lose", true];
        }
    } else {
        return ['', false];
    }
};

export default blackJackWinner;