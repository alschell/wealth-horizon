
import React from 'react';
import IndexCard from './components/IndexCard';
import { IndicesTrackerProps } from './types';

const IndicesTracker: React.FC<IndicesTrackerProps> = ({ indices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indices.map((index) => (
        <IndexCard key={index.id} index={index} />
      ))}
    </div>
  );
};

export default IndicesTracker;
