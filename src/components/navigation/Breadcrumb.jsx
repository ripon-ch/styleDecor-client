import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location?.pathname?.split('/')?.filter((x) => x);

  const breadcrumbNameMap = {
    'home-landing': 'Home',
    'user-authentication': 'Login',
    'services-catalog': 'Services',
    'service-details': 'Service Details',
    'customer-dashboard': 'Dashboard',
    'payment-processing': 'Payment',
  };

  const getBreadcrumbName = (path) => {
    return breadcrumbNameMap?.[path] || path?.charAt(0)?.toUpperCase() + path?.slice(1);
  };

  if (pathnames?.length === 0 || location?.pathname === '/home-landing') {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div className="breadcrumb-item">
        <Link to="/home-landing" className="breadcrumb-link">
          <Icon name="Home" size={16} />
        </Link>
      </div>
      {pathnames?.map((path, index) => {
        const routeTo = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
        const isLast = index === pathnames?.length - 1;

        return (
          <React.Fragment key={routeTo}>
            <span className="breadcrumb-separator">
              <Icon name="ChevronRight" size={16} />
            </span>
            <div className="breadcrumb-item">
              {isLast ? (
                <span className="text-foreground font-medium">
                  {getBreadcrumbName(path)}
                </span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {getBreadcrumbName(path)}
                </Link>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;