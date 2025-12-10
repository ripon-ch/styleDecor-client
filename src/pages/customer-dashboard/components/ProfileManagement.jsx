import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProfileManagement = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName,
    email: userProfile?.email,
    phone: userProfile?.phone,
    district: userProfile?.district,
    thana: userProfile?.thana,
    address: userProfile?.address,
    emailNotifications: userProfile?.emailNotifications,
    smsNotifications: userProfile?.smsNotifications
  });

  const districtOptions = [
    { value: 'dhaka', label: 'Dhaka' },
    { value: 'chittagong', label: 'Chittagong' },
    { value: 'rajshahi', label: 'Rajshahi' },
    { value: 'khulna', label: 'Khulna' },
    { value: 'sylhet', label: 'Sylhet' },
    { value: 'barisal', label: 'Barisal' }
  ];

  const thanaOptions = {
    dhaka: [
      { value: 'dhanmondi', label: 'Dhanmondi' },
      { value: 'gulshan', label: 'Gulshan' },
      { value: 'mirpur', label: 'Mirpur' },
      { value: 'uttara', label: 'Uttara' }
    ],
    chittagong: [
      { value: 'agrabad', label: 'Agrabad' },
      { value: 'panchlaish', label: 'Panchlaish' }
    ]
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile?.fullName,
      email: userProfile?.email,
      phone: userProfile?.phone,
      district: userProfile?.district,
      thana: userProfile?.thana,
      address: userProfile?.address,
      emailNotifications: userProfile?.emailNotifications,
      smsNotifications: userProfile?.smsNotifications
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Profile Information</h2>
        {!isEditing && (
          <Button variant="outline" size="sm" iconName="Edit" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          <Select
            label="District"
            options={districtOptions}
            value={formData?.district}
            onChange={(value) => handleInputChange('district', value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Thana"
            options={thanaOptions?.[formData?.district] || []}
            value={formData?.thana}
            onChange={(value) => handleInputChange('thana', value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Address"
            type="text"
            value={formData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="pt-6 border-t border-border">
          <h3 className="text-base font-heading font-semibold text-foreground mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-3">
            <Checkbox
              label="Email Notifications"
              description="Receive booking updates and promotional offers via email"
              checked={formData?.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
              disabled={!isEditing}
            />
            <Checkbox
              label="SMS Notifications"
              description="Receive booking confirmations and reminders via SMS"
              checked={formData?.smsNotifications}
              onChange={(e) => handleInputChange('smsNotifications', e?.target?.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-6 border-t border-border">
            <Button variant="default" onClick={handleSave} iconName="Check">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagement;