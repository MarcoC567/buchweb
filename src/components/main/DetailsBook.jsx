import axios from 'axios';
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DetailsBookForm from "../form/DetailsBookForm";

const BookDetails = () => {
    const { id } = useParams(); // Extracts the id from the URL
    const [buchTitel, setBuchTitel] = useState("");
    const [buchUntertitel, setBuchUntertitel] = useState("");
    const [buchPreis, setBuchPreis] = useState("");
    const [buchZusätzlicheInformationen, setBuchZusätzlicheInformationen] = useState("");
    const [searchError, setSearchError] = useState(false);

    const handleSearch = useCallback(async () => {
        console.log('Searching for book with id:', id);
        try {
            const response = await axios.get(`/api/rest/${id}`);
            const results = response.data;
            console.log("Search results:", results);

            if (results.length === 0) {
                console.warn("No results found for id:", id); // Log for no results
                setSearchError(true);
            } else {
                console.log("Results found:", results);
                setSearchError(false);
                setBuchTitel(results.titel?.titel || "");
                setBuchUntertitel(results.untertitel || "");
                setBuchPreis(results.preis || "");
                setBuchZusätzlicheInformationen(results.zusätzlicheInformationen || "");
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
                buchZusätzlicheInformationen={buchZusätzlicheInformationen}
                searchError={searchError}
            />
        </div>
    );
};

export default BookDetails;
