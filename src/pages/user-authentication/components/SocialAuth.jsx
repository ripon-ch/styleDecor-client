import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialAuth = () => {
  const socialProviders = [
    { name: 'Google', icon: 'Chrome', color: 'text-[#4285F4]' },
    { name: 'Facebook', icon: 'Facebook', color: 'text-[#1877F2]' }
  ];

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.name)}
            className="w-full"
          >
            <Icon name={provider?.icon} size={18} className={provider?.color} />
            <span className="ml-2">{provider?.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;