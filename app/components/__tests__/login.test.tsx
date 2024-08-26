import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Login from '../Login';

const mockOnLogin = jest.fn();

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ 'School Name': 'Test School' }]),
  })
) as jest.Mock;

describe('Login Component', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Login onLogin={mockOnLogin} />);
    });
  });

  it('renders the login form', async () => {
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByText('Select your school')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test School')).toBeInTheDocument();
    });
  });

  it('calls onLogin with correct data when form is submitted', async () => {
    const schoolSelect = screen.getByRole('combobox');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await act(async () => {
      fireEvent.change(schoolSelect, { target: { value: 'Test School' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    await act(async () => {
      fireEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('Test School', 'password123');
    });
  });
});