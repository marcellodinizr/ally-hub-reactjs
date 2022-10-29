export async function cityApi(value) {
  const mapResponseToValuesAndLabels = (city) => ({
    value: city.id,
    label: city.name,
  });

  const city = await fetch(`https://amazon-api.sellead.com/city`)
    .then((response) => response.json())
    .then((response) => response.map(mapResponseToValuesAndLabels))
    .then((final) =>
      final.filter((i) => i.label.toLowerCase().includes(value.toLowerCase()))
    );
  return city;
}
