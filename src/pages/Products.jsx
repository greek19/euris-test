import React, { useState } from "react";
import { Spinner, Container, Button, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { useDeleteProductMutation, useGetProductsQuery } from "../features/products/productsApi";
import CustomModal from "../components/CustomModal";
import ProductCard from "../components/ProductCard";
import PaginationComponent from "../components/PaginationComponent"; // Importa il componente di paginazione
import { FaTh, FaList } from 'react-icons/fa'; // Importa le icone per la griglia e la lista

const Products = () => {
  const [layout, setLayout] = useState("panel"); // "panel" per lista, "grid" per griglia
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const elements = 9; // Numero di elementi per pagina

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

  const toggleLayout = () => setLayout((prev) => (prev === "panel" ? "grid" : "panel")); // Cambia il layout tra "panel" e "grid"

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

  const modalContent =
    modalType === "reviews" ? (
      selectedReviews?.length > 0 ? (
        <ul>
          {selectedReviews.map((review, index) => (
            <li key={index}>{review}</li>
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
        <h2 className="col-auto mb-0">Lista Prodotti</h2>
        <Button variant="primary" onClick={toggleLayout} className="col-auto mx-2">
          {layout === "panel" ? <FaList /> : <FaTh />}
        </Button>
      </div>

      {/* Mostra le card in modalità griglia o lista */}
      <Row className={layout === "grid" ? "g-4" : ""}>
        {data?.list.map((product) => (
          <Col
            key={product?.id}
            xs={layout === "grid" ? 6 : 12} // 2 card per riga in griglia, una card per riga in lista
            sm={layout === "grid" ? 6 : 12}
            md={layout === "grid" ? 4 : 12} // Griglia 3 colonne per schermi medi, 1 colonna per lista
            lg={layout === "grid" ? 4 : 12}
            xl={layout === "grid" ? 4 : 12}
          >
            <ProductCard
              product={product}
              onShowReviews={handleShowReviews}
              onShowDelete={handleShowDelete}
            />
          </Col>
        ))}
      </Row>

      {/* Componente di Paginazione */}
      <PaginationComponent
        page={page}
        setPage={setPage}
        totalItems={data?.length || 0}
        itemsPerPage={elements}
      />

      {/* Modale per le recensioni o la conferma eliminazione */}
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
          bg="dark"
        >
          <Toast.Header>
            <strong className="me-auto">Notifica</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Prodotto eliminato con successo!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Products;
