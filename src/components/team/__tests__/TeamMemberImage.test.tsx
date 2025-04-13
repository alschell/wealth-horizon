
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamMemberImage from '../TeamMemberImage';

// Mock the custom Image component
jest.mock('@/components/ui/image', () => ({
  __esModule: true,
  Image: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('TeamMemberImage', () => {
  it('renders with correct alt text', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Test Member" 
        priority={3}
      />
    );
    
    const image = screen.getByAltText('Test Member profile photo');
    expect(image).toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Test Member" 
        className="custom-class"
      />
    );
    
    const container = screen.getByAltText('Test Member profile photo').parentElement;
    expect(container).toHaveClass('custom-class');
  });
  
  it('supports fallbackIconSize prop', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Test Member" 
        fallbackIconSize={48}
      />
    );
    
    const image = screen.getByAltText('Test Member profile photo');
    expect(image).toBeInTheDocument();
  });
});
