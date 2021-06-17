import React, { Component, createRef } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../../helpers/utils';
import styles from './styleEditTask.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editTasks } from '../../store/actions';

class EditTask extends Component {
    constructor(props) {
        super(props)
        this.titleInputRef = createRef()
    }

    state = {
        ...this.props.editingTask,
        date: new Date(this.props.editingTask.date)

    };
    componentDidMount() {
        this.titleInputRef.current.focus()
    }

    handleChenge = (event) => {
        let { value, name } = event.target;
        this.setState({
            [name]: value
        })
    };
    editTask = () => {
        let title = this.state.title.trim();
        let description = this.state.description.trim();
        let date = formatDate(this.state.date.toISOString());
        if (!title) { return; }
        const editedTask = {
            ...this.state,
            title,
            description,
            date
        }
        this.props.editTasks(editedTask, this.props.tasks)

    }
    EditTaskKyeDown = (ev) => {
        if (ev.key !== 'Enter') { return; }
        this.editTask()
    }
    handleChengeDate = (value) => {
        this.setState({
            date: value || new Date()
        })
    }

    render() {
        let { title, description, date } = this.state;
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
                        Edit task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        type="text" onChange={this.handleChenge} value={title}
                        onKeyPress={this.EditTaskKyeDown}
                        name="title"
                        placeholder="Title"
                        className="mb-3"
                        ref={this.titleInputRef}
                    />
                    <FormControl
                        as="textarea" rows={5} name='description'
                        value={description}
                        onChange={this.handleChenge} placeholder='description'
                    />
                    <DatePicker
                        minDate={new Date()}
                        selected={date}
                        onChange={this.handleChengeDate}
                        className={`${styles.datePicker} mt-3`} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={this.editTask}>Edit</Button>
                    <Button onClick={onClose}>Cencel</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

EditTask.propTypes = {
    onClose: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        tasks: state.tasks,
        editingTask: state.editingTask
    }
}
let mapDispatchtoProps = {
    editTasks
}

export default connect(mapStateToProps, mapDispatchtoProps)(EditTask);

