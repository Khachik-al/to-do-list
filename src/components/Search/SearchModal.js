import React, { useState } from 'react'
import { Modal, FormControl, Button, Dropdown, DropdownButton, InputGroup } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import idGenerator from '../../helpers/idGenerator';
import { formatDate } from '../../helpers/utils';
import { getTasks } from '../../store/actions';
import styles from './searchStyle.module.css'

let statusOptions = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
]
let sortOptions = [
    {
        label: 'All',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation Date Oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation Date Newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion Date_oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion Date Newest',
        value: 'completion_date_newest'
    }
]

let dateOptions = [
    {
        label: 'Create lte',
        value: 'create_lte'
    },
    {
        label: 'Create gte',
        value: 'create_gte'
    },
    {
        label: 'Complete lte',
        value: 'complete_lte'
    },
    {
        label: 'Complete gte',
        value: 'complete_gte'
    },
]


function SearchModal(props) {
    let { onClose } = props

    let [search, setSearch] = useState('')
    let [status, setStatus] = useState('')
    let [sort, setSort] = useState('')
    let [date, setDate] = useState({
        create_lte: '',
        create_gte: '',
        complete_lte: '',
        complete_gte: '',
    })


    function handleChangeDate(value, name) {
        setDate({
            ...date,
            [name]: value
        })
    }
    function handleChangeSearch(ev) {
        setSearch(ev.target.value)
    }
    function handleSearch() {
        let params = {};
        search && (params.search = search)
        status.value && (params.status = status.value)
        sort.value && (params.sort = sort.value)


        for (let key in date) {
            let value = date[key];
            if (value) {
                let date = formatDate(value.toISOString())
                params[key] = date
            }
        }
        props.getTasks(params);
        onClose()
    }

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
                    Filter tasks
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Input text"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={handleChangeSearch}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
        <DropdownButton
            variant="outline-primary"
            title={status.value ? status.label : 'Status'}
        >
            {statusOptions.map((option) => (
                <Dropdown.Item
                    key={idGenerator()}
                    active={status.value === option.value}
                    onClick={() => setStatus(option)}
                >
                    {option.label}
                </Dropdown.Item>
            ))}
        </DropdownButton>
        <DropdownButton
            variant="outline-primary"
            title={sort.value ? sort.label : 'Sort'}
        >
            {sortOptions.map((option) => (
                <Dropdown.Item
                    key={idGenerator()}
                    active={sort.value === option.value}
                    onClick={() => setSort(option)}
                >
                    {option.label}
                </Dropdown.Item>
            ))}
        </DropdownButton>
        </InputGroup>
        
        {dateOptions.map((option) => (
        <div key={idGenerator()} className={styles.dateContainer}>
            <span >{option.label} :</span>
            <DatePicker
                selected={date[option.value]}
                onChange={(value) => handleChangeDate(value, option.value)}
                className={`${styles.datePicker} mt-1 mb-1`} />
        </div>
    ))} 
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={handleSearch}>Search</Button>
                <Button onClick={onClose}>Cencel</Button>
            </Modal.Footer>
        </Modal>
    )
}

let mapDispatchToState = {
    getTasks
}

export default connect(null, mapDispatchToState)(SearchModal)