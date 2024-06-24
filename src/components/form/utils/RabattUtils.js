// Funktion zur Formatierung des Rabatts als ganzzahligen Prozentsatz
export const formatRabatt = (rabatt) => {
    if (typeof rabatt !== 'number') return "";
    return `${Math.floor(rabatt * 100)}%`;
};