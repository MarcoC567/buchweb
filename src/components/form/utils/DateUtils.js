// Funktion zur Formatierung des Datums in "Tag-Monat-Jahr"
export const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Monat ist 0-basiert, daher +1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};