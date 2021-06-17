import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenu.module.css';


export default function NavMenu() {

    return (

        <Navbar bg="dark" variant="dark" className="sticky-top" >
            <Navbar.Brand href="/home">To Do List</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink
                    to="/home"
                    activeClassName={`${styles.active} `}
                    className={styles.link}
                >Home
                </NavLink>
                <NavLink
                    to="/about"
                    activeClassName={`${styles.active} `}
                    className={styles.link}
                >About us
                </NavLink>
                <NavLink
                    to="/contact"
                    activeClassName={`${styles.active} `}
                    className={styles.link}
                >Contact us
                </NavLink>
            </Nav>
        </Navbar>

    )
}