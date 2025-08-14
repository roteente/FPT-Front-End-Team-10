import React from 'react';
import DetailLeftGallery from '../../ui/detail/DetailLeftGallery';
import DetailCenterInfo from '../../ui/detail/DetailCenterInfo';
import DetailRightPurchase from '../../ui/detail/DetailRightPurchase';
import type { Book } from '../../api/bookApi';

interface DetailBodyThreeColsProps {
  book: Book;
}

const DetailBodyThreeCols: React.FC<DetailBodyThreeColsProps> = ({ book }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-4 max-w-7xl mx-auto justify-center">
        {/* Left Gallery - Fixed width & Sticky */}
        <div className="flex-shrink-0 sticky top-4 self-start" style={{ width: '400px', height: 'fit-content' }}>
          <DetailLeftGallery book={book} />
        </div>
        
        {/* Center Info - Fixed width & Scrollable */}
        <div className="flex-shrink-0" style={{ width: '584px' }}>
          <DetailCenterInfo book={book} />
        </div>
        
        {/* Right Purchase - Fixed width & Sticky */}
        <div className="flex-shrink-0 sticky top-4 self-start" style={{ width: '360px', height: 'fit-content' }}>
          <DetailRightPurchase book={book} />
        </div>
      </div>
    </div>
  );
};

export default DetailBodyThreeCols;
