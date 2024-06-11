import axios from "axios";
import { /* useContext,*/ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EditForm from "../form/EditBookForm";
//import { AuthContext } from '../provider/AuthProvider';

const BookEdit = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editTitel, setEditTitel] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editArt, setEditArt] = useState("");
  const [editPreis, setEditPreis] = useState(0);
  const [editRabatt, setEditRabatt] = useState(0);
  const [editLieferbar, setEditLieferbar] = useState(false);
  const [editDatum, setEditDatum] = useState("");
  const [editHomepage, setEditHomepage] = useState("");
  const [editSchlagwoerter, setEditSchlagwoerter] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [buchDataWithUniqueId, setBuchDataWithUniqueId] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://example.com/api/books?query=${searchQuery}`);
      const results = response.data;

      if (results.length === 0) {
        setSearchError(true);
        setShowTable(false);
        setBuchDataWithUniqueId([]);
      } else {
        setSearchError(false);
        setShowTable(true);
        setBuchDataWithUniqueId(results);
      }
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      setSearchError(true);
      setShowTable(false);
    }
  };


  const navigateToDetails = (id) => {
    const book = buchDataWithUniqueId.find((buch) => buch.id === id);
    if (book) {
      setEditTitel(book.titel);
      setEditIsbn(book.isbn);
      setEditArt(book.art);
      setEditPreis(book.preis);
      setEditRabatt(book.rabatt);
      setEditLieferbar(book.lieferbar);
      setEditDatum(book.datum);
      setEditHomepage(book.homepage);
      setEditSchlagwoerter(book.schlagwoerter);
      // Hier können Sie zur Detailansicht navigieren oder diese anzeigen
      navigate(`/books/${id}`);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`https://example.com/api/books/${id}`);
      const updatedData = buchDataWithUniqueId.filter((buch) => buch.id !== id);
      setBuchDataWithUniqueId(updatedData);
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <div>
      <EditForm
            editTitel={editTitel}
            setEditTitel={setEditTitel}
            editIsbn={editIsbn}
            setEditIsbn={setEditIsbn}
            editArt={editArt}
            setEditArt={setEditArt}
            editPreis={editPreis}
            setEditPreis={setEditPreis}
            editRabatt={editRabatt}
            setEditRabatt={setEditRabatt}
            editLieferbar={editLieferbar}
            setEditLieferbar={setEditLieferbar}
            editDatum={editDatum}
            setEditDatum={setEditDatum}
            editHomepage={editHomepage}
            setEditHomepage={setEditHomepage}
            editSchlagwoerter={editSchlagwoerter}
            setEditSchlagwoerter={setEditSchlagwoerter}
            handleSearch={handleSearch}
            searchError={searchError}
            showTable={showTable}
            buchDataWithUniqueId={buchDataWithUniqueId}
            navigateToDetails={navigateToDetails}
            handleDeleteRow={handleDeleteRow}
          />
    </div>
  );
};

export default BookEdit;