import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './styleRegistration.module.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';

function Registration(props) {

    let [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    let [errors, setErrors] = useState({
        name: null,
        surname: null,
        email: null,
        password: null,
        confirmPassword: null
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

    function onRegister() {
        let errorsExist = !Object.values(errors).every(el => el === null)
        let valuesExist = !Object.values(values).some(el => el.trim() === '')
        if (!errorsExist && valuesExist) {
            props.register(values)
            setValues({//?
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
            return;
        }
        if (!errorsExist && !valuesExist) {
            setErrors({
                name: 'Fieled is reqired',
                surname: 'Fieled is reqired',
                email: 'Fieled is reqired',
                password: 'Fieled is reqired',
                confirmPassword: 'Fieled is reqired'
            })
        }
    }

    return (
        <Container
        style={{color: "white"}}
        >
            <Row className='justify-content-center'>
                <Col xs={12} sm={8} md={6}>
                    <Form className={styles.form}>
                        <h2 className='text-center'>Registration</h2>
                        <Form.Group >
                            <Form.Label className='mt-2'>Name</Form.Label>
                            <Form.Control
                                value={values.name}
                                name='name'
                                onChange={handleChange}
                                type="text"
                                className={errors.name ? styles.invalid : ''}
                            />

                            <Form.Text className="text-danger">
                                {errors.name}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label className='mt-2'>Surname</Form.Label>
                            <Form.Control
                                value={values.surname}
                                name='surname'
                                onChange={handleChange}
                                type="text"
                                className={errors.surname ? styles.invalid : ''}
                            />

                            <Form.Text className="text-danger">
                                {errors.surname}
                            </Form.Text>
                        </Form.Group>

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
                        <Form.Group >
                            <Form.Label className='mt-2'>Confirm password</Form.Label>
                            <Form.Control
                                value={values.confirmPassword}
                                name='confirmPassword'
                                type="password"
                                onChange={handleChange}
                                className={errors.confirmPassword ? styles.invalid : ''}
                            />
                            <Form.Text className="text-danger">
                                {errors.confirmPassword}
                            </Form.Text>
                        </Form.Group>
                        <Button
                            variant="primary"
                            className='mt-2'
                            onClick={onRegister}
                        >
                            Register
                        </Button>
                        <br /><br />
                        <Link to={'/login'}>Alraedy registered? Try to login</Link>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}

let mapDispatchToProps = {
    register
}

export default connect(null, mapDispatchToProps)(Registration)