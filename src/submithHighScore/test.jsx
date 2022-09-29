const SubmitHighScore = ({ score, handleSubmittedHighSCore }) => {
  const [playerName, setPlayerName] = useState("");
  const [lowestScore, setLowestScore] = useState(null);
  const [localStoragePlayers, setLocalStoragePlayers] = useState(
    JSON.parse(localStorage.getItem("scores")) || []
  );

  const prevLocalStoragePlayersRef = useRef(localStoragePlayers);

  const onSubmitScore = (e) => {
    e.preventDefault();

    setLocalStoragePlayers((prevState) => {
      return [...prevState, { name: playerName, score: score }];
    });

    prevLocalStoragePlayersRef.current = localStoragePlayers;
  };

  const onNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  useEffect(() => {
    const data = localStorage.getItem("scores");
    if (data !== null) {
      setLocalStoragePlayers(JSON.parse(data));

      if (localStoragePlayers.length > 2) {
        const lowest = localStoragePlayers.slice(-1);
        setLowestScore(lowest);
      }
    }
  }, []);

  useEffect(() => {
    console.log(localStoragePlayers);
    const sortedScores = localStoragePlayers.sort((a, b) => {
      return b.score - a.score;
    });
    localStorage.setItem("scores", JSON.stringify(sortedScores));

    if (
      localStoragePlayers.length > prevLocalStoragePlayersRef.current.length
    ) {
      handleSubmittedHighSCore();
    }
  }, [localStoragePlayers]);

  return (
    <HighScoreForm>
      <h3>Submit yor high score</h3>
      <FormInputWrapper>
        <FormLabel htmlFor="name">Your Name:</FormLabel>
        <input onChange={onNameChange} type="text" id="name" />
      </FormInputWrapper>
      <Button onClick={onSubmitScore}>Submit Score</Button>
    </HighScoreForm>
  );
};

export default SubmitHighScore;
