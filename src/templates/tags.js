import React from 'react'
import { Link, graphql } from 'gatsby'
import DefaultLayout from '../components/layout'

const Tags = ({ pageContext, data }) => {
        const posts = data.allMarkdownRemark.edges
        const { currentPage, numPages } = pageContext
        const isFirst = currentPage === 1
        const isLast = currentPage === numPages
        const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
        const nextPage = (currentPage + 1).toString()

        return (
          <DefaultLayout>
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
                      <span className="post-date">
                        {node.frontmatter.date}&nbsp;&nbsp;—&nbsp;
                      </span>
                      <span className="post-words">
                        {node.timeToRead} minute read
                      </span>
                    </div>
                  </article>
                )
              })}
                <span>
                    <Link to="/">← Todas las secciones</Link>
                </span>
            </div>
          </DefaultLayout>
        )
      }
    
export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
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
