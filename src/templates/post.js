import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = ({ data, pageContext }) => {
  const { html, frontmatter, fields } = data.markdownRemark
  const { prev, next } = pageContext
  const { readingTime } = fields
  console.log(readingTime)
  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="blog-post-container">
        <article className="post">
          {!frontmatter.thumbnail && (
            <div className="post-thumbnail">
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">
                {frontmatter.date} - {Math.ceil(readingTime.minutes)} min read
              </div>
            </div>
          )}
          {!!frontmatter.thumbnail && (
            <div
              className="post-thumbnail"
              style={{ backgroundImage: `url(${frontmatter.thumbnail})` }}
            >
              <h1 className="post-title">{frontmatter.title}</h1>
              <div className="post-meta">
                {frontmatter.date} - {Math.ceil(readingTime.minutes)} min read
              </div>
            </div>
          )}
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
      {/* <br />
      {prev && <Link to={prev.path}>Prev</Link>} |<Link to={"/"}>Home</Link> |
      {next && <Link to={next.path}>Next</Link>} */}
    </Layout>
  )
}

export const DetailQuery = graphql`
  query DetailQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD MMM YYYY")
        title
        thumbnail
      }
      fields {
        readingTime {
          minutes
        }
      }
    }
  }
`

export default Post
