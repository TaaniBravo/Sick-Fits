import React from "react";
import Link from "next/link";
import Nav from "./Nav";
import Cart from "./Cart";
import Search from "./Search";
import styled from "styled-components";

const Logo = styled.h1`
  background: red;
  font-size: clamp(1.5rem, 4rem, 4rem);
  margin-left: clamp(1rem, 2rem, 2rem);
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => {
  return (
    <HeaderStyles>
      <div className='bar'>
        <Logo>
          <Link href='/'>Hvstle</Link>
        </Logo>
        <Nav />
      </div>
      <div className='sub-bar'>
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
};

export default Header;
