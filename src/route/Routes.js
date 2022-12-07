import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import About from "../components/About";
import GamesCard from "../components/GamesCard";
import GamesList from "../components/GamesList";
import LayoutComp from "../layout/Layout";
import Login from "../components/Login";
import MoviesCard from "../components/MoviesCard";
import MoviesList from "../components/MoviesList";
import Register from "../components/Register";
import { GamesProvider } from "../provider/GamesProvider";
import { MoviesProvider } from "../provider/MoviesProvider";
import Cookies from "js-cookie";
import { message } from "antd";
import MoviesForm from "../components/MoviesForm";
import GamesForm from "../components/GamesForm";
import { MenuKeysProvider } from "../provider/MenuKeysProvider";
import ChangePass from "../components/ChangePass";
import { NavProvider } from "../provider/NavProvider";

const Routes = () => {
  const LoginRoutes = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Route {...props} />;
    } else {
      message.warning("You Have Not Logged-In");
      return <Redirect to="/login" />;
    }
  };

  return (
    <NavProvider>
      <MoviesProvider>
        <GamesProvider>
          <MenuKeysProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  <LayoutComp
                    content={
                      <>
                        <MoviesCard />
                        <GamesCard />
                      </>
                    }
                  />
                </Route>
                <Route exact path="/about">
                  <LayoutComp content={<About />} />
                </Route>
                <Route exact path="/login">
                  <LayoutComp content={<Login />} />
                </Route>
                <Route exact path="/register">
                  <LayoutComp content={<Register />} />
                </Route>
                <LoginRoutes exact path="/movies">
                  <LayoutComp content={<MoviesList />} />
                </LoginRoutes>
                <LoginRoutes exact path="/games">
                  <LayoutComp content={<GamesList />} />
                </LoginRoutes>
                <LoginRoutes exact path="/movies/create">
                  <LayoutComp content={<MoviesForm />} />
                </LoginRoutes>
                <LoginRoutes exact path="/movies/edit/:Id">
                  <LayoutComp content={<MoviesForm />} />
                </LoginRoutes>
                <LoginRoutes exact path="/games/create">
                  <LayoutComp content={<GamesForm />} />
                </LoginRoutes>
                <LoginRoutes exact path="/games/edit/:Id">
                  <LayoutComp content={<GamesForm />} />
                </LoginRoutes>
                <LoginRoutes exact path="/change/password">
                  <LayoutComp content={<ChangePass />} />
                </LoginRoutes>
                <LoginRoutes exact path="/movies/search/:Name">
                  <LayoutComp content={<ChangePass />} />
                </LoginRoutes>
                <LoginRoutes exact path="/games/search/:Name">
                  <LayoutComp content={<ChangePass />} />
                </LoginRoutes>
              </Switch>
            </Router>
          </MenuKeysProvider>
        </GamesProvider>
      </MoviesProvider>
    </NavProvider>
  );
};

export default Routes;
