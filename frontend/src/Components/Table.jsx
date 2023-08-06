
 

// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button'; // Import the Button component
// import { Link } from 'react-router-dom'; // Import Link component

// const TableComponent = ({ users }) => {
  
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//     <Table striped bordered hover responsive>
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Options</th> {/* Add a new column for buttons */}
//         </tr>
//       </thead>
//       <tbody>
//         {filteredUsers.map((user, index) => (
//           <tr key={index}>
//             <td>{index + 1}</td>
//             <td>{user.name}</td>
//             <td>{user.email}</td>
//             <td>
//             <Link to={`http://localhost:4000/api/admin/userProfile?email=${user.email}`}>
//   <Button variant="primary">View</Button>
// </Link>

//               <Button variant="danger" className="ml-2">Block </Button> {/* Block Red Color button */}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//     <Form>
//       <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
//         <Form.Label>Search</Form.Label>
//         <Form.Control style={{width:"500px"}} value={searchQuery} type="text" placeholder="Search" onChange={handleSearch} />
//       </Form.Group>
//     </Form>
//     </>
//   );
// };

// export default TableComponent;




import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const TableComponent = ({ users }) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Table striped bordered hover responsive>
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
                <Button variant="danger" className="ml-2">Block</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
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
      </Form>
    </>
  );
};

export default TableComponent;
