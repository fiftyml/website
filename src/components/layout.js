import * as React from "react"
import Helmet from "react-helmet"

import "../assets/css/reset.css"
import "../assets/css/bootstrap-grid.css"
import "../assets/css/style.css"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, location }) => {
    return (
        <>
            <Helmet htmlAttributes={{ lang: 'en', }} />
            <Helmet>
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            </Helmet>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}


export default Layout
