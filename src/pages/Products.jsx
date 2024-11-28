import React, { useState } from "react";
import { Button, Spinner, Pagination, Card, Row, Col, Container, Toast, ToastContainer } from "react-bootstrap";
import { useDeleteProductMutation, useGetProductsQuery } from "../features/products/productsApi";
import CustomModal from "../components/CustomModal";
import TruncatedText from "../components/TruncatedText"; // Importa il nuovo componente
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaTh, FaList } from 'react-icons/fa'; // Import delle icone

const Products = () => {
  const [layout, setLayout] = useState("panel"); // 'panel' o 'grid'
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const elements = 9; // Numero di elementi per pagina

  // Recupera i prodotti
  const { data, error, isLoading, refetch } = useGetProductsQuery({ page, elements });
  const [deleteProduct] = useDeleteProductMutation();

  // Gestione eliminazione prodotto
  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id).unwrap(); // Effettua la chiamata DELETE
      setShowModal(false);
      setPage(1); // Torna alla prima pagina
      refetch(); // Aggiorna la lista dei prodotti
      setShowToast(true); // Mostra il toast
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
    }
  };

  const toggleLayout = () => setLayout((prev) => (prev === "panel" ? "grid" : "panel"));

  const handleShowReviews = (reviews) => {
    setSelectedReviews(reviews);
    setModalType("reviews");
    setShowModal(true);
  };

  const handleShowDelete = (product) => {
    setSelectedProduct(product);
    setModalType("delete");
    setShowModal(true);
  };

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Errore nel caricamento dei prodotti!</p>;

  // Dinamicamente impostiamo contenuti e footer per il CustomModal
  const modalContent =
  modalType === "reviews" ? (
    selectedReviews?.length > 0 ? (
      <ul>
        {selectedReviews.map((review, index) => (
          <li key={index}>
            <div className="flex-grow-1 text-break me-3">
              {review}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>Nessuna recensione disponibile.</p>
    )
  ) : (
    <p>
      Sei sicuro di voler eliminare <strong>{selectedProduct?.data.title}</strong>?
    </p>
  );

  const modalFooter =
    modalType === "reviews" ? null : (
      <>
        <Button variant="danger" onClick={handleDelete}>
          Elimina
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(false)} className="ms-2">
          Annulla
        </Button>
      </>
    );

  return (
    <Container>
      <div className="row d-flex justify-content-between align-items-center mb-3">
        <h2 className="col-auto mb-0 ">Lista Prodotti</h2>
        <Button variant="primary" onClick={toggleLayout} className="col-auto mx-2">
          {layout === "panel" ? <FaList /> : <FaTh />}
        </Button>
      </div>

      <Row className={layout === "grid" ? "g-4" : ""}>
        {data?.list.map((product) => (
          <Col
            className="p-2"
            key={product?.id}
            xs={layout === "grid" ? 6 : 12} // 2 elementi per riga su mobile in griglia, 1 per riga in lista
            sm={layout === "grid" ? 6 : 12}
            md={layout === "grid" ? 4 : 12} // Configurazione responsive per griglia
            lg={layout === "grid" ? 4 : 12}
            xl={layout === "grid" ? 4 : 12}
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
                  <strong>Prezzo:</strong> €{product.data.price}
                  <br />
                  <strong>Dipendente:</strong>{" "}
                  <TruncatedText text={product.data.employee || "Non specificato"} />
                  <br />
                  <strong>Descrizione:</strong>{" "}
                  <TruncatedText text={product.data.description || "Nessuna descrizione disponibile"} />
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between">
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      product?.data.reviews.length === 0 ||
                      (product?.data.reviews.length === 1 && product?.data.reviews[0] === "") ? (
                        <Tooltip id={`tooltip-${product?.data.id}`}>
                          Nessuna recensione disponibile.
                        </Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <span className="d-inline-block">
                      <Button
                        variant="primary"
                        onClick={() => handleShowReviews(product?.data.reviews)}
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

                  <Button variant="outline-danger" onClick={() => handleShowDelete(product)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          />
          {Array.from({ length: Math.ceil(data?.length / elements) }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(data?.length / elements)))}
            disabled={page === Math.ceil(data?.length / elements)}
          />
        </Pagination>
      </div>

      {/* Modale unica con contenuti dinamici */}
      <CustomModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalType === "reviews" ? "Recensioni" : "Conferma Eliminazione"}
        footer={modalFooter}
      >
        {modalContent}
      </CustomModal>

      {/* Toast per conferma eliminazione */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Notifica</strong>
          </Toast.Header>
          <Toast.Body>Prodotto eliminato con successo!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Products;
