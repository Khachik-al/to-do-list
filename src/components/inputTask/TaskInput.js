import React, { Component,createRef} from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import styles from './styleInputGroup.module.css';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../../helpers/utils';
import { connect } from 'react-redux';
import { addTask } from '../../store/actions';

class TaskInput extends Component {
    constructor(props){
        super(props)
        this.titleInputRef=createRef();
    }


    static propTypes = {
        onClose: PropTypes.func.isRequired
    };

    state = {
        title: '',
        description: '',
        date: new Date()
    };

    componentDidMount(){
        this.titleInputRef.current.focus()
    }
   

    handleChenge = (event) => {
        let { value, name } = event.target;
        this.setState({
            [name]: value
        })
    };
    handleChengeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
    }
    addTask = () => {
        let title = this.state.title.trim();
        let description = this.state.description.trim();
        let date = formatDate(this.state.date.toISOString());
        if (!title) { return; }
        const newTask = {
            title,
            description,
            date
        }
        this.props.addTask(newTask)

    };
    addTaskKyeDown = (ev) => {
        if (ev.key !== 'Enter') { return; }
        this.addTask()
    };

    render() {
        
        
        let { title } = this.state;
        const { onClose } = this.props
        return (
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
                        ref={this.titleInputRef}
                    />
                    <FormControl
                        as="textarea" rows={5} name='description'
                        onChange={this.handleChenge} placeholder='description'
                    />
                    <DatePicker
                        minDate={new Date()}
                        selected={this.state.date}
                        onChange={this.handleChengeDate} 
                        className={`${styles.datePicker} mt-3`}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={this.addTask}>Add</Button>
                    <Button onClick={onClose}>Cencel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

let mapDispatchtoProps={
    addTask,
}

export default connect(null, mapDispatchtoProps)(TaskInput);