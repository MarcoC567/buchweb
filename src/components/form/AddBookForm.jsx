import {
  Button,
  FormLabel,
  Input,
  Select,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  FormHelperText,
  HStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import {
  validateISBN,
  validateTitel,
  validatePreis,
  validateRabatt,
  validateHomepage,
} from "./inputValidator";

const AddBookForm = ({ book, handleAddBook, feedbackMessage }) => {
  const [isbnValidation, setIsbnValidation] = useState({
    isValid: true,
    errorMessage: "",
  });

  const [titleValidation, setTitleValidation] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [preisValidation, setPreisValidation] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [rabattValidation, setRabattValidation] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [homepageValidation, setHomepageValidation] = useState({
    isValid: true,
    errorMessage: "",
  });
  const [formValid, setFormValid] = useState(true);

  const [addBook, setAddBook] = useState({ ...book, art: "KINDLE" });

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    const transformedValue =
      name === "datum" ? new Date(value).toISOString().split("T")[0] : value;

    setAddBook((prevBook) => ({
      ...prevBook,
      [name]: transformedValue,
    }));
  };

  const bookDTO = {
    isbn: addBook.isbn,
    rating: parseInt(addBook.rating),
    art: addBook.art,
    preis: parseFloat(addBook.preis),
    rabatt: isNaN(addBook.rabatt) ? 0 : parseFloat(addBook.rabatt),
    lieferbar: addBook.lieferbar === "true" ? true : false,
    datum: addBook.datum,
    homepage: addBook.homepage,
    schlagwoerter: (addBook.javascript ? ["JAVASCRIPT"] : []).concat(
      addBook.typescript ? ["TYPESCRIPT"] : []
    ),
    titel: {
      titel: addBook.titel,
    },
  };

  const handleRatingChange = (e) => {
    const { value } = e.target;
    setAddBook((prevBook) => ({
      ...prevBook,
      rating: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAddBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));

    if (name === "isbn") {
      const isValidISBN = validateISBN(value);
      setIsbnValidation({
        isValid: isValidISBN,
        errorMessage: isValidISBN ? "" : "Muss eine gültige ISBN sein",
      });
    }

    if (name === "titel") {
      const isValidTitle = validateTitel(value);
      setTitleValidation({
        isValid: isValidTitle,
        errorMessage: isValidTitle ? "" : "Der Titel darf nicht leer sein",
      });
    }

    if (name === "preis") {
      const isValidPreis = validatePreis(value);
      setPreisValidation({
        isValid: isValidPreis,
        errorMessage: isValidPreis ? "" : "Ungültiges Betragsformat",
      });
    }

    if (name === "rabatt") {
      const isValidRabatt = validateRabatt(value);
      setRabattValidation({
        isValid: isValidRabatt,
        errorMessage: isValidRabatt
          ? ""
          : "Muss ein gültiger Rabatt sein (z.B. 0.10)",
      });
    }

    if (name === "homepage") {
      const isValidHomepage = validateHomepage(value);
      setHomepageValidation({
        isValid: isValidHomepage,
        errorMessage: isValidHomepage
          ? ""
          : "Muss eine gültige URL sein (https://beispiel.com)",
      });
    }
  };

  useEffect(() => {
    setFormValid(
      isbnValidation.isValid &&
        titleValidation.isValid &&
        preisValidation.isValid &&
        rabattValidation.isValid &&
        homepageValidation.isValid
    );
  }, [
    isbnValidation.isValid,
    titleValidation.isValid,
    preisValidation.isValid,
    rabattValidation.isValid,
    homepageValidation.isValid,
  ]);

  const handleRadioChange = (value) => {
    setAddBook((prevBook) => ({
      ...prevBook,
      lieferbar: value,
    }));
  };

  return (
    <>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>ISBN</FormLabel>
            <Input
              required
              type="text"
              name="isbn"
              value={addBook.isbn || ""}
              onChange={handleInputChange}
              isInvalid={!isbnValidation.isValid}
            />
            <FormHelperText color="red">
              {isbnValidation.errorMessage}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Titel</FormLabel>
            <Input
              required
              type="text"
              name="titel"
              value={addBook.titel || ""}
              onChange={handleInputChange}
              isInvalid={!titleValidation.isValid}
            />
            <FormHelperText color="red">
              {titleValidation.errorMessage}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Select
              name="rating"
              value={addBook.rating || ""}
              onChange={handleRatingChange}
            >
              <option value="">Bitte wählen</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Art</FormLabel>
            <Select
              name="art"
              value={addBook.art || ""}
              onChange={(e) =>
                setAddBook((prevBook) => ({
                  ...prevBook,
                  art: e.target.value,
                }))
              }
            >
              <option value="KINDLE">Kindle</option>
              <option value="DRUCKAUSGABE">Druckausgabe</option>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Datum</FormLabel>

            <Input
              type="date"
              name="datum"
              value={addBook.datum || ""}
              onChange={handleDateChange}
            />
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Lieferbar</FormLabel>

            <RadioGroup
              name="lieferbar"
              value={addBook.lieferbar}
              onChange={handleRadioChange}
            >
              <HStack spacing="8px">
                <Radio value="true">Ja</Radio>
                <Radio value="false">Nein</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Homepage:</FormLabel>
            <Input
              type="text"
              name="homepage"
              value={addBook.homepage || ""}
              onChange={handleInputChange}
              isInvalid={!homepageValidation.isValid}
            />
            <FormHelperText color="red">
              {homepageValidation.errorMessage}
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel>Preis</FormLabel>
            <Input
              required
              type="text"
              name="preis"
              value={addBook.preis || ""}
              onChange={handleInputChange}
              isInvalid={!preisValidation.isValid}
            />
            <FormHelperText color="red">
              {preisValidation.errorMessage}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Rabatt</FormLabel>
          <Input
            type="text"
            name="rabatt"
            value={addBook.rabatt || ""}
            onChange={handleInputChange}
            isInvalid={!rabattValidation.isValid}
          />
          <FormHelperText color="red">
            {rabattValidation.errorMessage}
          </FormHelperText>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        bg="black"
        color={"white"}
        onClick={() => handleAddBook(bookDTO)}
        disabled={!formValid}
      >
        Buch anlegen
      </Button>
      {feedbackMessage && (
        <div
          style={{
            marginTop: "10px",
            color: feedbackMessage.includes("erfolgreich") ? "green" : "red",
          }}
        >
          {feedbackMessage}
        </div>
      )}
    </>
  );
};

AddBookForm.propTypes = {
  book: PropTypes.object.isRequired,
  handleAddBook: PropTypes.func.isRequired,
  feedbackMessage: PropTypes.string,
};

export default AddBookForm;
