import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.jsx";

import PrimaryNav from '@/components/navigation/PrimaryNav.jsx';
import Breadcrumb from '@/components/navigation/Breadcrumb.jsx';
import Icon from '@/components/AppIcon.jsx';
import AuthTabs from './components/AuthTabs.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import SocialAuth from './components/SocialAuth.jsx';
import TrustSignals from './components/TrustSignals.jsx';
import Footer from '../home-landing/components/Footer.jsx';
import showAlert from '../../utils/alert.js';

const UserAuthentication = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth(); // Destructure signIn if you need it directly, though LoginForm handles it usually
  const [isLogin, setIsLogin] = useState(true);

  const handleTabChange = (tabId) => {
    setIsLogin(tabId === 'login');
  };

  // ✅ FIX: Async function that doesn't rely on .then()
  const handleAuthSuccess = async (userData, isLoginMode) => {
    if (isLoginMode) {
      // 1. Show Alert (await if possible, but safely)
      try {
        if (showAlert?.success) {
          await showAlert.success(
            'Login Successful!',
            `Welcome back, ${userData?.name || 'User'}!`
          );
        }
      } catch (e) {
        console.log("Alert skipped or failed, proceeding to redirect");
      }
      
      // 2. FORCE Redirect immediately after
      console.log("Redirecting user with role:", userData?.role);
      
      switch(userData?.role) {
        case 'customer':
          navigate('/customer-dashboard');
          break;
        case 'decorator':
          navigate('/decorator-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        default:
          navigate('/customer-dashboard'); // Fallback
      }

    } else {
      // Registration Logic
      if (showAlert?.success) {
        await showAlert.success(
          'Registration Successful!',
          'Your account has been created successfully!'
        );
      }
      navigate('/customer-dashboard');
    }
  };

 

  return (
    <div className="min-h-screen bg-background">
      <PrimaryNav />
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
            {/* Left Side (Info) - Order 2 on mobile, Order 1 on Desktop */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Sparkles" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-foreground">Welcome to StyleDecor</h1>
                      <p className="text-muted-foreground">Your trusted decoration partner in Bangladesh</p>
                    </div>
                  </div>
                </div>

                <TrustSignals />

                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} color="var(--color-primary)" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Need Help?</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our customer support team is available 24/7 to assist you.
                      </p>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 text-foreground">
                          <Icon name="Phone" size={16} />
                          <span>+880 1712-345678</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Icon name="Mail" size={16} />
                          <span>support@styledecor.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side (Forms) - Order 1 on mobile, Order 2 on Desktop */}
            <div className="order-1 lg:order-2">
              <div className="bg-card border border-border rounded-lg shadow-base p-6 sm:p-8">
                <AuthTabs activeTab={isLogin ? 'login' : 'register'} onTabChange={handleTabChange} />

                <div className="mb-6">
                  {isLogin ? (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-2">Login to Your Account</h2>
                      <p className="text-sm text-muted-foreground">Enter your credentials to access your dashboard</p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold text-foreground mb-2">Create New Account</h2>
                      <p className="text-sm text-muted-foreground">Join thousands of satisfied customers</p>
                    </>
                  )}
                </div>

                {isLogin ? (
                  <LoginForm onSuccess={handleAuthSuccess} />
                ) : (
                  <RegisterForm onSuccess={handleAuthSuccess} />
                )}

                <div className="mt-6">
                  <SocialAuth />
                </div>

                {isLogin ? (
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-primary font-medium hover:underline"
                    >
                      Register now
                    </button>
                  </p>
                ) : (
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-primary font-medium hover:underline"
                    >
                      Login here
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserAuthentication;