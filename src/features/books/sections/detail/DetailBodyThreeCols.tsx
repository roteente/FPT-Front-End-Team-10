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
    <div className="w-full px-4 py-8">
      <div className="flex gap-4 w-full justify-center">
        {/* Left Gallery */}
        <div className="flex-1 sticky top-4 self-start">
          <DetailLeftGallery book={book} />
        </div>
        
        {/* Center Info */}
        <div className="flex-2">
          <DetailCenterInfo book={book} />
        </div>
        
        {/* Right Purchase */}
        <div className="flex-1 sticky top-4 self-start">
          <DetailRightPurchase book={book} />
        </div>
      </div>
    </div>
  );
};

export default DetailBodyThreeCols;