import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  Alert,
  Card,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useAddProductMutation } from "../features/products/productsApi";
import { useSelector } from "react-redux";
import { ReviewsList } from "../components/ReviewsList";
import { INPUT_ADD_PRODUCT } from "../utility/constants";


const AddProduct = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const reviewsPerPage = 10;
  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();
  const user = useSelector((state) => state.auth.user);

  const paginatedReviews = reviews.slice((currentPage - 1) * reviewsPerPage, currentPage * reviewsPerPage);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Il titolo è obbligatorio.").max(100, "Max 100 caratteri."),
    category: Yup.string().required("La categoria è obbligatoria.").max(100, "Max 100 caratteri."),
    price: Yup.number()
      .typeError("Il prezzo deve essere un numero valido.")
      .positive("Il prezzo deve essere maggiore di zero.")
      .max(9999999.99, "Max 9999999.99.")
      .required("Il prezzo è obbligatorio."),
    employee: Yup.string().max(100, "Max 100 caratteri."),
    description: Yup.string().max(500, "Max 500 caratteri."),
    reviewInput: Yup.string().max(500, "Max 500 caratteri."),
  });

  const handleAddReview = (review, setFieldValue) => {
    if (review.trim()) {
      setReviews([...reviews, review.trim()]);
      setFieldValue("reviewInput", "");
    }
  };

  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values, { resetForm }) => {
    const newProduct = { ...values, price: parseFloat(values.price), reviews };
    try {
      await addProduct(newProduct).unwrap();
      setShowToast(true); 
      resetForm();
      setReviews([]); 
    } catch (err) {
      console.error("Errore durante l'aggiunta del prodotto:", err);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

  };

  return (
    <Container className="my-4">
      <h2 className="pb-4">Aggiungi Nuovo Prodotto</h2>
      {isError && <Alert variant="danger">Errore: {error?.data?.message || "Errore durante l'aggiunta del prodotto."}</Alert>}

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
          <Toast.Body className="text-white">Prodotto aggiunto con successo!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Formik
        initialValues={{
          title: "",
          category: "",
          price: "",
          employee: user.username,
          description: "",
          reviewInput: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            {INPUT_ADD_PRODUCT.map(({ name, ...props }) => (
              <div className="mb-3" key={name}>
                <label className="form-label fw-bold">{props?.label}</label>
                <Field name={name} className="form-control" {...props} />
                <div className="invalid-feedback d-block">
                  <ErrorMessage name={name} />
                </div>
              </div>
            ))}

            <Card className="mb-4">
              <Card.Header>
                <h5>Recensioni</h5>
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col sm={8}>
                    <Field
                      name="reviewInput"
                      as="textarea"
                      rows={2}
                      className="form-control"
                      placeholder="Inserisci una recensione"
                      value={values.reviewInput}
                      onChange={handleChange}
                    />
                    <div className="text-muted fs-6 p-2">{values.reviewInput.length} / 500</div>
                    <div className="invalid-feedback d-block">
                      <ErrorMessage name="reviewInput" />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <Button
                      variant="primary"
                      onClick={() => handleAddReview(values.reviewInput, setFieldValue)}
                      disabled={!values.reviewInput.trim() || values.reviewInput.length > 500}
                    >
                      Aggiungi Recensione
                    </Button>
                  </Col>
                </Row>

                <ReviewsList
                  reviews={reviews}
                  paginatedReviews={paginatedReviews}
                  currentPage={currentPage}
                  reviewsPerPage={reviewsPerPage}
                  handlePageChange={setCurrentPage}
                  handleDeleteReview={handleDeleteReview}
                />
              </Card.Body>
            </Card>

            <div className="d-grid">
              <Button type="submit" variant="success" disabled={isLoading}>
                {isLoading ? "Caricamento..." : "Aggiungi Prodotto"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddProduct;
