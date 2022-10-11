import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { SEOContext } from 'gatsby-plugin-wpgraphql-seo';
import Helmet from "react-helmet"

import "../assets/css/reset.css"
import "../assets/css/bootstrap-grid.css"
import "../assets/css/style.css"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children, location, className }) => {
    const {
        wp: { seo },
    } = useStaticQuery(graphql`
        query SiteInfoQuery {
            wp {
                seo {
                    contentTypes {
                        post {
                            title
                            schemaType
                            metaRobotsNoindex
                            metaDesc
                        }
                        page {
                            metaDesc
                            metaRobotsNoindex
                            schemaType
                            title
                        }
                    }
                    webmaster {
                        googleVerify
                        yandexVerify
                        msVerify
                        baiduVerify
                    }
                    schema {
                        companyName
                        personName
                        companyOrPerson
                        wordpressSiteName
                        siteUrl
                        siteName
                        inLanguage
                        logo {
                            sourceUrl
                            mediaItemUrl
                            altText
                        }
                    }
                    social {
                        facebook {
                            url
                            defaultImage {
                                sourceUrl
                                mediaItemUrl
                            }
                        }
                        instagram {
                            url
                        }
                        linkedIn {
                            url
                        }
                        mySpace {
                            url
                        }
                        pinterest {
                            url
                            metaTag
                        }
                        twitter {
                            username
                        }
                        wikipedia {
                            url
                        }
                        youTube {
                            url
                        }
                    }
                }
            }
        }
    `);

    return (
        <SEOContext.Provider value={{ global: seo }}>
            <Helmet htmlAttributes={{ lang: 'en', }} />
            <Helmet>
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            </Helmet>
            <Header />
            <main className={className}>
                {children}
            </main>
            <Footer />
        </SEOContext.Provider>
    )
}


export default Layout
