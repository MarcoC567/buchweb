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
  editLieferbar,
  setEditLieferbar,
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
  editLieferbar: PropTypes.bool.isRequired,
  setEditLieferbar: PropTypes.func.isRequired,
  editSchlagwoerter: PropTypes.string.isRequired,
  setEditSchlagwoerter: PropTypes.func.isRequired,
  // cToken: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  };

export default BookEditForm;