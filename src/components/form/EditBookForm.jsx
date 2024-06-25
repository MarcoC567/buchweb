import {
    FormControl,
    FormLabel,
    Box,
    Button,
    Input,
    Select,
    FormHelperText,
    Checkbox,
  } from "@chakra-ui/react";

  import {
    CheckIcon,
  } from "@chakra-ui/icons";

  import PropTypes from "prop-types";
  import { useState, useEffect } from "react";
  
  import {
    validateISBN,
    validateTitel,
    validatePreis,
    validateRabatt,
    validateHomepage,
  } from "./inputValidator";

const BookEditForm = ({
  editTitel,
  setEditTitel,
  editIsbn,
  setEditIsbn,
  editArt,
  setEditArt,
  editLieferbar,
  setEditLieferbar,
  editSchlagwoerter,
  setEditSchlagwoerter,
  editPreis,
  setEditPreis,
  editRabatt,
  setEditRabatt,
  editHomepage,
  setEditHomepage,
  handleSearch,
  handleSave,
}) => {
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

  const isSchlagwortSelected = (schlagwort) => {
    return editSchlagwoerter.includes(schlagwort);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newSchlagwort = [...editSchlagwoerter];

    if (checked) {
      newSchlagwort.push(value);
    } else {
      newSchlagwort = newSchlagwort.filter((schlagwort) => schlagwort !== value);
    }

    setEditSchlagwoerter(newSchlagwort);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "isbn") {
      setEditIsbn(value);
      const isValidISBN = validateISBN(value);
      setIsbnValidation({
        isValid: isValidISBN,
        errorMessage: isValidISBN ? "" : "Muss eine gültige ISBN sein",
      });
    }

    if (name === "titel") {
      setEditTitel(value);
      const isValidTitle = validateTitel(value);
      setTitleValidation({
        isValid: isValidTitle,
        errorMessage: isValidTitle ? "" : "Der Titel darf nicht leer sein",
      });
    }

    if (name === "preis") {
      setEditPreis(value);
      const isValidPreis = validatePreis(value);
      setPreisValidation({
        isValid: isValidPreis,
        errorMessage: isValidPreis ? "" : "Ungültiges Betragsformat",
      });
    }

    if (name === "rabatt") {
      setEditRabatt(value);
      const isValidRabatt = validateRabatt(value);
      setRabattValidation({
        isValid: isValidRabatt,
        errorMessage: isValidRabatt
          ? ""
          : "Muss ein gültiger Rabatt sein (z.B. 0.10)",
      });
    }

    if (name === "homepage") {
      setEditHomepage(value);
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

  return (
    <div>
      <Box>
        <FormControl>
          <FormLabel>Titel</FormLabel>
          <Input
            placeholder="Titel eingeben"
            name="titel"
            value={editTitel}
            onChange={handleInputChange}
            isInvalid={!titleValidation.isValid}
          />
          <FormHelperText color="red">
            {titleValidation.errorMessage}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>ISBN</FormLabel>
          <Input
            placeholder="ISBN eingeben"
            name="isbn"
            value={editIsbn}
            onChange={handleInputChange}
            isInvalid={!isbnValidation.isValid}
          />
          <FormHelperText color="red">
            {isbnValidation.errorMessage}
          </FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Art</FormLabel>
            <Select
              name="art"
              value={editArt || ""}
              onChange={(e) =>
                setEditArt((e.target.value)
                )
              }
            >
              <option value="KINDLE">Kindle</option>
              <option value="DRUCKAUSGABE">Druckausgabe</option>
            </Select>
          </FormControl>
        <FormControl>
          <FormLabel>Lieferbar</FormLabel>
          <Checkbox
            isChecked={editLieferbar}
            onChange={(e) => setEditLieferbar(e.target.checked)}
          >
            Lieferbar
          </Checkbox>
          <FormHelperText>
            Ist das Buch lieferbar?
          </FormHelperText>
        </FormControl>
        <FormControl>
        <FormLabel>Schlagwörter</FormLabel>
          <Checkbox
            value="JAVASCRIPT"
            isChecked={isSchlagwortSelected("JAVASCRIPT")}
            onChange={handleCheckboxChange}
          >
            JavaScript
          </Checkbox>
          <Checkbox
            value="TYPESCRIPT"
            isChecked={isSchlagwortSelected("TYPESCRIPT")}
            onChange={handleCheckboxChange}
          >
            TypeScript
          </Checkbox>
          <FormHelperText>
            Bitte wählen Sie die Schlagwörter Ihres Buches aus
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Preis</FormLabel>
          <Input
            placeholder="Preis eingeben"
            name="preis"
            value={editPreis}
            onChange={handleInputChange}
            isInvalid={!preisValidation.isValid}
          />
          <FormHelperText color="red">
            {preisValidation.errorMessage}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Rabatt</FormLabel>
          <Input
            placeholder="Rabatt eingeben"
            name="rabatt"
            value={editRabatt}
            onChange={handleInputChange}
            isInvalid={!rabattValidation.isValid}
          />
          <FormHelperText color="red">
            {rabattValidation.errorMessage}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Homepage</FormLabel>
          <Input
            placeholder="Homepage eingeben"
            name="homepage"
            value={editHomepage}
            onChange={handleInputChange}
            isInvalid={!homepageValidation.isValid}
          />
          <FormHelperText color="red">
            {homepageValidation.errorMessage}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" mb={8}>
        <Button
          bg="black" color="white"
          leftIcon={<CheckIcon />}
          onClick={handleSave}
          mr={4}
          disabled={!formValid}
        >
          Bestätigen
        </Button>
        <Button
          bg="black" color="white"
          onClick={handleSearch}
          mr={4}
        >
          Zurücksetzen
        </Button>
      </Box>
    </div>
  );
};

BookEditForm.propTypes = {
  editTitel: PropTypes.string.isRequired,
  setEditTitel: PropTypes.func.isRequired,
  editIsbn: PropTypes.string.isRequired,
  setEditIsbn: PropTypes.func.isRequired,
  editArt: PropTypes.string.isRequired,
  setEditArt: PropTypes.func.isRequired,
  editLieferbar: PropTypes.bool.isRequired,
  setEditLieferbar: PropTypes.func.isRequired,
  editSchlagwoerter: PropTypes.array.isRequired,
  setEditSchlagwoerter: PropTypes.func.isRequired,
  editPreis: PropTypes.number.isRequired,
  setEditPreis: PropTypes.func.isRequired,
  editRabatt: PropTypes.number.isRequired,
  setEditRabatt: PropTypes.func.isRequired,
  editHomepage: PropTypes.string.isRequired,
  setEditHomepage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  };

export default BookEditForm;