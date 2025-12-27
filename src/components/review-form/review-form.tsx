import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { postReview } from '../../store/action';
import { selectAuthorizationStatus } from '../../store/selectors';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (authorizationStatus !== 'AUTH') {
    return <></>;
  }

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
    setError(null);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please enter a comment');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(postReview(offerId, { rating, comment }) as any);
      setRating(0);
      setComment('');
    } catch (err: any) {
      console.error('Review submission error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || err?.toString() || 'Failed to submit review. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = rating === 0 || !comment.trim() || isSubmitting;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === star}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={(() => {
                switch (star) {
                  case 5: return 'perfect';
                  case 4: return 'good';
                  case 3: return 'not bad';
                  case 2: return 'badly';
                  default: return 'terribly';
                }
              })()}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay.
        </p>
        <button 
          className="reviews__submit form__submit button" 
          type="submit" 
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
