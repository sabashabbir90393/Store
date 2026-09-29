import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import { isLoggedIn } from "./services/authService";


// =========================
// STORE LAYOUT
// =========================
function StoreLayout() {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}


// =========================
// APP
// =========================
function App() {
  return (
   <WishlistProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>

        {/* Welcome Page */}
        <Route
          path="/"
          element={<Welcome />}
        />

        {/* Protected Store Routes */}
        <Route element={<StoreLayout />}>

          <Route
            path="/store"
            element={<Home />}
          />

          <Route
            path="/store/shop"
            element={<Shop />}
          />

          <Route
            path="/store/categories"
            element={<Categories />}
          />

          <Route
            path="/store/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/store/favorites"
            element={<Favorites />}
          />

          <Route
            path="/store/cart"
            element={<Cart />}
          />

          <Route
            path="/store/checkout"
            element={<Checkout />}
          />

          <Route
            path="/store/orders"
            element={<Orders />}
          />

          <Route
            path="/store/profile"
            element={<Profile />}
          />

        </Route>

        {/* Any Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
</CartProvider>
</WishlistProvider>
  );
}

export default App;