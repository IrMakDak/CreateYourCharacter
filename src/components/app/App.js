import HeroesList from "../heroesList/HeroesList";
import HeroesAddForm from "../heroesAddForm/HeroesAddForm";

import "./app.scss";

const App = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
        </div>
      </div>
    </main>
  );
};

export default App;
