'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';
import { API_BASE_URL } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include', // important if backend sets cookies
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to login');
      }

      if (!data?.user_id) {
        throw new Error('Invalid server response');
      }

      // TEMP storage (replace with cookie-based auth later)
      localStorage.setItem('user_id', data.user_id);

      router.push('/subjects');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="/elyaltra-logo.png"
            alt="ElyAItra"
            width={400}
            height={200}
            priority
            className={styles.logoImage}
          />
        </div>

        <p className={styles.subtitle}>
          Get exam-focused guidance tailored for
          <br />
          CSE students
        </p>

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Sign in to elyAItra</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.errorAlert} role="alert">
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
                placeholder="student@college.edu"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !email}
            >
              {isLoading ? 'Signing in…' : 'Continue →'}
            </button>
          </form>

          <p className={styles.footer}>
            No password needed. Just your email.
          </p>
        </div>
      </div>
    </div>
  );
}
