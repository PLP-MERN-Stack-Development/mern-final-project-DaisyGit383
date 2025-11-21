import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import api from '../api/api';

// Mock the API module
vi.mock('../api/api', () => ({
  get: vi.fn(),
  post: vi.fn(),
}));

describe('CBC Peer Tutoring App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Home page correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome to CBC Peer Tutoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Mission:/i)).toBeInTheDocument();
    expect(screen.getByText(/Join us and enhance your learning/i)).toBeInTheDocument();
  });

  it('renders About page correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/About CBC Peer Tutoring/i)).toBeInTheDocument();
    expect(screen.getByText(/Our mission is to support students/i)).toBeInTheDocument();
  });

  it('renders Dashboard page', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it('fetches and displays resources', async () => {
    const mockResources = [
      { _id: '1', title: 'Mathematics Notes', description: 'Algebra Basics', link: 'http://example.com/math' },
      { _id: '2', title: 'Science Notes', description: 'Physics Basics', link: 'http://example.com/science' },
    ];

    api.get.mockResolvedValueOnce({ data: mockResources });

    render(
      <MemoryRouter initialEntries={['/resources']}>
        <App />
      </MemoryRouter>
    );

    // Wait for the API call to populate resources
    await waitFor(() => {
      expect(screen.getByText(/Mathematics Notes/i)).toBeInTheDocument();
      expect(screen.getByText(/Science Notes/i)).toBeInTheDocument();
    });
  });

  it('renders Journal page', async () => {
    render(
      <MemoryRouter initialEntries={['/journal']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Journal/i)).toBeInTheDocument();
  });

  it('renders Sessions page', async () => {
    render(
      <MemoryRouter initialEntries={['/sessions']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sessions/i)).toBeInTheDocument();
  });

  it('renders Login page', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('renders Register page', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });
});
