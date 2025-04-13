
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TeamMemberImage from '../TeamMemberImage';

// Mock the a11y utility
jest.mock('@/utils/a11y', () => ({
  announceToScreenReader: jest.fn(),
}));

describe('TeamMemberImage Component', () => {
  const mockProps = {
    image: 'https://example.com/image.jpg',
    name: 'John Doe',
    onLoad: jest.fn(),
    onError: jest.fn(),
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with valid image', async () => {
    render(<TeamMemberImage {...mockProps} />);
    
    // Check if the image is rendered
    const image = screen.getByRole('img', { hidden: true });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'John Doe profile photo');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    
    // Simulate successful image load
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(mockProps.onLoad).toHaveBeenCalledTimes(1);
    });
  });
  
  test('shows fallback when image fails to load', async () => {
    render(<TeamMemberImage {...mockProps} />);
    
    // Simulate image load error
    const image = screen.getByRole('img', { hidden: true });
    fireEvent.error(image);
    
    // Check if fallback is shown
    await waitFor(() => {
      expect(mockProps.onError).toHaveBeenCalledTimes(1);
      expect(screen.getByLabelText('Placeholder for John Doe')).toBeInTheDocument();
    });
  });
  
  test('applies custom classNames and fallbackIconSize', () => {
    render(
      <TeamMemberImage
        {...mockProps}
        className="custom-class"
        fallbackIconSize={60}
      />
    );
    
    const container = screen.getByTestId('team-member-image');
    expect(container).toHaveClass('custom-class');
  });
  
  test('resets loading state when image prop changes', async () => {
    const { rerender } = render(<TeamMemberImage {...mockProps} />);
    
    // Simulate successful image load
    fireEvent.load(screen.getByRole('img', { hidden: true }));
    
    // Re-render with different image
    rerender(
      <TeamMemberImage
        {...mockProps}
        image="https://example.com/different-image.jpg"
      />
    );
    
    // Check if loading state is reset
    expect(screen.getByTestId('team-member-image')).toHaveAttribute('aria-busy', 'true');
    
    // Simulate successful image load again
    fireEvent.load(screen.getByRole('img', { hidden: true }));
    
    await waitFor(() => {
      expect(screen.getByTestId('team-member-image')).toHaveAttribute('aria-busy', 'false');
    });
  });
});
