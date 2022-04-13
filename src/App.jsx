import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import PublicRoute from "./routes/PublicRoute/PublicRoute";

import { fetchCurrentUser } from "./redux/authorization/auth-operations";
import {
  getIsCurrentUser,
  authToken,
  getIsAuth,
} from "./redux/authorization/auth-selectors";
import UserMenu from "components/UserMenu/UserMenu";
const HomePage = lazy(() => import("pages/HomePage/HomePage.jsx"));
const MastersPage = lazy(() => import("pages/MastersPage/MastersPage.jsx"));
const OrdersPage = lazy(() => import("pages/OrdersPage/OrdersPage.jsx"));
const ToMastersPage = lazy(() => import("pages/ToMastersPage/ToMastersPage.jsx"));
const ToOrdersPage = lazy(() => import('pages/ToOrdersPage/ToOrdersPage.jsx'));
const PortfolioPage = lazy(() => import('pages/PortfolioPage/PortfolioPage.jsx'));
const NewsPage = lazy(() => import('pages/NewsPage/NewsPage.jsx'));
const PhonebookHome = lazy(() =>
  import("pages/PhonebookHome/PhonebookHome.jsx")
);
const AuthPage = lazy(() => import("pages/AuthPage/AuthPage.jsx"));
function App() {
  const dispatch = useDispatch();
  const isCurrentUser = useSelector(getIsCurrentUser);
  useEffect(() => {
    if (authToken !== null) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);
  const isAuth = useSelector(getIsAuth);
  return (
    <>
      {isCurrentUser ? (
        <span>Loading...</span>
      ) : (
        <div className={styles.mainDiv}>
          {isAuth === true && <UserMenu />}
          <Header />
          <Suspense fallback={<span>Loading...</span>}>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                }
              />
              <Route
                path="/masters"
                element={
                  <PublicRoute>
                    <MastersPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <PublicRoute>
                    <OrdersPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/tomasters"
                element={
                  <PublicRoute>
                    <ToMastersPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/toorders"
                element={
                  <PublicRoute>
                    <ToOrdersPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PublicRoute>
                    <PortfolioPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/news"
                element={
                  <PublicRoute>
                    <NewsPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/auth/:authType"
                element={
                  <PublicRoute restricted redirectTo="/contacts">
                    <AuthPage />
                  </PublicRoute>
                }
              />

              {/* <Route
                path="/auth/:authType"
                element={
                  <PublicRoute restricted redirectTo="/masters">
                    <AuthPage />
                  </PublicRoute>
                }
              /> */}

              <Route
                path="/auth/:authType"
                element={
                  <PublicRoute restricted>
                    <AuthPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/auth/login">
                    <PhonebookHome />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      )}
    </>
  );
}
export default App;
