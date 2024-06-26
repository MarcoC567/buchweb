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
  Stack,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import {
  InfoIcon,
  SearchIcon,
  WarningIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";

import PropTypes from "prop-types";

const BookSearchForm = ({
  searchIsbn,
  setSearchIsbn,
  searchTitel,
  setSearchTitel,
  selectedRatingOption,
  setSelectedRatingOption,
  ratingOptions,
  isJavaScript,
  setIsJavaScript,
  isTypeScript,
  setIsTypeScript,
  selectedBookFormat,
  setSelectedBookFormat,
  handleSearch,
  searchError,
  showTable,
  buchDataWithUniqueId,
  navigateToDetails,
  navigateToBookEdit,
  cToken,
  handleDeleteRow,
  handleReset,
  writeAccess,
}) => {
  return (
    <div>
      <Box>
        <Box>
          <FormControl>
            <FormLabel>Titel</FormLabel>
            <Input
              placeholder="Titel des gesuchten Buchs"
              value={searchTitel}
              onChange={(e) => setSearchTitel(e.target.value)}
            />
            <FormHelperText>
              Bitte geben Sie den Titel Ihres Buches ein
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>ISBN</FormLabel>
            <Input
              placeholder="ISBN Nummer des gesuchten Buches"
              value={searchIsbn}
              onChange={(e) => setSearchIsbn(e.target.value)}
            />
            <FormHelperText>
              Bitte geben Sie die ISBN Nummer Ihres Buches ein
            </FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Rating</FormLabel>{" "}
            <Select
              placeholder="Wählen Sie ein Rating"
              value={selectedRatingOption}
              onChange={(e) => setSelectedRatingOption(e.target.value)}
            >
              {ratingOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="20px"
        >
          <Box width="100%" maxWidth="200px" mt="35px">
            <VStack align="flex-start" spacing={4} width="100%">
              <FormLabel as="legend" textAlign="left" width="100%">
                JavaScript oder TypeScript
              </FormLabel>
              <FormControl
                display="flex"
                justifyContent="flex-start"
                width="100%"
              >
                <Checkbox
                  id="typescript"
                  isChecked={isTypeScript}
                  onChange={(e) => setIsTypeScript(e.target.checked)}
                >
                  TypeScript
                </Checkbox>
              </FormControl>
              <FormControl
                display="flex"
                justifyContent="flex-start"
                width="100%"
              >
                <Checkbox
                  id="javascript"
                  isChecked={isJavaScript}
                  onChange={(e) => setIsJavaScript(e.target.checked)}
                >
                  JavaScript
                </Checkbox>
              </FormControl>
            </VStack>
          </Box>
          <Box width="100%" maxWidth="200px" mt="20px">
            <VStack align="flex-start" spacing={4} width="100%">
              <FormLabel as="legend" textAlign="left" width="100%">
                Buchformat
              </FormLabel>
              <FormControl
                display="flex"
                justifyContent="flex-start"
                width="100%"
              >
                <RadioGroup
                  aria-label="Radio options"
                  name="book-format"
                  value={selectedBookFormat}
                  onChange={(value) => setSelectedBookFormat(value)}
                >
                  <Stack spacing="8px" direction="column" align="flex-start">
                    <Radio value="DRUCKAUSGABE">Druckausgabe</Radio>
                    <Radio value="KINDLE">Kindle</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </VStack>
          </Box>

          <Box display="flex" alignItems="center" mb={4}>
            <Icon as={InfoIcon} w={4} h={4} mr={2} />
            <Text fontSize="sm" mt="16px">
              Hinweis: Keine Eingabe liefert alle Bücher
            </Text>
          </Box>
          <Box display="flex" mb={8}>
            <Button
              bg="black"
              color="white"
              leftIcon={<SearchIcon />}
              onClick={handleSearch}
              mr={4}
            >
              Suche
            </Button>
            <Button bg="black" color="white" onClick={handleReset}>
              Zurücksetzen
            </Button>
          </Box>
        </Box>
      </Box>
      {searchError ? (
        <Text style={{ display: "flex", alignItems: "center" }}>
          <WarningIcon style={{ marginRight: "5px" }} />
          Keine Bücher gefunden.
        </Text>
      ) : showTable ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
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
                  <td>{row.titel.titel}</td>
                  <td>{row.rating}</td>
                  <td>{row.art}</td>
                  <td>{row.schlagwoerter}</td>
                  <td>
                    <IconButton
                      aria-label="search"
                      color="primary"
                      onClick={() => {
                        const params = { row: { id: row.id } };
                        navigateToDetails(params);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                    {cToken && writeAccess && (
                      <IconButton
                        aria-label="bookedit"
                        color="primary"
                        onClick={() => {
                          const params = { row: { id: row.id } };
                          navigateToBookEdit(params);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {cToken && writeAccess && (
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDeleteRow(row.id, cToken);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
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

BookSearchForm.propTypes = {
  searchIsbn: PropTypes.string.isRequired,
  setSearchIsbn: PropTypes.func.isRequired,
  searchTitel: PropTypes.string.isRequired,
  setSearchTitel: PropTypes.func.isRequired,
  selectedRatingOption: PropTypes.string.isRequired,
  setSelectedRatingOption: PropTypes.func.isRequired,
  ratingOptions: PropTypes.array.isRequired,
  isJavaScript: PropTypes.bool.isRequired,
  setIsJavaScript: PropTypes.func.isRequired,
  isTypeScript: PropTypes.bool.isRequired,
  setIsTypeScript: PropTypes.func.isRequired,
  selectedBookFormat: PropTypes.string.isRequired,
  setSelectedBookFormat: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchError: PropTypes.bool.isRequired,
  showTable: PropTypes.bool.isRequired,
  buchDataWithUniqueId: PropTypes.array.isRequired,
  navigateToDetails: PropTypes.func.isRequired,
  navigateToBook: PropTypes.func.isRequired,
  navigateToBookEdit: PropTypes.func.isRequired,
  cToken: PropTypes.string,
  handleDeleteRow: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  writeAccess: PropTypes.bool.isRequired,
};

export default BookSearchForm;
