import React, {useRef} from 'react'
import {Container, Row, Col} from "reactstrap"
import {Link, NavLink} from "react-router-dom"
import "../../styles/header.css"



const navLinks = [
{
  path: "/home",
  display: "Home",

},
{
  path: "/about",
  display: "About",

},
{
  path: "/motorcycles",
  display: "Motorcycles",

},
{
  path: "/blogs",
  display: "Blogs",

},
{
  path: "/contact",
  display: "Contact",

},
];
const Header = () =>  {
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.classList.toggle("menu__active");
  return (
    <header className = "Header">
      <div className = "header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i className="ri-phone-fill"></i>+1-123-1234
                </span>
              </div>


            </Col>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-center justify-content-end gap-3">
                
              </div>
            </Col>

          </Row>
        </Container>
      </div>

    </header>
    
  )
}

export default Header