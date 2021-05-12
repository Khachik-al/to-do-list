import React, { Component } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
// import styles from './styleInputGroup.module.css';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class TaskInput extends Component {

    static propTypes = {
        onAdd: PropTypes.func.isRequired
    };

    state = {
        title: '',
        description: ''
    };

    handleChenge = (event) => {
        let {value,name}=event.target;
        this.setState({
            [name]: value
        })
    };
    addTask = () => {
        let title = this.state.title.trim();
        let description = this.state.description.trim();
        if (!title) { return; }
        const newTask = {
            title,
            description,
            _id: idGenerator()
        }
        this.props.onAdd(newTask)
        
    }
    addTaskKyeDown = (ev) => {
        if (ev.key !== 'Enter') { return; }
        this.addTask()
    }

    render() {
        let { title } = this.state;
        const { onClose } = this.props
        return (
            <>
            <Modal
            show={true}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add new task
                </Modal.Title>
            </Modal.Header>
           <Modal.Body>
            <FormControl
                type="text" onChange={this.handleChenge} value={title}
                onKeyPress={this.addTaskKyeDown}
                name="title"
                placeholder="Title" 
                className="mb-3"
            />
            <FormControl
                as="textarea" rows={5} name='description'
                onChange={this.handleChenge} placeholder='description'
            />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={this.addTask}>Add</Button>
                <Button onClick={onClose}>Cencel</Button>
            </Modal.Footer>
        </Modal>
           
            </>
        )
    }
}


export default TaskInput;