import {
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Box,
    Text,
    IconButton,
    Button,
    Icon,
    Input,
    FormHelperText,
    Select,
    MenuItem,
    Stack,
    Checkbox,
    VStack,
  } from "@chakra-ui/react";

  import {
    InfoIcon,
    SearchIcon,
    WarningIcon,
    DeleteIcon,
  } from "@chakra-ui/icons";

  import PropTypes from "prop-types";

  const BookEditForm = ({
    editTitel,
    setEditTitel,
    searchError,
    showTable,
    buchDataWithUniqueId,
    navigateToDetails,
    //cToken,
    handleDeleteRow,
  }) => {  
    return (
    <div>
      
      <Box>
        <FormControl>
          <FormLabel>Titel</FormLabel>
            <Input
              placeholder={editTitel}
              value={editTitel}
              onChange={(e) => setEditTitel(e.target.value)}
            />
          <FormHelperText>
            Bitte geben Sie den neuen Titel Ihres Buches ein
          </FormHelperText>
        </FormControl>
      </Box>
      {searchError ? (
        <Text style={{ display: "flex", alignItems: "center" }}>
          <WarningIcon style={{ marginRight: "5px" }} />
          Keine Bücher gefunden.
        </Text>
    ) : showTable ? (
        <Box>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ISBN</th>
                <th>Titel</th>
                <th>Rating</th>
                <th>Art</th>
                <th>Schlagwörter</th>
                <th>Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {buchDataWithUniqueId.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.isbn}</td>
                  <td>{row.titel}</td>
                  <td>{row.rating}</td>
                  <td>{row.art}</td>
                  <td>{row.schlagwoerter}</td>
                  <td>
                    <IconButton
                      aria-label="search"
                      color="primary"
                      onClick={() => navigateToDetails(row.id)}
                    >
                      <SearchIcon />
                    </IconButton>
                    {
                      //cToken &&
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteRow(row.id /*cToken*/);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      ) : null}
    </div>
  );
};

BookEditForm.propTypes = {
  editTitel: PropTypes.string.isRequired,
  setEditTitel: PropTypes.string.isRequired,
  searchError: PropTypes.bool.isRequired,
  showTable: PropTypes.bool.isRequired,
  buchDataWithUniqueId: PropTypes.array.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
  // cToken: PropTypes.string,
  handleDeleteRow: PropTypes.func.isRequired,
  };

export default BookEditForm;