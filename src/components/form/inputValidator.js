export function validateISBN(isbn) {
  const isbnRegularExpression = /\d{3}-\d-\d{3}-\d{5}-\d{1}$/u;
  return isbnRegularExpression.test(isbn);
}
export function validateTitel(titel) {
  const titelRegularExpression = /\S+/;
  return titelRegularExpression.test(titel);
}
export function validatePreis(preis) {
  const preisRegularExpression = /^\d+(\.\d{1,2})?$/;
  return preisRegularExpression.test(preis);
}
export function validateRabatt(rabatt) {
  const rabattRegularExpression = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/;
  return rabattRegularExpression.test(rabatt);
}
export function validateDatum(datum) {
  const datumRegularExpression =
    /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return datumRegularExpression.test(datum);
}
export function validateHomepage(homepage) {
  const homepageRegularExpression =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.(com|de|net)$/;
  return homepageRegularExpression.test(homepage);
}
