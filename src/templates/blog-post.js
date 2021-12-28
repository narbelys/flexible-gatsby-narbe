import React from 'react'
import { Link, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import { GatsbyImage } from 'gatsby-plugin-image'

import DefaultLayout from '../components/layout'
import SEO from '../components/seo'
import { DiscussionEmbed } from 'disqus-react';

import 'katex/dist/katex.min.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    console.log(post)
    const discussionConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
      url: "https://narbelys.com/" + post.frontmatter.slug
    }
    return (
      <DefaultLayout>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <div className="clearfix post-content-box">
          <article className="article-page">
            <div className="page-content">
              {post.frontmatter.img && (
                <div className="page-cover-image">
                  {/* <figure>
                    <GatsbyImage
                      image={
                        post.frontmatter.img.childImageSharp.gatsbyImageData
                      }
                      className="page-image"
                      key={
                        post.frontmatter.img.childImageSharp.gatsbyImageData.src
                      }
                      alt=""
                    />
                  </figure> */}
                </div>
              )}
              <div className="wrap-content">
                <header className="header-page">
                  <h1 className="page-title">{post.frontmatter.title}</h1>
                  <div className="page-date">
                    <span>{post.frontmatter.date}</span>
                  </div>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <div className="page-footer">
                  <div className="page-tag">
                    {post.frontmatter.tags &&
                      post.frontmatter.tags.map((tag) => (
                        <span key={tag}>
                          <Link className="tag" to={`/tags/${kebabCase(tag)}/`}>
                            # {tag}
                          </Link>
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                <div class="fb-comments" data-href={`https://narbelys.com/${post.id}/`} data-width="800" data-numposts="5"></div>
                  {/*<DiscussionEmbed shortname="https-narbelys-com" config={discussionConfig}>
                  </DiscussionEmbed>*/}
                </div>
              </div>
            </div>
          </article>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY, MMM DD")
        tags
        img {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH, formats: [AUTO, AVIF, WEBP])
          }
        }
      }
    }
  }
`
