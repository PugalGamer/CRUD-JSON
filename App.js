import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [db, setDb] = useState([]);
  const [id, setUid] = useState("");
  const [name, setUname] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3003/users`)
      .then((res) => {
        setDb(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let datas = {
      id: id,
      name: name,
    };
    if (id && name) {
      axios
        .post(`http://localhost:3003/users`, datas)
        .then((res) => {
          console.log(res.data);
          toast.success("Inserted !", {
            position: "top-right",
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error !", {
            position: "top-left",
          });
        });
    } else {
      toast.warning("Please fill all fiedls");
    }
    console.log("inserted");
  };

  const updateUser = (id) => {
    let datas = {
      id: id,
      name: name,
    };
    if (id && name) {
      axios.put(`http://localhost:3003/users/${id}`, datas).then((res) => {
        console.log(res.data);
        toast.success("Updated !", {
          position: "top-right",
          theme: "colored",
        });
      });
    } else {
      toast.warning("Please fill all fiedls");
    }
    console.log("updated");
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3003/users/${id}`)
      .then((res) => {
        console.log(res.data);
        toast.success("Deleted !", {
          position: "top-right",
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("deleted");
  };
  return (
    <div className="App">
      <h1>Frontend json CRUD</h1>

      <Form onSubmit={handleSubmit} className="p-2">
        <Row>
          <Col sx={4}>
            <Form.Control
              required
              type="number"
              placeholder="Id"
              onChange={(e) => setUid(e.target.value)}
            />
          </Col>
          <Col sx={4}>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              onChange={(e) => setUname(e.target.value)}
            />
          </Col>
          <Col sx={4}>
            <Button
              size="sm"
              className=" shadow "
              type="submit"
              variant="outline-success"
            >
              Create
            </Button>
            <ToastContainer />
          </Col>
        </Row>
      </Form>

      <Row className="mt-5 p-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {db?.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>
                  <Button
                    onClick={() => updateUser(e.id)}
                    size="sm"
                    variant="outline-info"
                  >
                    Update
                  </Button>
                  <ToastContainer />
                </td>
                <td>
                  <Button
                    onClick={() => deleteUser(e.id)}
                    size="sm"
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                  <ToastContainer />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
}

export default App;
