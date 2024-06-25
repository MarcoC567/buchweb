// Funktion zur Formatierung des Preises auf zwei Dezimalstellen
export const formatPrice = (price) => {
    if (typeof price !== 'number') return "";
    return `$${price.toFixed(2)}`;
};