// ==========================================
// FILE 1: Fixed RegisterForm.jsx
// Location: src/pages/user-authentication/components/RegisterForm.jsx
// REPLACE ENTIRE FILE
// ==========================================

import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        role: "customer"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { register } = useAuth(); // Changed from signUp to register
    const navigate = useNavigate();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            setLoading(false);
            return;
        }

        try {
            // Prepare data for registration
            const registrationData = {
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                role: formData.role
            };

            const result = await register(registrationData);

            // Registration successful - user is now logged in
            setSuccess(true);

            // Redirect based on role after 2 seconds
            setTimeout(() => {
                if (result.user.role === "decorator") {
                    navigate("/decorator-dashboard");
                } else {
                    navigate("/customer-dashboard");
                }
            }, 2000);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Registration Successful!
                </h3>
                <p className="text-green-700">
                    Your account has been created successfully. You are now
                    logged in.
                </p>
                <p className="text-sm text-green-600 mt-2">
                    Redirecting to dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div>
                    <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name *
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email *
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Phone
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Address
                    </label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your address"
                    />
                </div>

                <div>
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        I want to register as *
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="customer">Customer</option>
                        <option value="decorator">Decorator</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password *
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Minimum 6 characters"
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm Password *
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Re-enter your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}

