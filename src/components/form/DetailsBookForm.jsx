import { Text, Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const DetailsBookForm = ({
  buchTitel,
  buchUntertitel,
  buchPreis,
  //buchWarenkorb,
  buchZusätzlicheInformationen,
}) => {
    //TODO Formatierung hier nicht ideal
    const formatierterPreis = `$${parseFloat(buchPreis).toFixed(2)}`;
    
    return (
        <Box
          width="100%"
          height="100%"
          pt="236px"
          pb="1143px"
          pl="80px"
          pr="845px"
          bg="white"
          display="inline-flex"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            alignSelf="stretch"
            display="inline-flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            gap="24px"
          >
            <Text
              alignSelf="stretch"
              color="black"
              fontSize="40px"
              fontFamily="Inter"
              fontWeight="600"
              lineHeight="44px"
              wordWrap="break-word"
            >
              {buchTitel}
            </Text>
            <Text
              alignSelf="stretch"
              color="#828282"
              fontSize="24px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="36px"
              wordWrap="break-word"
            >
              {buchUntertitel || "Beschreibung (falls vorhanden)"}
            </Text>
            <Text
              alignSelf="stretch"
              color="black"
              fontSize="24px"
              fontFamily="Inter"
              fontWeight="400"
              lineHeight="36px"
              wordWrap="break-word"
            >
              {formatierterPreis}
            </Text>
            <Button
              alignSelf="stretch"
              pl="24px"
              pr="24px"
              pt="14px"
              pb="14px"
              bg="black"
              color="white"
              boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)"
              borderRadius="8px"
              justifyContent="center"
              alignItems="center"
              gap="8px"
            >
              Zum Warenkorb hinzufügen
            </Button>
            <Text
              alignSelf="stretch"
              color="#828282"
              fontSize="16px"
              fontFamily="Inter"
              fontWeight="500"
              lineHeight="24px"
              wordWrap="break-word"
            >
              {buchZusätzlicheInformationen || "Text box for additional details or fine print"}
            </Text>
          </Box>
        </Box>
  );
};

DetailsBookForm.propTypes = {
  buchTitel: PropTypes.string.isRequired,
  buchUntertitel: PropTypes.string,
  buchPreis: PropTypes.string,
  //buchWarenkorb: PropTypes.string,
  buchZusätzlicheInformationen: PropTypes.string,
  //searchError: PropTypes.bool.isRequired,
};

export default DetailsBookForm;
