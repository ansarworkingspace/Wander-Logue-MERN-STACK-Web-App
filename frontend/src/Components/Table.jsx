
import '../css/adminHome.css'
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
const TableComponent = ({ users }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    // Fetch blocked users from the server
    fetch('http://localhost:4000/api/admin/getBlockedUsers')
      .then(response => response.json())
      .then(data => {
        const blockedEmails = data.blockedUsers.map(user => user.email);
        setBlockedUsers(blockedEmails);
      })
      .catch(error => {
        console.error('Error fetching blocked users:', error);
      });
  }, []); // Run this effect only once when the component mounts

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBlockToggle = async (email) => {
    try {
      // Make an API call to toggle block status
      const response = await fetch('http://localhost:4000/api/admin/toggleBlockUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Update the blockedUsers state to reflect the change
        if (blockedUsers.includes(email)) {
          setBlockedUsers(blockedUsers.filter(userEmail => userEmail !== email));
        } else {
          setBlockedUsers([...blockedUsers, email]);
        }
      } else {
        console.error('Failed to toggle block status');
      }
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>


<div className="topHomeAdmin">
        <h3>All Users Detailes</h3>
        <div className="search-bar-Admin">
          <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
          <button><FaSearch /></button>
        </div>
      </div>

<div className='TableAdmin'>
<Table className='tableStyleAdmin' striped bordered hover responsive>
        <thead className='theadAdmin'>
          <tr>
            <th>*</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <Link to={`/admin/userProfile?email=${user.email}`}>
                  <Button style={{boxShadow:"2px 2px 0 0 #ccc",backgroundColor:"#149c64",border:"none" }}>View</Button>
                </Link>
                <Button
                  variant={blockedUsers.includes(user.email) ? "success" : "danger"}
                  className="ms-2 me-2"
                  onClick={() => handleBlockToggle(user.email)}
                  style={{
                    boxShadow: "2px 2px 0 0 #ccc",
                    backgroundColor: blockedUsers.includes(user.email) ? "#149c64" : "#dc3545",
                    border: "none"
                  }}
                >
                  {blockedUsers.includes(user.email) ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

</div>





      {/* <Table  striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/admin/userProfile?email=${user.email}`}>
                  <Button variant="primary">View</Button>
                </Link>
                <Button
                  variant={blockedUsers.includes(user.email) ? "success" : "danger"}
                  className="ms-2 me-2"
                  onClick={() => handleBlockToggle(user.email)}
                >
                  {blockedUsers.includes(user.email) ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      {/* <Form>
        <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search</Form.Label>
          <Form.Control
            style={{ width: "500px" }}
            value={searchQuery}
            type="text"
            placeholder="Search"
            onChange={handleSearch}
          />
        </Form.Group>
      </Form> */}
    </>
  );
};

export default TableComponent;

