import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchForm from "../form/SearchBookForm";
import { useAuth } from "../provider/useAuth.js";

const BookSearch = () => {
  const [buchData, setBuchData] = useState([]);
  const [searchIsbn, setSearchIsbn] = useState("");
  const [searchTitel, setSearchTitel] = useState("");
  const [selectedRatingOption, setSelectedRatingOption] = useState("");
  const [ratingOptions, setRatingOptions] = useState([]);
  const [isJavaScript, setIsJavaScript] = useState(false);
  const [isTypeScript, setIsTypeScript] = useState(false);
  const [selectedBookFormat, setSelectedBookFormat] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { cToken, writeAccess } = useAuth();
  const navigate = useNavigate();

  function getIdFromLinks(_links) {
    let selfLink = null;

    if (_links !== undefined) {
      const { self } = _links;
      if (self !== undefined) {
        selfLink = self.href;
      }
    }

    let id = "N/A";
    if (selfLink !== null) {
      const lastSlash = selfLink.lastIndexOf("/");
      id = selfLink.slice(lastSlash + 1);
    }

    return id;
  }

  const handleSearch = async () => {
    setSearchError(false);
    setShowTable(true);
    console.log(cToken);

    try {
      let apiUrl = "/api/rest";
      const searchParams = [
        { term: "isbn", value: searchIsbn },
        { term: "titel", value: searchTitel },
        { term: "rating", value: selectedRatingOption },
        { term: "javascript", value: isJavaScript },
        { term: "typescript", value: isTypeScript },
        { term: "art", value: selectedBookFormat },
      ];
      console.log(apiUrl);
      searchParams.forEach((param) => {
        apiUrl = appendSearchTerm(apiUrl, param.term, param.value);
      });

      const response = await axios.get(apiUrl);

      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = response.data;
      setBuchData(
        Array.isArray(data._embedded.buecher) ? data._embedded.buecher : []
      );
      setSearchError(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchError(true);
    }
  };

  function appendSearchTerm(apiUrl, searchTerm, searchValue) {
    return searchValue
      ? `${apiUrl}${
          apiUrl.includes("?") ? "&" : "?"
        }${searchTerm}=${searchValue}`
      : apiUrl;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/rest");
        if (response.status !== 200) {
          throw new Error("Failed to fetch ratings");
        }
        const data = response.data;
        const ratings = [
          ...new Set(
            data._embedded.buecher
              .map((buch) => buch.rating)
              .sort((a, b) => a - b)
          ),
        ];
        setRatingOptions(ratings);
        setSearchError(false);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setSearchError(true);
      }
    };
    fetchData();
  }, []);

  const buchDataWithUniqueId = buchData.map((buch) => ({
    ...buch,
    uniqueIsbn: buch.isbn,
    id: getIdFromLinks(buch._links),
  }));

  const navigateToDetails = (params) => {
    console.log("params:", params);
    if (!params || !params.row || !params.row.id) {
      console.error("Invalid params:", params);
      return;
    }
    navigate(`/bookdetails/${params.row.id}`);
  };

  const navigateToBookEdit = (params) => {
    console.log("params:", params);
    if (!params || !params.row || !params.row.id) {
      console.error("Invalid params:", params);
      return;
    }
    navigate(`/bookedit/${params.row.id}`);
  };

  const handleDeleteRow = async (id, cToken) => {
    try {
      if (!cToken) {
        throw new Error("No token available");
      }

      const headers = {
        Authorization: `Bearer ${cToken}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`/api/rest/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      const updatedRows = buchDataWithUniqueId.filter((row) => row.id !== id);
      setBuchData(updatedRows);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleReset = () => {
    setSearchIsbn("");
    setSearchTitel("");
    setSelectedRatingOption("");
    setIsJavaScript(false);
    setIsTypeScript(false);
    setSelectedBookFormat("");
  };

  return (
    <div>
      <SearchForm
        searchIsbn={searchIsbn}
        setSearchIsbn={setSearchIsbn}
        searchTitel={searchTitel}
        setSearchTitel={setSearchTitel}
        setSelectedRatingOption={setSelectedRatingOption}
        selectedRatingOption={String(selectedRatingOption)}
        ratingOptions={ratingOptions}
        isJavaScript={isJavaScript}
        setIsJavaScript={setIsJavaScript}
        isTypeScript={isTypeScript}
        setIsTypeScript={setIsTypeScript}
        selectedBookFormat={selectedBookFormat}
        setSelectedBookFormat={setSelectedBookFormat}
        handleSearch={handleSearch}
        searchError={searchError}
        showTable={showTable}
        navigateToDetails={navigateToDetails}
        handleDeleteRow={handleDeleteRow}
        cToken={cToken}
        navigateToBookEdit={navigateToBookEdit}
        buchDataWithUniqueId={buchDataWithUniqueId}
        handleReset={handleReset}
        writeAccess={writeAccess}
      />
    </div>
  );
};

export default BookSearch;
