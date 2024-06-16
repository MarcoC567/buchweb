import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import EditForm from "../form/EditBookForm";
//import { AuthContext } from '../provider/AuthProvider';

const BookEdit = () => {
  const { id } = useParams(); // Extrahiere die ID aus der URL
  const [editTitel, setEditTitel] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editArt, setEditArt] = useState("");
  const [editLieferbar, setEditLieferbar] = useState(false);
  const [editSchlagwoerter, setEditSchlagwoerter] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [buchDataWithUniqueId, setBuchDataWithUniqueId] = useState([]);

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
        setSearchError(false);
        setShowTable(true);
        setBuchDataWithUniqueId(results);
        setEditTitel(results.titel?.titel || "");
        setEditIsbn(results.isbn || "");
        setEditArt(results.art || "");
        setEditLieferbar(results.lieferbar || false);
        setEditSchlagwoerter(results.schlagwoerter.join(", ") || "");

      }
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      setSearchError(true);
      setShowTable(false);
    }
  }, [id]);

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
            handleSearch={handleSearch}
            searchError={searchError}
            showTable={showTable}
            buchDataWithUniqueId={buchDataWithUniqueId}
          />
    </div>
  );
};

export default BookEdit;