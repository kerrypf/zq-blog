import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import media from 'styled-media-query'
import styled from 'styled-components'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'
import TagList from '../components/TagList'

const PostTitle = styled.h1`
  color: #333;
  line-height: 1em;

  transition: all 0.3s;
  margin-bottom: ${rhythm(1 / 4)};
  cursor: default;
  &:hover {
    opacity: 0.61;
  }
`

const PublishDate = styled.span`
  font-size: 0.75em;
  color: #969696;
  padding-right: 1em;
  margin-right: 1em;
  border-right: 1px solid #969696;
`

const MarkDownContainer = styled.div`
  margin: 0 auto;
  padding: ${rhythm(1)};
  width: 100%;

  ${media.greaterThan('large')`
      max-width: ${rhythm(38)}
    `};
  
  ${media.between('medium', 'large')`
  max-width: ${rhythm(26)};
  `}
  
  ${media.between('small', 'medium')`
    max-width: ${rhythm(20)}
  `}
  
  ${media.lessThan('small')`
  max-width: ${rhythm(14)}
  `}
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        >
          <link
            rel={'stylesheet'}
            type={'text/css'}
            href={'//at.alicdn.com/t/font_585271_6fnuvd8aj0d7k3xr.css'}
          />
        </Helmet>
        <MarkDownContainer
        >
          <PostTitle>{post.frontmatter.title}</PostTitle>
          <PublishDate>{post.frontmatter.date}</PublishDate>

          <TagList tags={post.frontmatter.tags} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />

          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </MarkDownContainer>
      </Layout>
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
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
