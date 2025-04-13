
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

// Mock performance tracking
jest.mock('../utils/performanceTracking', () => ({
  trackImagePerformance: jest.fn(),
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
  
  it('uses correct priority for loading', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Test Member" 
        priority={2}
      />
    );
    
    const image = screen.getByAltText('Test Member profile photo');
    expect(image).toHaveAttribute('loading', 'eager');
  });
  
  it('includes proper accessibility attributes', () => {
    render(
      <TeamMemberImage 
        image="/test-image.jpg" 
        name="Test Member"
      />
    );
    
    const container = screen.getByAltText('Test Member profile photo').parentElement;
    expect(container).toHaveAttribute('aria-label', 'Test Member profile image');
  });
});
