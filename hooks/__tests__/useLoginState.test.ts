import { renderHook, act } from '@testing-library/react';
import { useLoginState } from '../useLoginState';

describe('useLoginState Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    global.fetch = jest.fn();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useLoginState());
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.schoolName).toBe('');
  });

  it('logs in successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, token: 'fake-token' }),
    });

    const { result } = renderHook(() => useLoginState());

    await act(async () => {
      const success = await result.current.login('Test School', 'password123');
      expect(success).toBe(true);
    });

    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.schoolName).toBe('Test School');
    expect(localStorage.getItem('authToken')).toBe('fake-token');
    expect(localStorage.getItem('schoolName')).toBe('Test School');
  });

  it('handles login failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false }),
    });

    const { result } = renderHook(() => useLoginState());

    await act(async () => {
      const success = await result.current.login('Test School', 'wrong-password');
      expect(success).toBe(false);
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.schoolName).toBe('');
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('schoolName')).toBeNull();
  });

  it('logs out successfully', () => {
    localStorage.setItem('authToken', 'fake-token');
    localStorage.setItem('schoolName', 'Test School');

    const { result } = renderHook(() => useLoginState());

    act(() => {
      result.current.logout();
    });

    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.schoolName).toBe('');
    expect(localStorage.getItem('authToken')).toBeNull();
    expect(localStorage.getItem('schoolName')).toBeNull();
  });
});