import * as api from '../services/api';
import mockCategories from '../1mocks/mockCategories';
import mockItem from '../1mocks/mockItem';

describe('1 - Implemente o módulo de acesso à API do Mercado Livre', () => {
  it('Implemente a função `getCategories`', () => {
    const mockRequest = Promise.resolve({
      json: () => Promise.resolve(mockCategories),
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockRequest);

    return api.getCategories().then((categories) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.mercadolibre.com/sites/MLB/categories'
      );

      expect(categories).toEqual(mockCategories);
    });
  });

  it('Implementa a função `getProductsFromCategoryAndQuery`', () => {
    const categoryId = 'category1';
    const query = 'my-query';
    const successRequest = {};

    const mockRequest = Promise.resolve({
      json: () => Promise.resolve(successRequest),
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockRequest);

    return api.getProductsFromCategoryAndQuery(categoryId, query).then((products) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(products).toEqual(successRequest);
    });
  });

  it('Implementa a função `getProductsFromItemID`', () => {
    const productId = 'MLB1442042006';

    const mockRequest = Promise.resolve({
      json: () => Promise.resolve(mockItem),
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockRequest);

    return api.getProductById(productId).then((product) => {
      expect(global.fetch).toHaveBeenCalled();
      expect(product).toEqual(mockItem);
   });
  });
});
