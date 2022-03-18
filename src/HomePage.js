import Puzzle from "./components/Puzzle";


function HomePage() {
   return (
        <div>
            <h3 id="title"> Pathfinding Visualizer App</h3>

            <Puzzle id={"puzzle"}> </Puzzle>
        </div>
    );
}

export default HomePage;
