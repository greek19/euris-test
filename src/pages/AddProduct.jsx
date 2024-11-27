import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Alert,
  Card,
  ListGroup,
  Row,
  Col,
  Toast,
  ToastContainer,
  Pagination,
} from "react-bootstrap";
import { useAddProductMutation } from "../features/products/productsApi";

const AddProduct = () => {
  const [reviews, setReviews] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showToast, setShowToast] = React.useState(false);
  const reviewsPerPage = 10;
  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Il titolo è obbligatorio.")
      .max(100, "Il titolo non può superare i 100 caratteri."),
    category: Yup.string().required("La categoria è obbligatoria."),
    price: Yup.number()
      .typeError("Il prezzo deve essere un numero valido.")
      .positive("Il prezzo deve essere maggiore di zero.")
      .max(9999999.99, "Il prezzo non può superare 9999999.99.")
      .required("Il prezzo è obbligatorio."),
    employee: Yup.string().max(100, "Il nome del dipendente è troppo lungo."),
    description: Yup.string().max(500, "La descrizione non può superare i 500 caratteri."),
  });

  const handleAddReview = (review, setFieldValue) => {
    if (review.trim()) {
      setReviews([...reviews, review.trim()]);
      setFieldValue("reviewInput", ""); // Resetta il campo di input
    }
  };

  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { resetForm }) => {
    const newProduct = {
      ...values,
      price: parseFloat(values.price),
      reviews,
    };

    try {
      await addProduct(newProduct).unwrap();

      setShowToast(true); // Mostra il Toast
      resetForm(); // Resetta il form
      setReviews([]); // Resetta le recensioni
    } catch (err) {
      console.error("Errore durante l'aggiunta del prodotto:", err);
    }
  };

  return (
    <Container className="my-4">
      <h2>Aggiungi Nuovo Prodotto</h2>
      {isError && (
        <Alert variant="danger">
          Errore: {error?.data?.message || "Impossibile aggiungere il prodotto."}
        </Alert>
      )}

      {/* Toast di successo */}
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
          <Toast.Body>Prodotto aggiunto con successo!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Formik
        initialValues={{
          title: "",
          category: "",
          price: "",
          employee: "",
          description: "",
          reviewInput: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            {/* Titolo */}
            <div className="mb-3">
              <label className="form-label">Titolo*</label>
              <Field
                name="title"
                type="text"
                className="form-control"
                placeholder="Inserisci il titolo"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="title" />
              </div>
            </div>

            {/* Categoria */}
            <div className="mb-3">
              <label className="form-label">Categoria*</label>
              <Field
                name="category"
                type="text"
                className="form-control"
                placeholder="Inserisci la categoria"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="category" />
              </div>
            </div>

            {/* Prezzo */}
            <div className="mb-3">
              <label className="form-label">Prezzo*</label>
              <Field
                name="price"
                type="text"  // Usa 'text' per poter applicare una maschera personalizzata
                className="form-control"
                placeholder="Inserisci il prezzo"
                onInput={(e) => {
                  // Rimuove tutto tranne numeri, punto e virgola
                  let value = e.target.value;
                  value = value.replace(/[^\d,\.]/g, '') // Consente solo numeri e simboli di decimali
                    .replace(/,/g, '.'); // Cambia la virgola in punto per il formato decimale

                  // Limita i decimali a due cifre
                  if (value.indexOf('.') !== -1) {
                    const [integer, decimals] = value.split('.');
                    if (decimals.length > 2) {
                      value = `${integer}.${decimals.substring(0, 2)}`;
                    }
                  }

                  e.target.value = value;
                }}
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="price" />
              </div>
            </div>

            {/* Dipendente */}
            <div className="mb-3">
              <label className="form-label">Dipendente</label>
              <Field
                name="employee"
                type="text"
                className="form-control"
                placeholder="Inserisci il nome del dipendente"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="employee" />
              </div>
            </div>

            {/* Descrizione */}
            <div className="mb-3">
              <label className="form-label">Descrizione</label>
              <Field
                name="description"
                as="textarea"
                rows="3"
                className="form-control"
                placeholder="Inserisci una descrizione"
              />
              <div className="invalid-feedback d-block">
                <ErrorMessage name="description" />
              </div>
            </div>

            {/* Recensioni */}
            <Card className="mb-4">
              <Card.Header>
                <h5>Gestione Recensioni</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={8}>
                    <Field
                      name="reviewInput"
                      type="text"
                      className="form-control"
                      placeholder="Inserisci una recensione"
                      value={values.reviewInput}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col sm={4}>
                    <Button
                      variant="primary"
                      className="my-2"
                      onClick={() =>
                        handleAddReview(values.reviewInput, setFieldValue)
                      }
                      disabled={!values.reviewInput.trim()}
                    >
                      Aggiungi Recensione
                    </Button>
                  </Col>
                </Row>

                {/* Mostra le recensioni con paginazione */}
                <ListGroup className="mt-3">
                  {paginatedReviews.map((review, index) => (
                    <ListGroup.Item
                      key={index + (currentPage - 1) * reviewsPerPage}
                      className="d-flex justify-content-between align-items-center"
                    >
                      {review}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleDeleteReview(index + (currentPage - 1) * reviewsPerPage)
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {/* Paginazione */}
                {reviews.length > reviewsPerPage && (
                  <Pagination className="mt-3 justify-content-center">
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({
                      length: Math.ceil(reviews.length / reviewsPerPage),
                    }).map((_, index) => (
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
                      disabled={
                        currentPage === Math.ceil(reviews.length / reviewsPerPage)
                      }
                    />
                  </Pagination>
                )}
              </Card.Body>
            </Card>

            {/* Submit */}
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Aggiungendo..." : "Aggiungi Prodotto"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddProduct;
