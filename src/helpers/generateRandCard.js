const generateRandomCard = (card) => {
    const randNumber = Math.round(Math.random() * (card.length - 1));
    return randNumber;
};

export default generateRandomCard;