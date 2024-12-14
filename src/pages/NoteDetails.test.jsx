import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteDetails from './NoteDetails';
import { deleteNote, getNoteById } from '../apiService';
import '@testing-library/jest-dom';
import { useParams, useHistory } from 'react-router-dom';

// Mock the API service
jest.mock('../apiService', () => ({
  getNoteById: jest.fn(),
  deleteNote: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useHistory: jest.fn(), // Mock useHistory
}));

describe('NoteDetails - Delete Note', () => {
  it('should delete a note and redirect to the home page', async () => {
    // Mock API responses
    const mockNote = {
      id: '123',
      title: 'Test Note',
      content: 'This is a test note.',
      createTime: '2023-12-01T12:00:00Z',
    };
    
    getNoteById.mockResolvedValue(mockNote);
    deleteNote.mockResolvedValue({ success: true });

    // Mock useParams and useHistory
    useParams.mockReturnValue({ id: '123' });
    const history = { push: jest.fn() };
    useHistory.mockReturnValue(history);

    render(
        <NoteDetails />
    );

    // Ensure the delete button is present
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    // Click the delete button
    fireEvent.click(deleteButton);

    // Ensure deleteNote is called with the correct ID
    await waitFor(() => {
      expect(deleteNote).toHaveBeenCalledWith('123');
    });

    // Ensure the history.push was called to redirect to the home page
    await waitFor(() => {
      expect(history.push).toHaveBeenCalledWith('/');
    });
  });
});
