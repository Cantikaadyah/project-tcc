// EditUser.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(`https://project-tcc-be2-cukmw4ni3a-et.a.run.app/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch user data');
            setLoading(false);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://tugas-akhir-tcc-fix.as.r.appspot.com/users/${id}`, {
                name,
                email,
                gender
            });
            navigate('/users');
        } catch (error) {
            setError('Failed to update user data');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={updateUser}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <select 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditUser;
