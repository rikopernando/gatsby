import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = () => {
  return (
    <Layout>
      <SEO title="About" />
      <div style={{ paddingBottom: "40vw", paddingTop: 75 }}>
        <h5>Hi, I am Riko Pernando.</h5>
        <p>Frontend Developer in bareksa.com.</p>
        <p>
          I've been a Software Developer since 2016 with a strong passion to
          learn new things. I’m familiar with a few Javascript frameworks and
          PHP frameworks and developed Web for a production system with React Js
          and Vue Js as frontend, Express Js and Laravel as backend.
        </p>
      </div>
    </Layout>
  )
}

export default About
