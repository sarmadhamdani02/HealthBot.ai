// src/app/(auth)/reset-password/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase'; 
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { useSearchParams, useRouter } from 'next/navigation';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get oobCode from URL
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    if (!oobCode) {
      setError('Invalid or missing password reset code.');
    } else {
      verifyPasswordResetCode(auth, oobCode).catch(() => {
        setError('Invalid or expired password reset code.');
      });
    }
  }, [oobCode]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (!oobCode) {
        throw new Error('Invalid or missing password reset code.');
      }
      
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('Password reset successful! You can now log in with your new password.');
      router.push('/login');
    } catch (error: any) {
      // Enhanced error handling
      setError(error.message || 'Failed to reset password. Please check your connection.');
      console.error("Reset password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
      
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleResetPassword} className="w-full max-w-md">
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="text-black border p-2 w-full mb-4 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="mt-4">
        Go back to{' '}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
