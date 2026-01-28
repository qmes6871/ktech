'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState('');

  async function handleLogin() {
    setDebug('handleLogin called');
    console.log('handleLogin called');

    if (loading) return;

    setError('');
    setLoading(true);
    setDebug('Sending request...');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();
      setDebug('Response: ' + JSON.stringify(data));

      if (!res.ok) {
        setError(data.error || '로그인 실패');
        setLoading(false);
        return;
      }

      setDebug('Login success, redirecting...');
      window.location.href = '/admin/products';
    } catch (err) {
      setDebug('Error: ' + String(err));
      setError('서버 연결 실패');
      setLoading(false);
    }
  }

  function handleButtonClick(e: React.MouseEvent) {
    e.preventDefault();
    console.log('Button clicked!');
    setDebug('Button clicked!');
    handleLogin();
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        padding: '32px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          K-TECH 관리자
        </h1>
        <p style={{
          color: '#666',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          관리자 계정으로 로그인하세요
        </p>

        {debug && (
          <div style={{
            backgroundColor: '#e0f2fe',
            border: '1px solid #7dd3fc',
            color: '#0369a1',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '12px',
            wordBreak: 'break-all'
          }}>
            Debug: {debug}
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>
            아이디
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => {
              console.log('ID changed:', e.target.value);
              setId(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="admin"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              console.log('Password changed');
              setPassword(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
            placeholder="비밀번호"
          />
        </div>

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: loading ? '#93c5fd' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>

        <div style={{ marginTop: '16px', fontSize: '12px', color: '#666' }}>
          <p>ID: {id || '(empty)'}</p>
          <p>Password: {password ? '****' : '(empty)'}</p>
        </div>
      </div>
    </div>
  );
}
