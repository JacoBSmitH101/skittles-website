import { useRouter } from "next/router";
import { DashboardLayout } from "../components/dashboard-layout";


const Game = () => {
    const Router = useRouter();
    const { gameNumber, seasonNumber } = Router.query;
    return (
        <div>
            <h1>Game {gameNumber} of Season {seasonNumber}</h1>
        </div>
    )
}
Game.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Game