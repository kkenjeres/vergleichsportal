function createProductSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const BASE_URL = "http://vergleichsportal.vercel.app";

async function fetchAllProducts() {
  const apiURL = `${BASE_URL}/api/sheets/`;
  const response = await fetch(apiURL);
  if (!response.ok) {
    throw new Error("Network response was not OK");
  }
  const products = await response.json();
  return products;
}

export default async function generateSitemaps() {
  const products = await fetchAllProducts();

  const beerProducts = products.filter(product => product.name.toLowerCase().includes("bier"));

  const productUrls = beerProducts.map(product => {
    const productSlug = createProductSlug(product.name);
    return {
      url: `${BASE_URL}/aktionen/bier/${product.id}/${productSlug}/`,
      lastModified: product.updateDate ? new Date(product.updateDate) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    };
  });

  const staticPage = {
    url: `${BASE_URL}/aktionen/bier/`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  };

  return [staticPage, ...productUrls];
}
