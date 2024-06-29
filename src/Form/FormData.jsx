import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const FormData = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [data, setData] = useState([]);
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    // setData(formData);
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-50">
          <h2 className="text-center">Form Data</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Email </Form.Label>
              <Form.Control type="email" placeholder="Enter Email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password </Form.Label>
              <Form.Control type="email" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>

      <h2>Table </h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Users No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((e, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
              </tr>
            );
          })}
          {/* <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr> */}
        </tbody>
      </Table>
    </>
  );
};
