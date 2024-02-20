import React from 'react';
import './CompleteTask.css';

export const CompleteTask = () => {
    return (
        <label className="custom-checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
            Checkbox Label
        </label>
    )
}