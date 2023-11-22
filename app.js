import { useState } from "react";
import ReviewList from "./ReviewList";
import SortingOptions from "./SortingOptions";
import ReviewForm from "./ReviewForm";

const App = () => {
  const [userReviews, setUserReviews] = useState([
    {
      id: 1,
      userEmail: "john.doe@example.com",
      reviewerName: "John Doe",
      reviewText: "Great experience, loved it!",
      reviewTime: "12:45",
      reviewDate: "2023-07-01",
      reviewRating: 5,
    },
    {
      id: 2,
      userEmail: "jane.smith@example.com",
      reviewerName: "Jane Smith",
      reviewText: "Good service, would recommend.",
      reviewTime: "14:30",
      reviewDate: "2023-07-05",
      reviewRating: 4,
    },
    {
      id: 3,
      userEmail: "sam.jones@example.com",
      reviewerName: "Sam Jones",
      reviewText: "Could be better, but not bad.",
      reviewTime: "16:20",
      reviewDate: "2023-07-10",
      reviewRating: 3,
    },
  ]);

  const averageUserRating =
    userReviews.length > 0
      ? userReviews.reduce(
          (total, review) => total + review.reviewRating,
          0
        ) / userReviews.length
      : 0;

  const addNewReview = (newReviewData) => {
    const newReviewId = userReviews.length + 1;
    const reviewToAdd = { id: newReviewId, ...newReviewData };
    setUserReviews([...userReviews, reviewToAdd]);
  };

  return (
    <div id="my-app">
      <h2>Customer Reviews</h2>
      <div className="review-controls">
        <span className="review-average">
          Average Rating ({averageUserRating.toFixed(1)}){" "}
          {generateStarRating(averageUserRating)}
        </span>
        <span className="sort-label" id="sort-by">
          Sort Reviews By
        </span>
        <SortingOptions
          userReviews={userReviews}
          onSortChange={(sortedReviews) => setUserReviews(sortedReviews)}
        />
      </div>
      <ReviewList userReviews={userReviews} />
      <ReviewForm onSubmit={addNewReview} />
    </div>
  );
};

const generateStarRating = (rating) => {
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(5 - Math.floor(rating));
  return (
    <span>
      {fullStars}
      {emptyStars}
    </span>
  );
};

export default App;
