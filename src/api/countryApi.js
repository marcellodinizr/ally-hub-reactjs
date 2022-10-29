export async function countryApi(value) {
  const mapResponseToValuesAndLabels = (country) => ({
    value: country.code,
    label: country.name,
  });

  const country = await fetch(`https://amazon-api.sellead.com/country`)
    .then((response) => response.json())
    .then((response) => response.map(mapResponseToValuesAndLabels))
    .then((final) =>
      final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
    );
  return country;
}
