import PlayerContainer from "./player/PlayerContainer";
import Cards from "./player/Cards";
import GlobalStyle from "./globalStyles";

function App() {
  return (
    <>
      <GlobalStyle />
      <PlayerContainer>
        <h1>Test</h1>
        <h2>Test2</h2>
        <Cards />
      </PlayerContainer>
    </>
  );
}

export default App;
