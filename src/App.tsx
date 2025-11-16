import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Section1 from "./components/Section1";
import SignIn from "./components/pages/SignIn";
import SetPassword from "./components/pages/SetPassword";
import SetProfile from "./components/pages/SetProfile";
import Login from "./components/pages/Login";
import NotFound from "./components/pages/NotFound";
import Cart from "./components/pages/Cart";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./components/Products";

const RootPage = () => {
  return (
    <>
      <NavBar />
      <Section1 />
      <Products />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/setPassword" element={<SetPassword />} />
          <Route path="/setProfile" element={<SetProfile />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
