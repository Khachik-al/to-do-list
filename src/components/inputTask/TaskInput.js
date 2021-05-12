import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styles from './styleInputGroup.module.css';
import idGenerator from '../../helpers/idGenerator';
import PropTypes from 'prop-types';

class TaskInput extends Component {

    static propTypes = {
        selectedTasksId: PropTypes.object.isRequired,
        onAdd: PropTypes.func.isRequired
    };

    state = {
        title: '',
        description: ''
    };

    handleChenge = (ev) => {
        this.setState({
            title: ev.target.value
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
        this.setState({
            title: ''
        })
    }
    addTaskKyeDown = (ev) => {
        if (ev.key !== 'Enter') { return; }
        this.addTask()
    }

    render() {
        let { title } = this.state;
        const { selectedTasksId } = this.props
        return (
            <InputGroup className="mb-3 mt-4">
                <FormControl
                    type="text" onChange={this.handleChenge} value={title}
                    className={styles.input}
                    onKeyDown={this.addTaskKyeDown}
                    placeholder="Input new task" disabled={selectedTasksId.size}
                />
                <InputGroup.Append>
                    <Button
                        onClick={this.addTask} style={{ fontSize: '20px' }}
                        variant="outline-primary" disabled={selectedTasksId.size}>Add task</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}


export default TaskInput;