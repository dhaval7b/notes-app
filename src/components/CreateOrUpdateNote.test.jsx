import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateOrUpdateNote from './CreateOrUpdateNote';
import { createNote } from '../apiService';
import { useParams } from 'react-router-dom';

jest.mock('../apiService', () => ({
  createNote: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('CreateOrUpdateNote - Create new note', () => {
  const handleCloseMock = jest.fn();

  beforeEach(() => {
    createNote.mockClear();
    handleCloseMock.mockClear();
    useParams.mockReturnValue({ id: '123' }); // Mock the useParams hook
  });

  it('should create a new note successfully', async () => {
    render(
      <CreateOrUpdateNote type="create" handleClose={handleCloseMock} />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Note' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'This is a test note content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(createNote).toHaveBeenCalledWith({
        title: 'Test Note',
        content: 'This is a test note content',
        id: expect.any(String),
        createTime: expect.any(String),
      });
      expect(handleCloseMock).toHaveBeenCalled();
    });
  });
});
