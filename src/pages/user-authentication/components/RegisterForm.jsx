import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // This calls the signUp in your AuthContext
      await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone,
        formData.address,
        formData.role
      );

      // Save role to localStorage immediately to prevent redirect issues
      localStorage.setItem('userRole', formData.role);
      
      setSuccess(true);
      
      // Auto-redirect to their specific dashboard after 2 seconds
      setTimeout(() => {
        navigate(`/${formData.role}-dashboard`);
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Account Created!</h3>
        <p className="text-green-700">Redirecting you to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input name="fullName" type="text" value={formData.fullName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="email@example.com" />
        </div>

        {/* Phone & Address */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg bg-white">
              <option value="customer">Customer</option>
              <option value="decorator">Decorator</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input name="address" type="text" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" placeholder="123 Street, City" />
        </div>

        {/* Passwords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} required minLength={6} className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
          <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}