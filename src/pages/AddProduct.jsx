import React, { useState } from "react";
import { Form, Button, Container, Alert, ListGroup, Row, Col, Card, Toast, ToastContainer } from "react-bootstrap";
import { useAddProductMutation } from "../features/products/productsApi"; // Importa il servizio RTK Query

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [employee, setEmployee] = useState("");
  const [description, setDescription] = useState("");
  const [reviewInput, setReviewInput] = useState(""); // Stato per l'input recensione
  const [reviews, setReviews] = useState([]); // Stato per la lista recensioni
  const [errors, setErrors] = useState({}); // Stato per gestire errori di validazione
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false); // Stato per il Toast

  // Hook per la chiamata API
  const [addProduct, { isLoading, isError, error }] = useAddProductMutation();

  // Validazione dei campi obbligatori
  const validateFields = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Il titolo è obbligatorio.";
    if (!category.trim()) newErrors.category = "La categoria è obbligatoria.";
    if (!price || isNaN(price) || parseFloat(price) <= 0)
      newErrors.price = "Il prezzo deve essere un numero positivo.";
    return newErrors;
  };

  // Funzione per aggiungere una recensione alla lista
  const handleAddReview = () => {
    if (reviewInput.trim()) {
      setReviews([...reviews, reviewInput.trim()]);
      setReviewInput(""); // Resetta il campo di input
    }
  };

  // Funzione per eliminare una recensione dalla lista
  const handleDeleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  // Funzione per gestire l'invio del prodotto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Mostra errori
      return;
    }

    // Crea il nuovo prodotto
    const newProduct = {
      title,
      category,
      price: parseFloat(price),
      employee,
      description,
      reviews,
    };

    try {
      const response = await addProduct(newProduct).unwrap(); // Chiamata all'API
  
      setSuccess(true);
      setShowToast(true); // Mostra il Toast
  
      // Resetta il form
      setTitle("");
      setCategory("");
      setPrice("");
      setEmployee("");
      setDescription("");
      setReviews([]);
      setErrors({});
    } catch (err) {
      console.error("Errore durante l'aggiunta del prodotto:", err);
    }
    window.scrollTo(0, 0)
  };

  return (
    <Container className="my-4">
      <h2>Aggiungi Nuovo Prodotto</h2>
      {isError && <Alert variant="danger">Errore: {error?.data?.message || "Impossibile aggiungere il prodotto."}</Alert>}
      
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

      <Form onSubmit={handleSubmit}>
        {/* Campi principali del prodotto */}
        <Form.Group className="mb-3">
          <Form.Label>Titolo*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoria*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci la categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isInvalid={!!errors.category}
          />
          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prezzo*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Inserisci il prezzo"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dipendente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il nome del dipendente"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Inserisci una descrizione"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        {/* Card per le recensioni */}
        <Card className="mb-4">
          <Card.Header>
            <h5>Gestione Recensioni</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Inserisci una recensione"
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                />
              </Col>
              <Col sm={4}>
                <Button
                  variant="primary"
                  onClick={handleAddReview}
                  disabled={!reviewInput.trim()}
                >
                  Aggiungi Recensione
                </Button>
              </Col>
            </Row>
            {/* Mostra le recensioni aggiunte */}
            <ListGroup className="mt-3">
              {reviews.map((review, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  {review}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteReview(index)}
                  >
                    Elimina
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Aggiungendo..." : "Aggiungi Prodotto"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
