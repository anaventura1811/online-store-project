export async function getCategories() {
  try {
    const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const data = await request.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw Error();
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return new Promise((resolve) => {
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)
      .then((result) => result.json()
        .then((data) => resolve(data)));
  });
}

export async function getProductById(id) {
  try {
    const request = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await request.json();
    return data;
  } catch (error) {
    throw Error();
  }
}
