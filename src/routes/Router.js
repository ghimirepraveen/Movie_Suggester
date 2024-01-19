import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import ViewMovies from "../pages/ViewMovie";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact />
        <Route path="/view_movies/:id" component={ViewMovies} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
