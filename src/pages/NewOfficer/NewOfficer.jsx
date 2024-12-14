import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './style.css'

function NewOfficer() {
    const [officerData, setOfficerData] = useState({
        name: '',
        rank: '',
        status: 'returned',
        metalNo: '',
        duty: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOfficerData({ ...officerData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://armoury-backend-ti9n.onrender.com/api/officers', officerData)
            .then(response => {
                alert('Officer added successfully!');
                setOfficerData({
                    name: '',
                    rank: '',
                    status: 'returned',
                    metalNo: '',
                    duty: ''
                }); // Reset form
            })
            .catch(error => {
                console.error('Error adding officer:', error);
                alert('Failed to add officer');
            });
    };

    return (
        <Container className="mt-5">
             <h3 className="text-white mb-4 border-bottom border-light pb-3">Add New Officer</h3>
           <div className="row">
            <div className="col-md-11 new-weapon p-3 m-auto">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Officer Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter officer name"
                                name="name"
                                value={officerData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formMetalNo">
                            <Form.Label>Metal Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter metal number"
                                name="metalNo"
                                value={officerData.metalNo}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formRank">
                            <Form.Label>Rank</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter rank"
                                name="rank"
                                value={officerData.rank}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formDuty">
                            <Form.Label>Duty</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter duty"
                                name="duty"
                                value={officerData.duty}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={officerData.status}
                                onChange={handleInputChange}
                            >
                                <option value="returned">Returned</option>
                                <option value="recieved">Received</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <button  type="submit" className="mt-3 g-btn px-5">Submit</button>
            </Form>
            </div>
           </div>
        </Container>
    );
}

export default NewOfficer;
