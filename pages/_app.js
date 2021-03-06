import App, {Container} from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import { Provider } from 'mobx-react'
import fetch from 'isomorphic-fetch'
import {APP_DOMAIN, APP_DOMAIN_DEV} from 'babel-dotenv'

const {NODE_ENV} = process.env
const requestDomain = (NODE_ENV === 'production') ? APP_DOMAIN : APP_DOMAIN_DEV
let staticStore = {}

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const env = process.browser ? 'client' : 'server'
    // console.log(`Executing MyApp getInitialProps (${env} side)`, { staticStore })

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    /* This request 👇 is optional and can be removed 
    if the nav data from Apostrophe isn't used in this application */
    if (typeof staticStore.navData === 'undefined') {
      const toFetch = `${requestDomain}api/micro/nav`
      const response = await fetch(toFetch)
      const data = await response.json()
      staticStore = Object.assign(staticStore, {navData: data._children})
    } 

    return { pageProps, staticStore }
  }
  render () {
    const {Component, pageProps, staticStore, mobxStore} = this.props
    return (
      <Container>
        <Provider staticStore={staticStore} store={mobxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)
