import { useEffect, useState } from "react";
import { fetchMatchById } from "../utils/data";
import { useRouter } from 'next/router';

const Game = ({ game: initialGame }) => {
  const [game, setGame] = useState(initialGame);
  
  // any additional states and logic you might need
  
  return (
    <div>
      {/* Display game data here */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const game = await fetchMatchById(id);

  return {
    props: {
      game,
    },
  };
}

export default Game;