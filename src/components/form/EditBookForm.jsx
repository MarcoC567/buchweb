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
  handleSearch,
  handleSave,
}) => {
  const isSchlagwortSelected = (schlagwort) => {
    return editSchlagwoerter.includes(schlagwort);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const newSchlagwoerter = new Set(editSchlagwoerter.split(',').map(sw => sw.trim()).filter(Boolean));
    
    if (checked) {
      newSchlagwoerter.add(value);
    } else {
      newSchlagwoerter.delete(value);
    }

    setEditSchlagwoerter(Array.from(newSchlagwoerter).join(', '));
  };

  return (
    <div>
      <Box>
        <FormControl>
          <FormLabel>Titel</FormLabel>
          <Input
            placeholder="Titel eingeben"
            value={editTitel}
            onChange={(e) => setEditTitel(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie den neuen Titel Ihres Buches ein
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>ISBN</FormLabel>
          <Input
            placeholder="ISBN eingeben"
            value={editIsbn}
            onChange={(e) => setEditIsbn(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie die neue ISBN Ihres Buches ein
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
            value="JavaScript"
            isChecked={isSchlagwortSelected("JAVASCRIPT")}
            onChange={handleCheckboxChange}
          >
            JavaScript
          </Checkbox>
          <Checkbox
            value="TypeScript"
            isChecked={isSchlagwortSelected("TYPESCRIPT")}
            onChange={handleCheckboxChange}
          >
            TypeScript
          </Checkbox>
          <FormHelperText>
            Bitte wählen Sie die Schlagwörter Ihres Buches aus
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" mb={8}>
        <Button
          colorScheme="green"
          leftIcon={<CheckIcon />}
          onClick={handleSave}
          mr={4}
        >
          Bestätigen
        </Button>
        <Button
          colorScheme="blue"
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
  editSchlagwoerter: PropTypes.string.isRequired,
  setEditSchlagwoerter: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  };

export default BookEditForm;