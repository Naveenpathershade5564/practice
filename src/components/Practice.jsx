import React, { useState } from 'react';

function Practice() {
    const [users, setUsers] = useState([{ id: 1, name: "naveen", title: 'front end' }]);
    const [formData, setFormData] = useState({ name: '', title: '' });
    const [editUserId, setEditUserId] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
            const newUser = {
                id: users.length + 1,
                name: formData.name,
                title: formData.title
            };
            setUsers([...users, newUser]);
        // }
        setFormData({ name: '', title: '' });
    };

    const deleteUser = (userId) => {
        alert('delete user')
        setUsers(users.filter(user => user.id !== userId));
        setFormData({ name: '', title: '' });
        setEditUserId(null);
    };

    const editFn = (user) => {
        setFormData({ name: user.name, title: user.title });
        setEditUserId(user);
    };
    const saveUser =()=>{
        const updateduser = users.map((user)=>user.id ===editUserId ?{...user,name:formData.name ,title:formData.title}:user)
        setUsers(updateduser);
            setEditUserId(null);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter Title:</label>
                <input
                    type='text'
                    placeholder='Enter your title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label>Enter Name:</label>
                <input
                    type='text'
                    placeholder='Enter your name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />
                <br />
                {editUserId ? (
                    <button type='button' onClick={saveUser}>Save</button>
                ) : (
                    <button type='submit'>Add</button>
                )}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.title}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                                <button onClick={() => editFn(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Practice;
