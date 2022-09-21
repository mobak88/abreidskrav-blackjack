import { useState } from "react";
import PlayerContainer from "./player/PlayerContainer";
import Cards from "./player/Cards";
import GlobalStyle from "./globalStyles";

function App() {
  const [count, setCount] = useState(0);

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
