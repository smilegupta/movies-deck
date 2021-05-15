import { useState, useEffect, Fragment, useRef } from "react";
import Header from "./Components/Common/Header";
import HomeScreen from "./Components/Screens/HomeScreen/HomeScreen";
import Welcome from "./Components/Screens/HomeScreen/Welcome";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Components/Screens/Auth/Login";
import Register from "./Components/Screens/Auth/Register";
import ForgetPassword from "./Components/Screens/Auth/ForgotPassword";
import NewPassWord from "./Components/Screens/Auth/NewPassWord";
import { Auth } from "aws-amplify";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import ErrorPage from "./Components/Common/ErrorPage";
import { getAllMovies } from "./CRUD/homepage";
import Search from "./Components/Screens/HomeScreen/Search";

function App() {
  // State Variables
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [pattern, setPattern] = useState("");
  const responsePageCount = useRef();

  // Props for Session Management
  const authProps = {
    isAuthenticated,
    user,
    setUser,
    setAuthenticated,
    movieList,
    setMovieList,
    pattern,
    setPattern,
    responsePageCount,
  };

  useEffect(() => {
    async function sessionChecker() {
      try {
        await Auth.currentSession();
        setAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (err) {
        console.error(err);
      }
      setAuthenticating(false);
    }
    sessionChecker();
  }, []);

  useEffect(() => {
    async function getDefaultData() {
      const res = await getAllMovies(1, pattern);
      setMovieList(res.data.results);
      responsePageCount.current = res.data.total_pages;
    }
    getDefaultData();
  }, [pattern]);

  return (
    <div className="app">
      {isAuthenticating === false && (
        <Fragment>
          <Header auth={authProps} />
          <Switch>
            <Route
              path="/"
              render={(props) => <Welcome {...props} auth={authProps} />}
              exact
            />
            <Route
              path="/search"
              render={(props) => <Search {...props} auth={authProps} />}
              exact
            />
            <ProtectedRoute
              path="/home"
              component={HomeScreen}
              auth={authProps}
            />
            <Route
              path="/login"
              render={(props) => <Login {...props} auth={authProps} />}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props} auth={authProps} />}
            />
            <Route
              path="/forgot-password"
              render={(props) => <ForgetPassword {...props} auth={authProps} />}
              exact
            />
            <Route
              path="/forgot-password/:email"
              render={(props) => <ForgetPassword {...props} auth={authProps} />}
            />
            <Route
              path="/new-password/:email"
              render={(props) => <NewPassWord {...props} auth={authProps} />}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Fragment>
      )}
    </div>
  );
}

export default withRouter(App);
