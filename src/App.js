import { useContext, useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/Nav/Nav'
import Login from './components/Login/Login'
import BookBody from './components/BookBody/BookBody'
import Favorites from './components/Favorites/Favorites'
import Profile from './components/Profile/Profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from 'react-router-dom'
import AuthApi from './AuthApi'
import Cookies from 'js-cookie';


function App() {

  const [auth, setAuth] = useState(false)

  const readCookie = () => {
    const user = Cookies.get("Username")
    if (user) {
      setAuth(true)
    }
  }
  useEffect(() => {
    readCookie()
  }, [])
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes />
      </Router>
    </AuthApi.Provider>
  );
}
const Routes = () => {
  const Auth = useContext(AuthApi)
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  return (
    <Switch>
      <Route path="/login"  exact  component={Login} />
      <Route path="/" exact  component={BookBody} />
      <ProtectedDetail path="/details" exact auth={Auth.auth} id={query.get("id")} component={BookBody} />
      <LogoutRoute path="/logout" exact  component={BookBody} />
      <Route path="/favorites" exact   component={Favorites} />
      <Route path="/profile" exact   component={Profile} />
    </Switch>
  )

}
const LogoutRoute = ({ auth, component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() => {
        Cookies.remove("Username")
        Cookies.remove("Email")
        return <Redirect to="/"/>
      }
      }
    />
  )
}
const ProtectedDetail = ({ auth, component: Component, id, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (<Component isDetail={true} id={id} />) 
      }
    />
  )
}

// const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={() => !auth ?
//         (<Component />) : (
//           <Redirect to="/" />
//         )
//       }
//     />
//   )
// }

export default App;
