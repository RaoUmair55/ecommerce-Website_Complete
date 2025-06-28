import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Profile = () => {
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data.user);
        setForm({ name: data.user.name, email: data.user.email, password: '' });
      } catch (err) {
        showToast('Failed to load profile', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_LINK}/api/user/profile`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data.user);
      setForm(f => ({ ...f, password: '' }));
      showToast('Profile updated successfully!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 animate__animated animate__fadeIn">
            <div className="row g-4 align-items-center">
              {/* User Info Section */}
              <div className="col-md-5 text-center text-md-start border-end">
                <div className="d-flex flex-column align-items-center align-items-md-start">
                  <div className="avatar bg-gradient rounded-circle border-black border-4 d-flex align-items-center justify-content-center mb-3" style={{ width: 90, height: 90, fontSize: 36, color: '#000', background: 'linear-gradient(135deg, #e52e71 0%, #ff8a00 100%)' }}>
                    {getInitials(user?.name)}
                  </div>
                  <h3 className="fw-bold mb-1">{user?.name}</h3>
                  <div className="text-muted mb-2">{user?.email}</div>
                  <div className="small text-secondary">Joined: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</div>
                </div>
              </div>
              {/* Update Form Section */}
              <div className="col-md-7 mt-4 mt-md-0">
                <h4 className="mb-3">Update Profile</h4>
                <form onSubmit={handleSubmit} className="">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password <span className="text-muted">(leave blank to keep current)</span></label>
                    <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 