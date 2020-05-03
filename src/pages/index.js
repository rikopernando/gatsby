import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Artikel Yang Tersedia</h1>
    <ul>
      {data.allMarkdownRemark.nodes.map((article, key) => (
        <li key={key}>
          <Link to={article.frontmatter.path}>{article.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export const indexQuery = graphql`
  {
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
      nodes {
        frontmatter {
          date
          path
          title
        }
      }
    }
  }
`

export default IndexPage
