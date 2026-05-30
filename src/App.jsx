import React, { useState } from 'react';

export default function App() {
  //user adding variable
  const  [users,setUsers] = useState([]);

  const [name,setName]  = useState("");
  const [email,setEmail] = useState("");

  const [editId, setEditId] = useState(null);

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (editId) {
      // 1. UPDATE LOGIC: Agar editId mojud hai, toh purane user ko badlo
      const updatedUsers = users.map((x) => 
        x.id === editId ? { id: editId, name: name, email: email } : x
      );
      setUsers(updatedUsers);
      setEditId(null); // Edit mode khatam
    }else{
    const newUser ={
      id:Date.now(),
      name:name,
      email:email
    }
    setUsers([...users,newUser]);

    }

    
    //clear the input fields after submission
    console.log(name);
    console.log(email);
    setName("");
    setEmail("");




  }

  const deleteUser =(id)=>{
    const udpateUsers = users.filter((x)=> x.id !== id);
    setUsers(udpateUsers);
  }

  const editUser =(id)=>{
    const userToEdit = users.find((x)=> x.id === id );
    if(userToEdit){
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setEditId(id);
      
    }
  
    }






  return(
       
    <div>
      <h1>App</h1>
        <form onSubmit= {handleSubmit}>
          <input type="text" 
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input  type ="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{editId ? "Update User" : "Add User"}</button>
        </form>


        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((x)=>{
              return(
                <tr key={x.id}>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td><button
                  onClick={() => deleteUser(x.id)}
                  >
                    Delete</button></td>
                  <td><button
                  onClick={() => editUser(x.id)}
                  >Edit</button></td>
                </tr>
              );
            })}
        </tbody>
        </table>
    </div>
  );
}