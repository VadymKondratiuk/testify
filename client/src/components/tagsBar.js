import React from 'react'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { TYPE_ROUTE } from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const TagsBar = observer(() => {
    const {test} = useContext(Context)
    const navigate = useNavigate()
    
    return (
        <ListGroup>
            <ListGroup.Item>Math</ListGroup.Item>
            <ListGroup.Item>Geography</ListGroup.Item>
            <ListGroup.Item>Computer Science</ListGroup.Item>
            <ListGroup.Item>Biology</ListGroup.Item>
            <ListGroup.Item>History</ListGroup.Item>
            <ListGroup.Item>English</ListGroup.Item>
            <ListGroup.Item>Literature</ListGroup.Item>
            <ListGroup.Item>Movies</ListGroup.Item>
            <ListGroup.Item>Rules</ListGroup.Item>
        </ListGroup>
    );
});

export default TagsBar;