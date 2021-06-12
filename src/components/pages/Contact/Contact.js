import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from './styleContact.module.css'

export default function Contact() {

    let [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })
    let [errors, setErrors] = useState({
        name: null,
        email: null,
        message: null
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
            fetch('http://localhost:3001/form', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(async (response) => {
                    let res = await response.json()
                    if (response.status >= 400 && response.status < 600) {
                        if (res.error) {
                            throw res.error
                        }
                        else {
                            throw new Error('Somthing went wrong');
                        }
                    }
                    setValues({
                        name: '',
                        email: '',
                        message: ''
                    })
                })
                .catch((error) => {
                    console.log("error ", error);

                })
            return;
        }
        if (!errorsExist && !valuesExist) {
            setErrors({
                name: 'Fieled is reqired',
                email: 'Fieled is reqired',
                message: 'Fieled is reqired'
            })
        }










    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form className={styles.form}>
                        <h2 className='text-center'>Contact us</h2>
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
                            <Form.Label className='mt-2'>Message</Form.Label>
                            <Form.Control
                                value={values.message}
                                name='message'
                                as="textarea"
                                rows={3}
                                onChange={handleChange}
                                className={errors.message ? styles.invalid : ''}
                            />
                            <Form.Text className="text-danger">
                                {errors.message}
                            </Form.Text>
                        </Form.Group>

                        <Button
                            variant="primary"
                            className='mt-2'
                            onClick={onSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    )
}