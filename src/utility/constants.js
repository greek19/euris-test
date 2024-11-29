import { CHART, PRODUCTS } from "./routesConstants";

export const ELEMENTS = 9; // Numero di elementi per pagina

export const MOCK_USERS = [
  {
    username: "Aldo",
    password: "123",
  },
  {
    username: "Giovanni",
    password: "456",
  },
  {
    username: "Giacomo",
    password: "789",
  },
];

export const COLORS = [
  'rgba(255, 99, 132, 0.2)',  // Red
  'rgba(54, 162, 235, 0.2)',  // Blue
  'rgba(255, 206, 86, 0.2)',  // Yellow
  'rgba(75, 192, 192, 0.2)',  // Green
  'rgba(153, 102, 255, 0.2)', // Purple
  'rgba(255, 159, 64, 0.2)',  // Orange
  'rgba(255, 99, 71, 0.2)',   // Tomato
  'rgba(0, 128, 0, 0.2)',     // ForestGreen
  'rgba(255, 165, 0, 0.2)',   // OrangeRed
]

export const ERROR_MESSAGES_LOGIN = {
  required: 'Username e Password sono obbligatori.',
  invalid: 'Credenziali non valide. Riprova.',
};

export const CARD_DETAILS = [
  {
    title: 'Gestisci Prodotti',
    text: 'Visualizza i prodotti disponibili nel sistema.',
    link: PRODUCTS,
    buttonText: 'Vai ai Prodotti',
    disabled: false,
  },
  {
    title: 'Statistica',
    text: 'Visualizza le statistiche dei prodotti per categoria.',
    link: CHART,
    buttonText: 'Vai alle Statistiche',
    disabled: false,
  },
  {
    title: 'Impostazioni',
    text: 'Personalizza le impostazioni dell\'account.',
    buttonText: 'Vai alle Impostazioni',
    disabled: true,
  },
];

export const INPUT_ADD_PRODUCT = [
  { name: "title", type: "text", label: "Titolo*", placeholder: "Inserisci il titolo" },
  { name: "category", type: "text", label: "Categoria*", placeholder: "Inserisci la categoria" },
  { name: "price", type: "text", label: "Prezzo*", placeholder: "Inserisci il prezzo", onInput: (e) => e.target.value = validatePriceInput(e.target.value) },
  { name: "employee", type: "text", label: "Dipendente", placeholder: "Inserisci il nome del dipendente" },
  { name: "description", as: "textarea", label: "Descrizione", placeholder: "Inserisci una descrizione", rows: 3 },
]

export const BASE_URL = 'https://us-central1-test-b7665.cloudfunctions.net/api/stores/ijpxNJLM732vm8AeajMR';