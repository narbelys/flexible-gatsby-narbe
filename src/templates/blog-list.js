import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import { kebabCase } from 'lodash'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <DefaultLayout>
        <SEO
          title={siteTitle}
          keywords={[`blog`, `emprendimiento`, `bitcoin`, `diseño`]}
        />
        <div className="content-box clearfix">
          {posts.map(({ node }) => {
            return (
              <article className="post" key={node.fields.slug}>
                {node.frontmatter.img &&
                  node.frontmatter.img.childImageSharp &&
                  node.frontmatter.img.childImageSharp.gatsbyImageData && (
                    <Link
                      to={node.fields.slug}
                      className="post-thumbnail"
                      style={{
                        backgroundImage: `url(${node.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback.src})`,
                      }}
                    />
                  )}
                <div className="post-content">
                  <h2 className="post-title">
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                  </h2>
                  <p>{node.excerpt}</p>
                  <div className="container-tags">
                    <div className="tag">
                      {node.frontmatter.tags &&
                        node.frontmatter.tags.map((tag) => (
                          <span key={tag}>
                            <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                              # {tag}
                            </Link>
                          </span>
                        ))}
                    </div>
                  </div>
                  <span className="post-date">
                    {node.frontmatter.date}&nbsp;&nbsp;—&nbsp;
                  </span>
                  <span className="post-words">
                    {node.timeToRead} minuto lectura
                  </span>
                </div>
              </article>
            )
          })}
          <div className="container">
            <nav className="pagination" role="navigation">
              <ul>
                {!isFirst && (
                  <p>
                    <Link to={prevPage} rel="prev" className="newer-posts">
                      ← Previo
                    </Link>
                  </p>
                )}
                <p>
                  <span className="page-number">
                    Página {currentPage} de {numPages}
                  </span>
                </p>
                {!isLast && (
                  <p>
                    <Link to={nextPage} rel="next" className="older-posts">
                      Siguiente →
                    </Link>
                  </p>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "YYYY, MMM DD")
            tags
            title
            img {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AUTO, AVIF, WEBP])
              }
            }
          }
        }
      }
    }
  }
`
