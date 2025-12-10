import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const AuthStateIndicator = ({ isAuthenticated = false, user = null }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsDropdownOpen(false);
    navigate('/user-authentication');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (!isAuthenticated) {
    return (
      <Link to="/user-authentication">
        <Button variant="default" size="sm" iconName="LogIn" iconPosition="left">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="User" size={18} color="var(--color-primary)" />
        </div>
        <span className="hidden md:block text-sm font-medium text-foreground">
          {user?.name || 'User'}
        </span>
        <Icon name="ChevronDown" size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-[1000]"
            onClick={() => setIsDropdownOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-[1001]">
            <div className="p-3 border-b border-border">
              <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
            </div>

            <div className="p-2">
              <Link
                to="/customer-dashboard"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name="LayoutDashboard" size={18} />
                <span className="text-sm">Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-error"
              >
                <Icon name="LogOut" size={18} />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthStateIndicator;