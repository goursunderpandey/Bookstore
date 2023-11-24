import React from "react";
import Navbar from "./Navbar";
import GetBooks from "./GetBooks";

import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-5">
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to My Bookstore</h1>
                    <p className="lead">Explore a wide collection of books just for you.</p>
                    <hr className="my-4" />

                    <GetBooks />
                </div>
            </div>
        </>
    );
};

export default Home;
