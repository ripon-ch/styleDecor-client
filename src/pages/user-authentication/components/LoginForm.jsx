import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
    ArrowLeft
} from "lucide-react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const { signIn, signInWithGoogle, signInWithFacebook, forgotPassword } =
        useAuth();
    const navigate = useNavigate();

    const handleRedirect = userRole => {
        const role = userRole?.toLowerCase();
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "decorator") navigate("/decorator-dashboard");
        else navigate("/customer-dashboard");
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await signIn(email, password);
            if (result) {
                setLoginSuccess(true);
                setTimeout(() => handleRedirect(result.role), 1500);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async e => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await forgotPassword(email);
            setSuccess("Reset link sent! Please check your email inbox.");
            setTimeout(() => setIsForgotMode(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loginSuccess) {
        return (
            <div className="w-full max-w-md mx-auto p-8 bg-white border rounded-2xl shadow-sm text-center">
                <div className="flex justify-center mb-4 text-green-500">
                    <CheckCircle2 size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Login Successful!
                </h3>
                <p className="text-gray-600">Taking you to your dashboard...</p>
            </div>
        );
    }

    if (isForgotMode) {
        return (
            <div className="w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4">
                <button
                    onClick={() => setIsForgotMode(false)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back to Login
                </button>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Reset Password
                </h2>
                <p className="text-gray-600 mb-6">
                    Enter your email and we'll send you a recovery link.
                </p>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-100">
                            <CheckCircle2 size={18} />
                            {success}
                        </div>
                    )}

                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your email"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-blue-300"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="admin@styledecor.com"
                    />
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setIsForgotMode(true)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                        >
                            Forgot Password?
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all disabled:bg-blue-300"
                >
                    {loading ? "Verifying Account..." : "Sign In"}
                </button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-white text-gray-400 font-medium">
                        Secure Social Login
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => signInWithGoogle()}
                    className="flex items-center justify-center py-3 px-4 border rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                >
                    <img
                        className="h-5 w-5 mr-2"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                    />
                    Google
                </button>
                <button
                    onClick={() => signInWithFacebook()}
                    className="flex items-center justify-center py-3 px-4 border rounded-xl hover:bg-gray-50 font-medium text-gray-700 transition-colors"
                >
                    <img
                        className="h-5 w-5 mr-2"
                        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                        alt="Facebook"
                    />
                    Facebook
                </button>
            </div>
        </div>
    );
}
