// Funzione per validare il prezzo in tempo reale
export const validatePriceInput = (value) => {
    value = value.replace(/[^\d,\.]/g, "").replace(/,/g, ".");
    if (value.indexOf(".") !== -1) {
      const [integer, decimals] = value.split(".");
      if (decimals.length > 2) value = `${integer}.${decimals.substring(0, 2)}`;
    }
    return value;
  };
  