import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import EditForm from "../form/EditBookForm";
import { AuthContext } from '../provider/AuthProvider';

const BookEdit = () => {
  const { id } = useParams();
  const [buch, setBuch] = useState({});
  const [etag, setEtag] = useState("");
  const [editTitel, setEditTitel] = useState("");
  const [editIsbn, setEditIsbn] = useState("");
  const [editArt, setEditArt] = useState("");
  const [editLieferbar, setEditLieferbar] = useState(false);
  const [editSchlagwoerter, setEditSchlagwoerter] = useState([]);
  const [editRating, setEditRating] = useState(0);
  const [editPreis, setEditPreis] = useState(0);
  const [editRabatt, setEditRabatt] = useState(0);
  const [editDatum, setEditDatum] = useState("");
  const [editHomepage, setEditHomepage] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [buchDataWithUniqueId, setBuchDataWithUniqueId] = useState([]);
  const { cToken } = useContext(AuthContext);

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(`/api/rest/${id}`, {
      });      const results = response.data;

      if (results.length === 0) {
        setSearchError(true);
        setShowTable(false);
        setBuchDataWithUniqueId([]);
      } else {
        setBuch(results);
        setEtag(response.headers['etag']);
        setSearchError(false);
        setShowTable(true);
        setEditTitel(results.titel?.titel || "");
        setEditIsbn(results.isbn || "");
        setEditArt(results.art || "");
        setEditLieferbar(results.lieferbar || false);
        setEditSchlagwoerter(results.schlagwoerter || []);
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
    const updatedBook = {
      ...buch,
      titel: { titel: editTitel },
      isbn: editIsbn,
      art: editArt,
      lieferbar: editLieferbar,
      schlagwoerter: editSchlagwoerter,
      rating: editRating,
      preis: parseFloat(editPreis),
      rabatt: parseFloat(editRabatt),
      datum: editDatum,
      homepage: editHomepage,
    };
    
    try {
      const response = await axios.put(`/api/rest/${id}`, updatedBook, {
        headers: {
            'Authorization': `Bearer ${cToken}`,
            'Content-Type': 'application/json',
            'If-Match': etag,
          }
        }
      );
      console.log("Book data:", updatedBook);
      console.log("Server response:", response);

      if (response.status === 204) {
        console.log("Buch wurde erfolgreich bearbeitet.");
        setBuch(response.data);
        setEtag(response.headers['etag']);
        setEditTitel(response.data.titel?.titel || "");
        setEditIsbn(response.data.isbn || "");
        setEditArt(response.data.art || "");
        setEditLieferbar(response.data.lieferbar || false);
        setEditSchlagwoerter(response.data.schlagwoerter || []);
        setEditRating(response.data.rating || 0);
        setEditPreis(response.data.preis || 0);
        setEditRabatt(response.data.rabatt || 0);
        setEditDatum(response.data.datum || "");
        setEditHomepage(response.data.homepage || "");
      }
      else {
        console.error("Error occurred during PUT request:", response);
      }

      handleSearch();
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