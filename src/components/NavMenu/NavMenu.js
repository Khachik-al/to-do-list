import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import styles from './navMenu.module.css';


function NavMenu({ isAuthenticated }) {

    return (

        <Navbar bg="dark" variant="dark" className="sticky-top" >
            <Navbar.Brand href="/home">To Do List</Navbar.Brand>
            <Nav className="mr-auto">
                {isAuthenticated &&
                    <NavLink
                        to="/home"
                        activeClassName={`${styles.active} `}
                        className={styles.link}
                    >Home
                    </NavLink>
                }

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
                {isAuthenticated ?
                    <Link variant="primary">
                        Log out
                    </Link> :
                    <>
                        <NavLink
                            to="/registration"
                            activeClassName={`${styles.active} `}
                            className={styles.link}
                        >Registration
                        </NavLink>
                        <NavLink
                            to="/login"
                            activeClassName={`${styles.active} `}
                            className={styles.link}
                        >Login
                        </NavLink>
                    </>
                }

            </Nav>
        </Navbar>

    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated
    }
}


export default connect(mapStateToProps)(NavMenu)