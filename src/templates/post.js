import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const Post = ({ data, pageContext }) => {
  const { html, frontmatter } = data.markdownRemark
  console.log(pageContext)
  const { prev, next } = pageContext
  return (
    <Layout>
      <h2>{frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <br />
      {prev && <Link to={prev.path}>Prev</Link>} |<Link to={"/"}>Home</Link> |
      {next && <Link to={next.path}>Next</Link>}
    </Layout>
  )
}

export const DetailQuery = graphql`
  query DetailQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default Post
