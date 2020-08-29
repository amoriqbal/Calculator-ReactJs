import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CButton from "./CButton";
import Container from 'react-bootstrap/Container';
export default function ({ inputHandle }) {
  //inputHandle = (x) => {};
  return (
    <Container>
      <Row>
        <Col md={4} xs={12}>
          <Card body className="container">
            <Row className="form-group">
              <Col>              
                <CButton val="b" inputHandle={inputHandle}>Del</CButton>
              </Col>
              <Col>
                <CButton val="AC" inputHandle={inputHandle}></CButton>
              </Col>
            
              <Col>
                <CButton val="+" inputHandle={inputHandle}></CButton>
              </Col>
              </Row>
            <Row className="form-group">
              <Col>
                <CButton val="-" inputHandle={inputHandle}></CButton>
              </Col>
            
              <Col>
                <CButton val="*" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="/" inputHandle={inputHandle}></CButton>
              </Col>
            </Row>
          </Card>
        </Col>
      
        <Col md={8} xs={12}>
          <Card body className="container">
            <Row className="form-group">
              <Col>
                <CButton val="1" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="2" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="3" inputHandle={inputHandle}></CButton>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <CButton val="4" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="5" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="6" inputHandle={inputHandle}></CButton>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <CButton val="7" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="8" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="9" inputHandle={inputHandle}></CButton>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <CButton val="." inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="0" inputHandle={inputHandle}></CButton>
              </Col>
              <Col>
                <CButton val="=" inputHandle={inputHandle}></CButton>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
