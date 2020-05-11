import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div className="grids">
      {data.allMarkdownRemark.nodes.map((article, key) => (
        <article className="card" key={key}>
          <Link to={article.frontmatter.path}>
            {!!article.frontmatter.thumbnail && (
              <img
                src={article.frontmatter.thumbnail}
                alt={article.frontmatter.title + "- Featured Shot"}
              />
            )}
          </Link>
          <header>
            <h2 className="post-title">
              <Link to={article.frontmatter.path} className="post-link">
                {article.frontmatter.title}
              </Link>
            </h2>
            <div className="post-meta">{article.frontmatter.date}</div>
          </header>
        </article>
      ))}
    </div>
  </Layout>
)

export const indexQuery = graphql`
  {
    allMarkdownRemark(sort: { order: ASC, fields: frontmatter___date }) {
      nodes {
        frontmatter {
          date(formatString: "DD MMM YYYY")
          path
          title
          thumbnail
        }
      }
    }
  }
`

export default IndexPage
