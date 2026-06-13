import Breadcrumb from '@/components/ui/Breadcrumb';
import ReviewFormSection from '@/components/sections/ReviewFormSection';
import ReviewsGridSection from '@/components/sections/ReviewsGridSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Reviews – Starcode',
  description: 'See what our clients say about Starcode and share your own experience.',
};

export default function WriteReviewPage() {
  return (
    <>
      <Breadcrumb title="Client Reviews" current="Reviews" />
      
      <div className="review-page-content tmp-section-gapTop">
        {/* Review Submission Form */}
        <ReviewFormSection />

        {/* Separator / Heading for Grid */}
        <div className="container">
            <hr style={{ border: '0', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '60px 0' }} />
        </div>

        {/* Reviews Grid */}
        <ReviewsGridSection />
      </div>
    </>
  );
}
