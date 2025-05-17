import { createLoader, parseAsString, SearchParams } from 'nuqs/server';
import { Reviews as ReviewsSection } from '@/design-system/sections/reviews';

const PaginationSearchParamNames = {
  BEFORE: 'reviews_before',
  AFTER: 'reviews_after',
} as const;

const loadReviewsPaginationSearchParams = createLoader({
  [PaginationSearchParamNames.BEFORE]: parseAsString,
  [PaginationSearchParamNames.AFTER]: parseAsString,
});


interface Props {
  productId: number;
  searchParams: Promise<SearchParams>;
}


const mockReviews = [
  {
    id: '1',
    rating: 5,
    review: 'Excellent product!',
    name: 'Alice',
    date: 'January 1, 2024',
  },
  {
    id: '2',
    rating: 4,
    review: 'Very good, could be better.',
    name: 'Bob',
    date: 'February 10, 2024',
  },
  {
    id: '3',
    rating: 3,
    review: 'Average experience.',
    name: 'Charlie',
    date: 'March 15, 2024',
  },
];


export const Reviews = async ({ productId, searchParams }: Props) => {

  return (
    <>
      <ReviewsSection
        averageRating={2}
        emptyStateMessage="empty"
        nextLabel="next"
        paginationInfo={undefined}
        previousLabel="previous"
        reviews={mockReviews}
        reviewsLabel="title"
      />
    </>
  );
};
