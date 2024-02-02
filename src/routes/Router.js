import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovies from "../pages/ViewMovie";
import AddMovies from "../pages/AddMovies";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view_movies/:id" component={ViewMovies} />
        <Route path="/add" component={AddMovies} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
