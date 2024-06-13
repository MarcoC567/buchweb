import {
    FormControl,
    FormLabel,
    Box,
    Button,
    Input,
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
  editPreis,
  setEditPreis,
  editRabatt,
  setEditRabatt,
  editLieferbar,
  setEditLieferbar,
  editDatum,
  setEditDatum,
  editHomepage,
  setEditHomepage,
  editSchlagwoerter,
  setEditSchlagwoerter,
  handleSearch,
}) => {
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
          <Input
            placeholder="Art eingeben"
            value={editArt}
            onChange={(e) => setEditArt(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie die neue Art Ihres Buches ein
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Preis</FormLabel>
          <Input
            placeholder="Preis eingeben"
            type="number"
            value={editPreis}
            onChange={(e) => setEditPreis(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie den neuen Preis Ihres Buches ein
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Rabatt</FormLabel>
          <Input
            placeholder="Rabatt eingeben"
            type="number"
            value={editRabatt}
            onChange={(e) => setEditRabatt(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie den neuen Rabatt Ihres Buches ein
          </FormHelperText>
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
          <FormLabel>Datum</FormLabel>
          <Input
            placeholder="Datum eingeben"
            type="date"
            value={editDatum}
            onChange={(e) => setEditDatum(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie das neue Datum Ihres Buches ein
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Homepage</FormLabel>
          <Input
            placeholder="Homepage eingeben"
            value={editHomepage}
            onChange={(e) => setEditHomepage(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie die neue Homepage Ihres Buches ein
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Schlagwörter</FormLabel>
          <Input
            placeholder="Schlagwörter eingeben"
            value={editSchlagwoerter}
            onChange={(e) => setEditSchlagwoerter(e.target.value)}
          />
          <FormHelperText>
            Bitte geben Sie die neuen Schlagwörter Ihres Buches ein
          </FormHelperText>
        </FormControl>
      </Box>
      <Box display="flex" mb={8}>
          <Button
            colorScheme="green"
            leftIcon={<CheckIcon />}
            onClick={handleSearch}
            mr={4}
          >
            Bestätigen
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
  editPreis: PropTypes.number.isRequired,
  setEditPreis: PropTypes.func.isRequired,
  editRabatt: PropTypes.number.isRequired,
  setEditRabatt: PropTypes.func.isRequired,
  editLieferbar: PropTypes.bool.isRequired,
  setEditLieferbar: PropTypes.func.isRequired,
  editDatum: PropTypes.string.isRequired,
  setEditDatum: PropTypes.func.isRequired,
  editHomepage: PropTypes.string.isRequired,
  setEditHomepage: PropTypes.func.isRequired,
  editSchlagwoerter: PropTypes.string.isRequired,
  setEditSchlagwoerter: PropTypes.func.isRequired,
  // cToken: PropTypes.string,
  handleDeleteRow: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  };

export default BookEditForm;