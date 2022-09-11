import React, {useEffect} from "react";
import {Route, Routes} from "react-router";
import {useNavigate} from 'react-router-dom'
import IndexHome from "../pages/home/index";
import Main from "../layout/Main";
import IndexMenu01 from "Pages/menu01";
import IndexMenu02 from "Pages/menu02";
import IndexMenu03 from "Pages/menu03";
import IndexMenu04 from "Pages/menu04";
import NotFound from "Pages/NotFound";
import IndexMenu05 from "../pages/menu05/index";
import Login from "Pages/Login";
import { useAppSelector } from "../redux/store";

export default function AppRoutes() {

    const router = useNavigate()
  const authLogin = useAppSelector(state => state.auth).isLogin;

  useEffect(() => {
      if(!authLogin){
          router('/login')
      }
  },[])

  return (
    <main>
      <Routes>
        { authLogin ? (
            <Route path="/" element={<Main />}>
              <Route path="home" element={<IndexHome />} />
              <Route path="menu01" element={<IndexMenu01 />} />
              <Route path="menu02" element={<IndexMenu02 />} />
              <Route path="menu03/*" element={<IndexMenu03 />} />
              <Route path="menu04" element={<IndexMenu04 />} />
              <Route path="menu05" element={<IndexMenu05 />} />
              <Route path="*" element={<NotFound />} />
            </Route>
        ) : (
            <Route path="/login" element={<Login />} />
        ) }

      </Routes>
    </main>
  );
}
