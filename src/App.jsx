import React, { useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editId) {
      const updatedUsers = users.map((x) =>
        x.id === editId ? { id: editId, name, email } : x
      );
      setUsers(updatedUsers);
      setEditId(null);
    } else {
      const newUser = {
        id: Date.now(),
        name,
        email
      };
      setUsers([...users, newUser]);
    }
    setName("");
    setEmail("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((x) => x.id !== id));
  };

  const editUser = (id) => {
    const userToEdit = users.find((x) => x.id === id);
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setEditId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6 antialiased">
      <div className="w-full max-w-2xl bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Header section with gradient */}
        <div className="p-8 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-800/50">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            User Workspace
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage active system members and credentials.</p>
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="p-8 border-b border-slate-700/50 bg-slate-800/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className={`w-full md:w-auto px-6 py-3 rounded-xl font-medium tracking-wide shadow-lg transition-all duration-200 transform active:scale-95 ${
                editId
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-orange-950/20'
                  : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 shadow-indigo-950/20'
              }`}
            >
              {editId ? "Save Changes" : "Create User"}
            </button>
          </div>
        </form>

        {/* Results/Table Section */}
        <div className="p-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Active Directory ({users.length})
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-700/60 rounded-xl">
              <p className="text-slate-500 text-sm font-medium">No active records found.</p>
              <p className="text-slate-600 text-xs mt-1">Fill out the fields above to populate the registry.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-700/40 rounded-xl hover:border-slate-600/60 transition group"
                >
                  <div className="truncate pr-4">
                    <p className="font-semibold text-slate-200 truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-90 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                    <button
                      onClick={() => editUser(user.id)}
                      className="p-2 text-slate-400 hover:text-amber-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                      title="Edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}