import React from "react";
import { Button, Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import TruncatedText from "./TruncatedText";
import PropTypes from "prop-types";

export const ProductCard = ({ product, onShowReviews, onShowDelete, layoutMode }) => {
  const isGridLayout = layoutMode === "grid";

  return (
    <Col
      xs={12} 
      sm={isGridLayout ? 6 : 12} 
      md={isGridLayout ? 4 : 12} 
      lg={isGridLayout ? 4 : 12}
      xl={isGridLayout ? 4 : 12} 
      className="h-100 p-2"
    >
      <Card className="h-100 d-flex flex-column">
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <TruncatedText text={product?.data.title} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Categoria: <TruncatedText text={product?.data.category} />
          </Card.Subtitle>
          <Card.Text>
            <strong>Prezzo: </strong> €{product?.data.price}
            <br />
            <strong>Dipendente: </strong>
            <TruncatedText text={product?.data.employee || "Non specificato"} />
            <br />
            <strong>Descrizione: </strong>
            <TruncatedText text={product?.data.description || "Nessuna descrizione disponibile"} />
          </Card.Text>
          <div className="mt-auto d-flex justify-content-between">
            <OverlayTrigger
              placement="top"
              overlay={
                product?.data.reviews.length === 0 ||
                (product?.data.reviews.length === 1 && product?.data.reviews[0] === "") ? (
                  <Tooltip id={`tooltip-${product?.data.id}`}>Nessuna recensione disponibile.</Tooltip>
                ) : (
                  <></>
                )
              }
            >
              <span className="d-inline-block">
                <Button
                  variant="primary"
                  onClick={() => onShowReviews(product?.data.reviews)}
                  data-testid="review-button"
                  disabled={product?.data.reviews.length === 0 || (product?.data.reviews.length === 1 && product?.data.reviews[0] === "")}
                  style={
                    product?.data.reviews.length === 0 ||
                    (product?.data.reviews.length === 1 && product?.data.reviews[0] === "")
                      ? { pointerEvents: "none" }
                      : {}
                  }
                >
                  <i className="bi bi-search"></i>
                </Button>
              </span>
            </OverlayTrigger>

            <Button variant="outline-danger" onClick={() => onShowDelete(product)} data-testid="delete-button">
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

ProductCard.propTypes = {
  product: {
    data: {
      title: PropTypes.string.isRequired,
      category:  PropTypes.string.isRequired,
      price:  PropTypes.string.isRequired,
      employee:  PropTypes.string,
      description:  PropTypes.string,
      reviews:  PropTypes.array,
    }
  },
  onShowReviews: PropTypes.func.isRequired,
  onShowDelete: PropTypes.func.isRequired,
  layoutMode: PropTypes.string.isRequired
}