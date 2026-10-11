'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, Trash2, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, 'Required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SettingsPage() {
  const router = useRouter();
  const { user, users, logout } = useAuthStore();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: { name: string; email: string }) => {
    // Update the user in the store
    const store = useAuthStore.getState();
    const updatedUser = { ...store.user!, name: data.name, email: data.email };
    const updatedUsers = store.users.map((u) =>
      u.id === store.user?.id ? { ...u, name: data.name, email: data.email } : u
    );
    // Zustand persist will handle saving
    (useAuthStore as any).setState({ user: updatedUser, users: updatedUsers });
    toast.success('Profile updated');
  };

  const onPasswordSubmit = (data: { currentPassword: string; newPassword: string }) => {
    const store = useAuthStore.getState();
    const currentUser = store.users.find((u) => u.id === store.user?.id);

    if (currentUser?.password !== data.currentPassword) {
      toast.error('Current password is incorrect');
      return;
    }

    const updatedUsers = store.users.map((u) =>
      u.id === store.user?.id ? { ...u, password: data.newPassword } : u
    );
    (useAuthStore as any).setState({ users: updatedUsers });
    passwordForm.reset();
    toast.success('Password changed');
  };

  const handleDeleteAccount = () => {
    const store = useAuthStore.getState();
    const updatedUsers = store.users.filter((u) => u.id !== store.user?.id);
    (useAuthStore as any).setState({ users: updatedUsers, user: null });
    logout();
    toast.success('Account deleted');
    router.push('/');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your account preferences</p>

      {/* Profile */}
      <section className="bg-white border rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold">Profile Information</h2>
            <p className="text-xs text-gray-500">Update your name and email</p>
          </div>
        </div>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            {...profileForm.register('name')}
            error={profileForm.formState.errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...profileForm.register('email')}
            error={profileForm.formState.errors.email?.message}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </section>

      {/* Password */}
      <section className="bg-white border rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold">Change Password</h2>
            <p className="text-xs text-gray-500">Keep your account secure</p>
          </div>
        </div>

        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            {...passwordForm.register('currentPassword')}
            error={passwordForm.formState.errors.currentPassword?.message}
          />
          <Input
            label="New Password"
            type="password"
            {...passwordForm.register('newPassword')}
            error={passwordForm.formState.errors.newPassword?.message}
          />
          <Input
            label="Confirm New Password"
            type="password"
            {...passwordForm.register('confirmPassword')}
            error={passwordForm.formState.errors.confirmPassword?.message}
          />
          <Button type="submit">Update Password</Button>
        </form>
      </section>

      {/* Danger zone */}
      <section className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="font-semibold text-red-900">Danger Zone</h2>
            <p className="text-xs text-red-700">Irreversible actions</p>
          </div>
        </div>

        {!showDeleteConfirm ? (
          <Button
            variant="danger"
            onClick={() => setShowDeleteConfirm(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-red-800">
              Are you sure? This will permanently delete your account and all data.
            </p>
            <div className="flex gap-2">
              <Button variant="danger" onClick={handleDeleteAccount}>
                Yes, delete forever
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}