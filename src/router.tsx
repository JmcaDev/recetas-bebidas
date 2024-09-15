import { BrowserRouter, Routes, Route } from "react-router-dom"
import {lazy, Suspense} from "react"

import Layout from "./layouts/Layout"
import Spinner from "./components/Spinner"

const IndexPage = lazy(() => import("./views/IndexPage"))
const FavoritesPage = lazy(() => import("./views/FavoritesPage"))

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Suspense fallback={<Spinner/>}>
                  <IndexPage/>
                </Suspense>} index/>
                <Route path="/favoritos" element={
                  <Suspense fallback={<Spinner/>}>
                    <FavoritesPage/>
                  </Suspense>
                }/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter