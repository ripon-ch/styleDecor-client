// ==========================================
// FILE 1: src/pages/user-authentication/components/LoginForm.jsx
// REPLACE ENTIRE FILE
// ==========================================

import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Changed from signIn to login
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      const user = result.user;
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'decorator') {
        navigate('/decorator-dashboard');
      } else {
        navigate('/customer-dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div>
            <strong>Customer:</strong> customer@styledecor.com / customer123
          </div>
          <div>
            <strong>Decorator:</strong> decorator1@styledecor.com / decorator123
          </div>
          <div>
            <strong>Admin:</strong> admin@styledecor.com / admin123
          </div>
        </div>
      </div>
    </div>
  );
}

