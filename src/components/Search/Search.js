import React from 'react'
import { connect } from 'react-redux'
import { FormControl, Button, InputGroup, } from 'react-bootstrap';
import { useState } from 'react';
import { getTasks } from '../../store/actions';
import SearchModal from './SearchModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';



function Search({ getTasks }) {

    let [showModal, setShowModal] = useState(false)
    let [search, setSearch] = useState('')

    function handleChangeSearch(ev) {
        setSearch(ev.target.value)
    }
    function handleSearch() {
        let params = {};
        search && (params.search = search)
        getTasks(params);
        setSearch('')
    }
    function toggleSearchModal() {
        setShowModal(!showModal)
    }
    function SearchTaskKyeDown(ev){
        if (ev.key !== 'Enter') { return; }
        handleSearch()
    };
    return (
        <div>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    onChange={handleChangeSearch}
                    onKeyPress={SearchTaskKyeDown}
                    value={search}
                />
                <Button
                    variant="outline-primary"
                    onClick={toggleSearchModal}
                >
                    <FontAwesomeIcon icon={faFilter} />
                </Button>
                <Button
                    onClick={handleSearch}
                    variant="outline-primary"
                >
                    Search
                </Button>
            </InputGroup>
            {showModal &&
                <SearchModal
                    onClose={toggleSearchModal}
                />}
        </div>
    )
}
let mapDispatchToState = {
    getTasks
}

export default connect(null, mapDispatchToState)(Search)