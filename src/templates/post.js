import * as React from "react"
import { graphql } from 'gatsby';
import Seo from 'gatsby-plugin-wpgraphql-seo';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from '../components/layout.js';

import star from "../assets/images/star.svg"
import wiggle from "../assets/images/wiggle.svg"

var strftime = require('strftime')

const post = ({ data, pageContext }) => {
    var title = data.wpPost.title
    var categories = data.wpPost.categories.nodes
    const image = getImage(data.wpPost.featuredImage.node.localFile)


    if (data.wpPost.post.faqs) {
      var faqs = data.wpPost.post.faqs
    } else {
      var faqs = []
    }

    var otherPosts = data.allWpPost.nodes

    return (
        <Layout>
            <Seo post={data.wpPost} />
            
            <div className="header">
                <div className="header-row empty-row">
                    <hr />
                    <div className="container text-muted">
                    </div>
                </div>
                <div className="header-row">
                    <hr />
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8">
                                <h1>{title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>

            <div className="container post-image-row">
                <div className="row">
                    <div className="col-12 col-md-7">
                        <p className="big">If you have noticed that your Anthurium Clarinervium has started to develop curling leaves, then it definitely means something isn’t quite right.</p>
                    </div>
                    <div className="col-12 col-md-5 image-holder">
                        <GatsbyImage image={image} alt="Sausage" />
                    </div>
                    
                </div>
            </div>

            <div className="container" style={{marginTop: "3rem"}}>
                <div className="row">
                    <div className="col-12 col-md-8 post-content">
                        <span dangerouslySetInnerHTML={{ __html: data.wpPost.content }} />

                         {faqs.length > 0 &&
                            <div className="post-faqs">
                              <h2>{data.wpPost.post.faqsTitle || "FAQs"}</h2>
                              {faqs.map(faq => {
                                return (
                                  <div className="faq-row">
                                    <hr />
                                    <p className="big">{faq.question}</p>
                                    <span className="text-muted" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                  </div>
                                )
                              })}
                            </div>
                          }

                    </div>
                    <div className="col-12 col-md-3 offset-md-1 post-sidebar">
                        <div className="wiggle m-mt-3" style={{ marginBottom: "1em", maxWidth: "200px" }}></div>
                        <p><span className="text-muted">Last Updated:</span><br />{strftime('%B %o %Y', new Date(data.wpPost.modified))}</p>
                        <p><span className="text-muted">Written by:</span><br />{data.wpPost.author.node.name}</p>
                        <small className="badge-group">
                            {categories.map(category => {
                                return (
                                    <a href={category.uri} className="badge">{category.name}</a>
                                )
                            }) }
                        </small>

                        <div className="related-posts">
                          <img src={star} alt="Green Star Shape" className="m-mt-3" style={{ marginBottom: "1em", marginTop: "5em" }} />
                          <br />
                          {otherPosts.slice(0, 5).map(post => {
                            return (
                              <>
                                <a href={post.uri}>{post.title}</a>
                                <hr />
                              </>
                            )
                          })}
                        </div>
                    
                    </div>
                </div>
            </div>


        <div className="container" style={{ marginTop: "5rem" }}>
          <div className="row">

            {otherPosts.slice(6, 8).map(post => {
              var image = getImage(post.featuredImage.node.localFile)
              return (
                <div className="col-12 col-md-4">
                  <div className="post-card m-mb-4">
                    <a href={post.uri}>
                      <GatsbyImage image={image} alt="Sausage" />
                    </a>
                    <div className="badge-group small">
                      {post.categories.nodes.map(category => {
                        return (
                          <a className="badge" href={category.uri}>{category.name}</a>
                        )
                      })}
                    </div>
                    <a href={post.uri} className="h4">{post.title}</a>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
        </Layout>
    )
}

export const query = graphql`
  query($id: String!) {
     allWpPost(filter: {id: {ne: $id}}, limit: 8) {
        nodes {
            title
            uri
            categories {
                nodes {
                    uri
                    name
                }
            }
            featuredImage {
                node {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(aspectRatio: 1.5, quality: 80)
                        }
                    }
                }
            }
        }
      }

    wpPost(id: { eq: $id }) {
      title
      uri
      date
      modified
      content
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          uri
          name
        }
      }
      post {
        faqsTitle
        faqs {
          answer
          question
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(aspectRatio: 1.5, quality: 80)
            }
          }
        }
      }
      seo {
        title
        metaDesc
        focuskw
        metaKeywords
        metaRobotsNoindex
        metaRobotsNofollow
        opengraphTitle
        opengraphDescription
        opengraphImage {
            altText
            sourceUrl
            srcSet
        }
        twitterTitle
        twitterDescription
        twitterImage {
            altText
            sourceUrl
            srcSet
        }
        canonical
        cornerstone
        schema {
            articleType
            pageType
            raw
        }
      }
    }
  }
`;

export default post;