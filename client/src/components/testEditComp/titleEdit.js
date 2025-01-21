import React from "react";
import { Form } from "react-bootstrap";

const TitleEdit = ({ title, description, timeLimit, onTitleChange }) => {
    return (
        <div>
            <label htmlFor="title">Title:</label>
            <Form.Control
                type="text"
                id="title"
                name="title"
                value={title || ""}
                onChange={onTitleChange}
                maxLength={20} 
                placeholder="Enter title (max 15 characters)"
            />

            <label htmlFor="description">Description:</label>
            <Form.Control
                as="textarea" 
                id="description"
                name="description"
                value={description || ""}
                onChange={onTitleChange}
                maxLength={200} 
                placeholder="Enter description (max 200 characters)"
                rows={4}
            />

            <label htmlFor="duration">Duration (minutes):</label>
            <Form.Control
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={timeLimit || ""}
                onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value) && value >= 0 && value < 1000) {
                        onTitleChange(e); 
                    }
                }}
                min="1" 
                placeholder="Enter time limit"
                maxLength={3}
            />
        </div>
    );
};

export default TitleEdit;
