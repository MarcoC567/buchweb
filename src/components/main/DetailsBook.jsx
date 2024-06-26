import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBookForm from "../form/DetailsBookForm";

const BookDetails = () => {
  const { id } = useParams();
  const [buchTitel, setBuchTitel] = useState("");
  const [buchUntertitel, setBuchUntertitel] = useState("");
  const [buchPreis, setBuchPreis] = useState("");
  const [buchArt, setBuchArt] = useState("");
  const [buchDatum, setBuchDatum] = useState("");
  const [buchHomepage, setBuchHomepage] = useState("");
  const [buchLieferbar, setBuchLieferbar] = useState(false);
  const [buchRabatt, setBuchRabatt] = useState(0);
  const [buchRating, setBuchRating] = useState(0);
  const [buchSchlagwoerter, setBuchSchlagwoerter] = useState([]);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = useCallback(async () => {
    console.log("Suche nach Buch mit der ID:", id);
    try {
      const response = await axios.get(`/api/rest/${id}`);
      const results = response.data;
      console.log("Ergebnisse:", results);

      if (!results) {
        console.warn("Keine Ergebnisse für ID gefunden:", id);
        setSearchError(true);
      } else {
        setSearchError(false);
        setBuchTitel(results.titel?.titel || "Kein Titel gefunden");
        setBuchUntertitel(
          results.titel?.untertitel !== "null"
            ? results.titel?.untertitel
            : "Kein Untertitel vorhanden"
        );
        setBuchPreis(results.preis || "");
        setBuchArt(results.art || "Art nicht verfügbar");
        setBuchDatum(results.datum || "Datum nicht verfügbar");
        setBuchHomepage(results.homepage || "Homepage nicht verfügbar");
        setBuchLieferbar(results.lieferbar || false);
        setBuchRabatt(results.rabatt || 0);
        setBuchRating(results.rating || 0);
        setBuchSchlagwoerter(
          results.schlagwoerter && results.schlagwoerter.length > 0
            ? results.schlagwoerter
            : ["-"]
        );
      }
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      setSearchError(true);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      handleSearch();
    }
  }, [id, handleSearch]);

  return (
    <div>
      <DetailsBookForm
        buchTitel={buchTitel}
        buchUntertitel={buchUntertitel}
        buchPreis={buchPreis}
        buchArt={buchArt}
        buchDatum={buchDatum}
        buchHomepage={buchHomepage}
        buchLieferbar={buchLieferbar}
        buchRabatt={buchRabatt}
        buchRating={buchRating}
        buchSchlagwoerter={buchSchlagwoerter}
        searchError={searchError}
      />
    </div>
  );
};

export default BookDetails;
