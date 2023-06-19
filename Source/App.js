import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header/Header";
import { Body } from "./Body/Body";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";

const root =  ReactDOM.createRoot(document.getElementById("root"));

const App = () =>{
   return(
    <>
    <Header/>
    <Body />
    <Footer/>
    

    </>
   )

}



root.render(<App/>)

