import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import styles from './styleInputGroup.module.css'

class TaskInput extends Component {

    render() {
        const { inputValue, selectedTasksId, handleChenge, addTask, addTaskKyeDown } = this.props
        return (
            <InputGroup className="mb-3 mt-4">
                <FormControl
                    type="text" onChange={(event) => handleChenge(event)} value={inputValue}
                    className={styles.input} onKeyDown={addTaskKyeDown}
                    placeholder="Input new task" disabled={selectedTasksId.size}
                />
                <InputGroup.Append>
                    <Button
                        onClick={addTask} style={{ fontSize: '20px' }}
                        variant="outline-primary" disabled={selectedTasksId.size}>Add task</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
export default TaskInput;