// import Router from 'next/router'

import Styles from '../components/Styles'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {getCookieValueFromServer, getCookieValue} from '../utils/cookie'



export default Page => class DefaultPage extends React.Component {
  static async getInitialProps (ctx) {
    const loggedUser = process.browser ? getCookieValue('user', true) : getCookieValueFromServer(ctx.req, 'user', true)
    let pageProps = {}
    if (typeof Page.getInitialProps === 'function') {
      pageProps = await Page.getInitialProps.call(Page, ctx)
    }
    return {
      ...pageProps,
      loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser
    }
  }


  render () {
    return (
      <div>
        <Styles />
        <Header {...this.props} />
        <Page {...this.props} />
        <Footer {...this.props} />
      </div>
    )
  }
}
