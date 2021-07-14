import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyles = createGlobalStyle`
 @font-face {
   font-family: 'radnika_next';
   src: url('/static/radnikanext-medium-webfont.woff2');
   format: ('woff2');
   font-weight: normal;
   font-style: normal;
 }

  html {
    --red: #ff0000;
    --black: #393939;
    --grey: #3A3A3A;
    --lightGrey: #e1e1e1;
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: '0 12px 24px 0 rgba(0,0,0,0.09)';
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    font-family: "radnika-next", --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.6;
    width: 100vw;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: "radnika-next", --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Page = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header></Header>
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.any
};

export default Page;
