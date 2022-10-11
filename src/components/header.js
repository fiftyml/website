import React, { useEffect, useState } from "react"

import shortGlass from "../assets/images/short-glass.svg"


const Header = () => {

    const [setMenu, setMenuState] = useState("");

    function toggleMenu() {
        setMenuState(setMenu === "" ? "open" : "");
    }

    return (
        <div className="navigation">
            <div className="container main-container">
                <div className="row">
                    <div className="col-3">
                        {/* <a href="/"><img src={shortGlass} alt="Short Glass" /></a> */}
                        <a href="/" className="big">fifty_ml</a>
                    </div>
                    <div className="col-9 navigation-desktop">
                        <div className="menu">
                            <a href="/recipes/">Drink Recipes</a>
                            <a href="/ingredients/">Drinks by Ingredient</a>
                            <a href="/journal/">Our Journal</a>
                        </div>
                    </div>
                    <div className="col-9 navigation-mobile">
                        <div className="menu">
                            <a href="" onClick={toggleMenu}>Menu</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mobile-menu ${setMenu}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <a className="h3" href="/recipes/">Drink Recipes</a>
                            <hr />
                            <a className="h3" href="/ingredients/">Drinks by Ingredient</a>
                            <hr />
                            <a className="h3" href="/journal/">Our Journal</a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Header
