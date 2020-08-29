import React from 'react';
import Button from 'react-bootstrap/Button';
import './CButton.css';

export default function({val, inputHandle, children}){
    return (
        <Button className="large-text stretch btn btn-dark" onClick={(e)=>inputHandle(val)}>{(children?children:`${val}`)}</Button>
    )
}