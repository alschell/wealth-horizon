
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamMemberImage from '../TeamMemberImage';

describe('TeamMemberImage', () => {
  it('renders with correct alt text', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Team Member" 
        priority={3}
      />
    );
    
    const image = screen.getByAltText('Team Member profile photo');
    expect(image).toBeInTheDocument();
  });
  
  // Add more tests as needed
});
