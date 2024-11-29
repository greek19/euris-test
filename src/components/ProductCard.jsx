import React from "react";
import { Button, Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import TruncatedText from "./TruncatedText"; // Importa il componente di troncamento del testo

const ProductCard = ({ product, onShowReviews, onShowDelete, layoutMode }) => {
  // Aggiungi layoutMode per determinare se la visualizzazione è a lista o a griglia
  const isGridLayout = layoutMode === "grid";

  return (
    <Col
      xs={12} // Sempre 1 card per riga su mobile
      sm={isGridLayout ? 6 : 12} // 2 card per riga in modalità griglia, 1 per riga in lista
      md={isGridLayout ? 4 : 12} // 3 card per riga su schermi medi in modalità griglia
      lg={isGridLayout ? 4 : 12} // 3 card per riga su schermi larghi in modalità griglia
      xl={isGridLayout ? 4 : 12} // 3 card per riga su schermi extra larghi in modalità griglia
      className="h-100 p-2"
    >
      <Card className="h-100 d-flex flex-column">
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            <TruncatedText text={product.data.title} />
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Categoria: <TruncatedText text={product.data.category} />
          </Card.Subtitle>
          <Card.Text>
            <strong>Prezzo: </strong> €{product.data.price}
            <br />
            <strong>Dipendente: </strong>
            <TruncatedText text={product.data.employee || "Non specificato"} />
            <br />
            <strong>Descrizione: </strong>
            <TruncatedText text={product.data.description || "Nessuna descrizione disponibile"} />
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

export default ProductCard;