import PropTypes from "prop-types";
import { Button, ListGroup, Pagination } from "react-bootstrap";

export const ReviewsList = ({ reviews, paginatedReviews, currentPage, reviewsPerPage, handlePageChange, handleDeleteReview }) => (
    <>
      <ListGroup className="mt-3">
        {paginatedReviews.map((review, index) => (
          <ListGroup.Item
            key={index + (currentPage - 1) * reviewsPerPage}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="flex-grow-1 text-break me-3">{review}</div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDeleteReview(index + (currentPage - 1) * reviewsPerPage)}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
  
      {reviews.length > reviewsPerPage && (
        <Pagination className="mt-3 justify-content-center">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
          />
        </Pagination>
      )}
    </>
  );

ReviewsList.propTypes = {
  reviews: PropTypes.array.isRequired,
  paginatedReviews: PropTypes.any.isRequired,
  currentPage: PropTypes.number.isRequired,
  reviewsPerPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleDeleteReview: PropTypes.func.isRequired
}