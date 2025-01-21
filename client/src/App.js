import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "./index";
import AppRouter from "./components/appRouter";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import './styles/app.css';

const App = () => {
    const { user } = useContext(Context);

    if (localStorage.getItem('token')) {
        user.setIsAuth(true);
    }

    return (
        <BrowserRouter>
            <NavBar />
            <div className="app-router">
                <AppRouter />
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
