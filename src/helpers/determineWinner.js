const determineWinner = (playerScore, computerScore) => {
    if (
        (playerScore > computerScore && playerScore <= 21) ||
        (computerScore > 21 && playerScore <= 21)
    ) {
        return "You won";
    } else if (
        (playerScore < computerScore && computerScore <= 21) ||
        (playerScore > 21 && computerScore <= 21)
    ) {
        return "Computer won";
    } else {
        return "Draw";
    }
};

export default determineWinner;