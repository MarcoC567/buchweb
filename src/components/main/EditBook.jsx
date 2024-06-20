import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import EditForm from "../form/EditBookForm";
import { AuthContext } from '../provider/AuthProvider';

const BookEdit = () => {
  const { id } = useParams(); // Extrahiere die ID aus der URL
  const [buch, setBuch] = useState({});
  const [etag, setEtag] = useState("");
  const [editTitel, setEditTitel] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editArt, setEditArt] = useState("");
  const [editLieferbar, setEditLieferbar] = useState(false);
  const [editSchlagwoerter, setEditSchlagwoerter] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [editPreis, setEditPreis] = useState(0);
  const [editRabatt, setEditRabatt] = useState(0);
  const [editDatum, setEditDatum] = useState("");
  const [editHomepage, setEditHomepage] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [buchDataWithUniqueId, setBuchDataWithUniqueId] = useState([]);
  const { cToken } = useContext(AuthContext); // Get the cToken from the AuthContext

  const handleSearch = useCallback(async () => {
    console.log("Starting search with id:", id); // Log for search start
    try {
      const response = await axios.get(`/api/rest/${id}`);
      const results = response.data;
      console.log("Search results:", results); // Log for search results

      if (results.length === 0) {
        console.warn("No results found for id:", id); // Log for no results
        setSearchError(true);
        setShowTable(false);
        setBuchDataWithUniqueId([]);
      } else {
        console.log("Results found:", results);
        setBuch(results);
        setEtag(response.headers['etag']);
        setSearchError(false);
        setShowTable(true);
        setEditTitel(results.titel?.titel || "");
        setEditIsbn(results.isbn || "");
        setEditArt(results.art || "");
        setEditLieferbar(results.lieferbar || false);
        setEditSchlagwoerter(results.schlagwoerter.join(", ") || "");
        setEditRating(results.rating || 0);
        setEditPreis(results.preis || 0);
        setEditRabatt(results.rabatt || 0);
        setEditDatum(results.datum || "");
        setEditHomepage(results.homepage || "");
      }
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      setSearchError(true);
      setShowTable(false);
    }
  }, [id]);

  const handleSave = async () => {
    console.log("Saving book with id:", id);
    const updatedBook = {
      ...buch,
      titel: { titel: editTitel },
      isbn: editIsbn,
      art: editArt,
      lieferbar: editLieferbar,
      schlagwoerter: editSchlagwoerter.split(",").map(s => s.trim()),
      rating: editRating,
      preis: editPreis,
      rabatt: editRabatt,
      datum: editDatum,
      homepage: editHomepage,
    };

    console.log("Request body:", updatedBook);

    try {
      await axios.put(
        `/api/rest/${id}`,
        updatedBook,
        {
          headers: {
            'Authorization': `Bearer ${cToken}`,
            'Content-Type': 'application/json',
            'If-Match': etag,
          }
        }
      );
      console.log("Book saved successfully:", updatedBook);
      
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  useEffect(() => {
    if (id) {
      handleSearch();
    }
  }, [id, handleSearch])

  return (
    <div>
      <EditForm
            editTitel={editTitel}
            setEditTitel={setEditTitel}
            editIsbn={editIsbn}
            setEditIsbn={setEditIsbn}
            editArt={editArt}
            setEditArt={setEditArt}
            editLieferbar={editLieferbar}
            setEditLieferbar={setEditLieferbar}
            editSchlagwoerter={editSchlagwoerter}
            setEditSchlagwoerter={setEditSchlagwoerter}
            editRating={editRating}
            setEditRating={setEditRating}
            editPreis={editPreis}
            setEditPreis={setEditPreis}
            editRabatt={editRabatt}
            setEditRabatt={setEditRabatt}
            editDatum={editDatum}
            setEditDatum={setEditDatum}
            editHomepage={editHomepage}
            setEditHomepage={setEditHomepage}
            handleSearch={handleSearch}
            handleSave={handleSave}
            searchError={searchError}
            showTable={showTable}
            buchDataWithUniqueId={buchDataWithUniqueId}
          />
    </div>
  );
};

export default BookEdit;