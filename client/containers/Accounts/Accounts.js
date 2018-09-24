import React, { Fragment } from 'react'
import SVGInline from 'react-svg-inline'
import styled from 'styled-components'

import Header from 'components/Header'
import Footer from 'components/Footer'

import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

import phoneImg from './phone.svg'
import appStoreImg from './app-store.png'
import googlePlayImg from './google-play.png'

const StyledContent = styled.div`
  display: grid;
  grid-template-areas:
    'main sign-in'
    'main sign-up';
  grid-template-rows: 240px 200px;
  grid-template-columns: 400px 300px;
  width: 750px;
  margin: 32px auto;
`

const StyledMain = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  grid-area: main;
  padding: 0 60px;
`

const StyledAppImg = styled.img`
  width: 135px;
  height: 40px;
`

const Accounts = () => (
  <Fragment>
    <Header simplified />
    <StyledContent>
      <StyledMain>
        <SVGInline
          svg={phoneImg}
          width={'221px'}
          height={'464px'}
          style={{
            flex: '1 1 100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        />
        <StyledAppImg src={appStoreImg} alt={'App Store'} />
        <StyledAppImg src={googlePlayImg} alt={'Google Play'} />
      </StyledMain>
      <SignInForm />
      <SignUpForm />
    </StyledContent>
    <Footer />
  </Fragment>
)

export default Accounts
