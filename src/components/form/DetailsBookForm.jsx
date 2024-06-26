import PropTypes from "prop-types";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Text,
  Stack,
  Heading,
  Card,
  CardBody,
  CardHeader,
  StackDivider,
} from "@chakra-ui/react";
import { formatDate } from "./utils/DateUtils.js";
import { formatPrice } from "./utils/PriceUtils.js";
import { formatRabatt } from "./utils/RabattUtils.js";

const DetailsBookForm = ({
  buchTitel,
  buchUntertitel,
  buchPreis,
  buchArt,
  buchDatum,
  buchHomepage,
  buchLieferbar,
  buchRabatt,
  buchRating,
  buchSchlagwoerter,
  searchError,
}) => {
  const showBookDetails =
    !searchError &&
    (buchTitel ||
      buchUntertitel ||
      buchPreis ||
      buchArt ||
      buchDatum ||
      buchHomepage ||
      buchLieferbar !== undefined ||
      buchRabatt !== undefined ||
      buchRating !== undefined ||
      (buchSchlagwoerter && buchSchlagwoerter.length > 0));

  return (
    <Box
      width="100%"
      height="100vh"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      pt="20px"
    >
      {showBookDetails ? (
        <>
          <Box
            width="100%"
            maxWidth="600px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="24px"
          >
            <Text
              width="100%"
              color="black"
              fontSize="40px"
              fontFamily="Inter"
              fontWeight="600"
              lineHeight="44px"
              wordWrap="break-word"
              textAlign="center"
            >
              {buchTitel ? buchTitel : "Titel nicht verfügbar"}
            </Text>
            <Text
              width="100%"
              color="#828282"
              fontSize="24px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="36px"
              wordWrap="break-word"
              textAlign="center"
            >
              -{buchUntertitel}-
            </Text>
            <Text
              width="100%"
              color="black"
              fontSize="24px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="36px"
              wordWrap="break-word"
              textAlign="center"
            >
              {buchPreis ? formatPrice(buchPreis) : "Preis nicht verfügbar"}
            </Text>
          </Box>
          <Box
            width="100%"
            maxWidth="600px"
            mt="40px"
            p="4"
            boxShadow="md"
            borderRadius="md"
          >
            <Card>
              <CardHeader>
                <Heading size="md">Zusätzliche Details</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <DetailBox
                    heading="Art"
                    content={buchArt ? buchArt : "Art nicht verfügbar"}
                  />
                  <DetailBox
                    heading="Datum"
                    content={
                      buchDatum
                        ? formatDate(buchDatum)
                        : "Datum nicht verfügbar"
                    }
                  />
                  <DetailBox
                    heading="Homepage"
                    content={
                      buchHomepage ? (
                        <a href={buchHomepage}>{buchHomepage}</a>
                      ) : (
                        "Homepage nicht verfügbar"
                      )
                    }
                  />
                  <DetailBox
                    heading="Lieferbar"
                    content={
                      buchLieferbar !== undefined
                        ? buchLieferbar
                          ? "Ja"
                          : "Nein"
                        : "Lieferbarkeitsstatus nicht verfügbar"
                    }
                  />
                  <DetailBox
                    heading="Rabatt"
                    content={
                      buchRabatt !== undefined
                        ? formatRabatt(buchRabatt)
                        : "Rabatt nicht verfügbar"
                    }
                  />
                  <DetailBox
                    heading="Rating"
                    content={
                      buchRating !== undefined
                        ? buchRating
                        : "Rating nicht verfügbar"
                    }
                  />
                  <DetailBox
                    heading="Schlagwörter"
                    content={
                      buchSchlagwoerter
                        ? buchSchlagwoerter.join(", ")
                        : "Schlagwörter nicht verfügbar"
                    }
                  />
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Buch nicht gefunden!</AlertTitle>
          <AlertDescription>Keine gültige ID</AlertDescription>
        </Alert>
      )}
    </Box>
  );
};

const DetailBox = ({ heading, content }) => (
  <Box>
    <Heading size="xs" textTransform="uppercase">
      {heading}
    </Heading>
    <Text pt="2" fontSize="sm">
      {content}
    </Text>
  </Box>
);

DetailBox.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

DetailsBookForm.propTypes = {
  buchTitel: PropTypes.string,
  buchUntertitel: PropTypes.string,
  buchPreis: PropTypes.string,
  buchArt: PropTypes.string,
  buchDatum: PropTypes.string,
  buchHomepage: PropTypes.string,
  buchLieferbar: PropTypes.bool,
  buchRabatt: PropTypes.number,
  buchRating: PropTypes.number,
  buchSchlagwoerter: PropTypes.arrayOf(PropTypes.string),
  searchError: PropTypes.bool,
};

export default DetailsBookForm;
