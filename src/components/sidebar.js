import { Link } from 'gatsby'
import React from 'react'

import Logo from './pic.jpg'
import { kebabCase } from 'lodash'
import SubscribeForm from './subscribeForm';

const Sidebar = ({ siteMetadata }) => (
  <>
    <aside className="sidebar">
      <header>
        <div className="about">
          <div className="cover-author-image">
            <Link to="/">
              <img src={Logo} alt={siteMetadata.author} />
            </Link>
          </div>
          <h5>"Haciendome las preguntas que nadie más se hace"</h5>
          <SubscribeForm />
          <div className="box-contribution">
          <a
            className="button"
            href="/contribucion"
          >
            Contribuir
        </a>
        </div>
          {/*<ul className="menu">
            {siteMetadata.categories.map((tag) => (
              <li key={tag}>
                <Link
                  to={`/tags/${kebabCase(tag)}/`}
                >
                  {tag}
                </Link>
              </li>
            ))}
            </ul>*/}
        </div>
      </header>
      <footer>
        <section className="contact">
          <h3 className="contact-title">Contacto</h3>
          <ul>
            {siteMetadata.social.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${siteMetadata.social.twitter}`}
                  target="_blank"
                >
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.facebook && (
              <li>
                <a
                  href={`https://facebook.com/${siteMetadata.social.facebook}`}
                  target="_blank"
                >
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.github && (
              <li>
                <a
                  href={`https://github.com/${siteMetadata.social.github}`}
                  target="_blank"
                >
                  <i className="fa fa-github" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.linkedin && (
              <li>
                <a
                  href={`https://linkedin.com/in/${siteMetadata.social.linkedin}`}
                  target="_blank"
                >
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </li>
            )}
            {siteMetadata.social.email && (
              <li>
                <a href={`mailto:${siteMetadata.social.email}`} target="_blank">
                  <i className="fa fa-envelope-o" aria-hidden="true" />
                </a>
              </li>
            )}
          </ul>
        </section>
        <div className="copyright">
          <p>
            {new Date().getFullYear()} &copy; {siteMetadata.author}
          </p>
        </div>
      </footer>
    </aside>
  </>
)

export default Sidebar
