import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import EditForm from "../form/EditBookForm";
import { AuthContext } from "../provider/AuthProvider";

const BookEdit = () => {
  const { id } = useParams();
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
  const { cToken } = useContext(AuthContext);

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get(`/api/rest/${id}`, {});
      const results = response.data;

      if (results.length === 0) {
        setSearchError(true);
      } else {
        setEtag(response.headers["etag"]);
        setSearchError(false);
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
    }
  }, [id]);

  const handleSave = async () => {
    const buchDTO = {
      isbn: editIsbn,
      art: editArt,
      lieferbar: editLieferbar,
      rating: editRating,
      preis: parseFloat(editPreis),
      rabatt: parseFloat(editRabatt),
      datum: editDatum,
      homepage: editHomepage,
      schlagwoerter: editSchlagwoerter,
      titel: {
        titel: editTitel,
      },
    };

    try {
      const response = await axios.put(`/api/rest/${id}`, buchDTO, {
        headers: {
          Authorization: `Bearer ${cToken}`,
          "Content-Type": "application/json",
          "If-Match": etag,
        },
      });

      if (response.status === 204) {
        console.log("Buch wurde erfolgreich bearbeitet.");
      } else {
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
  }, [id, handleSearch]);

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
      />
    </div>
  );
};

export default BookEdit;
