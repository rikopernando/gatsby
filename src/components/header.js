import PropTypes from "prop-types"
/** @jsx jsx */
import { jsx, css } from "@emotion/core"
import { Link } from "gatsby"

const cssHeader = css`
  background: #0a041a;
  margin-bottom: 1.45rem;
`

const cssContainer = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 8px;
`

const cssLinkMenu = css`
  list-style: none;
  display: flex;
  margin: 0;

  li {
    margin: 0;
  }

  li a {
    display: block;
    padding: 12px;
    color: #fff;
    text-decoration: none;

    // &:hover {
    //   border-bottom: 1px solid #fff;
    //   transition: border-bottom ease 0.3s;
    // }
  }
`

const Header = () => (
  <header css={cssHeader}>
    <div css={cssContainer}>
      <ul css={cssLinkMenu}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Portfolio</Link>
        </li>
      </ul>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
