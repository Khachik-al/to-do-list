import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './styleLogin.module.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../store/actions';

function Login(props) {

    let [values, setValues] = useState({
        email: '',
        password: ''
    })
    let [errors, setErrors] = useState({
        email: null,
        password: null
    })
    function handleChange({ target: { name, value } }) {
        if (value.trim()) {
            setErrors({ ...errors, [name]: null })
        }
        else {
            setErrors({
                ...errors,
                [name]: 'Fieled is reqired'
            })
        }

        if (name === 'email' && value) {
            if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                setErrors({ ...errors, email: 'Invalid email' })
            }
        }
        setValues({ ...values, [name]: value })
    }

    function onSubmit() {
        let errorsExist = !Object.values(errors).every(el => el === null)
        let valuesExist = !Object.values(values).some(el => el.trim() === '')
        if (!errorsExist && valuesExist) {

            props.login(values)
            setValues({//?
                email: '',
                password: ''
            })

            return;
        }
        if (!errorsExist && !valuesExist) {
            setErrors({

                email: 'Fieled is reqired',
                password: 'Fieled is reqired'
            })
        }
    }

    return (
        <Container
            style={{ color: "white" }}

        >
            <Row className='justify-content-center'>
                <Col xs={12} sm={8} md={6}>
                    <Form className={styles.form}>
                        <h2 className='text-center'>Login</h2>
                        <Form.Group >
                            <Form.Label className='mt-2'>Email address</Form.Label>
                            <Form.Control
                                value={values.email}
                                name='email'
                                type="email"
                                onChange={handleChange}
                                className={errors.email ? styles.invalid : ''}
                            />
                            <Form.Text className="text-danger">
                                {errors.email}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control
                                value={values.password}
                                name='password'
                                type="password"
                                onChange={handleChange}
                                className={errors.password ? styles.invalid : ''}
                            />
                            <Form.Text className="text-danger">
                                {errors.password}
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            className='mt-2'
                            onClick={onSubmit}
                        >
                            Login
                        </Button>
                        <br /><br />
                        <Link to={'/registration'}>Not registered yet? Register now.</Link>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

let mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login)