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
  //cToken,
  handleDeleteRow,
  handleReset,
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
            {/* Hier muss noch geprüft werden ob rating von BuchServer Kommt da theoretisch gemapeed wird */}
            <Select
              placeholder="Wählen Sie ein Rating"
              value={selectedRatingOption}
              onChange={(e) => setSelectedRatingOption(e.target.value)}
            >
              {ratingOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt="35px">
          <VStack align="flex-start" spacing={0}>
            <FormLabel as="legend">JavaScript oder TypeScript</FormLabel>
            <FormControl display="flex" alignItems="center">
              <Checkbox
                id="typescript"
                isChecked={isTypeScript}
                onChange={(e) => setIsTypeScript(e.target.checked)}
              >
                TypeScript
              </Checkbox>
            </FormControl>
            <FormControl display="flex" alignItems="center">
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
        <Box mt="35px">
          <FormControl as="fieldset">
            {" "}
            {/* Hier funktioniert das klicken noch nicht muss man noch fixen */}
            <FormLabel as="legend">Buchformat</FormLabel>
            <RadioGroup
            aria-label="Radio options"
              name="book-format"
              value={selectedBookFormat}
              onChange={(e)=> setSelectedBookFormat(e.target.value)}
            >
              <Stack spacing="24px">
                <Radio value = "DRUCKAUSGABE">Druckausgabe</Radio>
                <Radio value="KINDLE">Kindle</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center" mb={4}>
          <Icon as={InfoIcon} w={4} h={4} mr={2} />
          <Text fontSize="sm" mt="16px">
            Hinweis: Keine Eingabe liefert alle Bücher
          </Text>
        </Box>
        <Box display="flex" mb={8}>
          <Button
            colorScheme="green"
            leftIcon={<SearchIcon />}
            onClick={handleSearch}
            mr={4}
          >
            Suche
          </Button>
          <Button colorScheme="blue" onClick={handleReset}>
            Zurücksetzen
          </Button>
        </Box>
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
  // cToken: PropTypes.string,
  handleDeleteRow: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

export default BookSearchForm;
