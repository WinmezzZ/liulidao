'use client';

import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EditProfileButton() {
  const handleEditProfile = () => {
    // Handle edit profile logic here
    console.log('Edit profile clicked');
  };

  return (
    <Button
      onClick={handleEditProfile}
      className="bg-primary hover:bg-primary/90"
    >
      <Edit className="mr-2 h-4 w-4" />
      Edit Profile
    </Button>
  );
}
