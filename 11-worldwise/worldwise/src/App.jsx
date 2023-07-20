import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
/*
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
*/

import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { Suspense } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// const SpinnerFullPage = lazy(() => import("./components/SpinnerFullPage"));

// dist/assets/index-d864241e.css   30.14 kB │ gzip:   5.06 kB
// dist/assets/index-5db87a6d.js   524.57 kB │ gzip: 148.67 kB

function App() {
  return (
    <CityProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route index element={<Homepage />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CityProvider>
  );
}

export default App;
