import React, { useState } from 'react';

export default function App() {
  // 1. Initial State for Users List
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
  ]);

  // 2. State for Form Inputs
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  // 3. State to track if we are Editing an existing user
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Handle Input Changes Dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- CRUD OPERATIONS ---

  // CREATE or UPDATE handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return alert('Please fill in all fields');

    if (isEditing) {
      // UPDATE: Map through users and replace the matching one
      setUsers(users.map(user => user.id === currentUserId ? { id: currentUserId, ...formData } : user));
      setIsEditing(false);
      setCurrentUserId(null);
    } else {
      // CREATE: Add new user with a unique ID
      const newUser = {
        id: Date.now(), // simple unique ID generation
        ...formData
      };
      setUsers([...users, newUser]);
    }

    // Reset Form
    setFormData({ name: '', email: '' });
  };

  // READ (Trigger Edit Mode)
  const startEdit = (user) => {
    setIsEditing(true);
    setCurrentUserId(user.id);
    setFormData({ name: user.name, email: user.email }); // Populate form
  };

  // DELETE handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // Cancel Edit Mode
  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '' });
    setCurrentUserId(null);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h2>React CRUD Application (User Directory)</h2>

      {/* --- FORM (CREATE / UPDATE) --- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', background: '#f4f4f4', borderRadius: '5px' }}>
        <h3>{isEditing ? 'Update User' : 'Create New User'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            value={formData.name} 
            onChange={handleInputChange}
            style={{ width: '95%', padding: '8px', marginBottom: '10px' }}
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email} 
            onChange={handleInputChange}
            style={{ width: '95%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          {isEditing ? 'Save Changes' : 'Add User'}
        </button>
        {isEditing && (
          <button type="button" onClick={cancelEdit} style={{ marginLeft: '10px', padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </form>

      {/* --- LIST (READ / DELETE) --- */}
      <h3>Active Users ({users.length})</h3>
      {users.length === 0 ? (
        <p>No users found. Add one above!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{user.name}</td>
                <td style={{ padding: '10px' }}>{user.email}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>
                  <button 
                    onClick={() => startEdit(user)} 
                    style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}