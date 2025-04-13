import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamMemberImage } from '../components/TeamMemberImage';

describe('TeamMemberImage', () => {
  it('renders with correct alt text', () => {
    render(
      <TeamMemberImage 
        src="/test-image.jpg" 
        alt="Team Member" 
        priority={3}
      />
    );
    
    const image = screen.getByAltText('Team Member');
    expect(image).toBeInTheDocument();
  });
  
  // Add more tests as needed
});
