import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('2 - Cire uma página de listagem de produtos vazia', () => {
  it('A raíz da aplicação, em `<App />`, renderiza com sucesso', () => {
    render(<App />);

  });

  it('O placeholder contém a mensagem pedida:`Digite algum termo de pesquisa`', () => {
    render(<App />);
    expect(screen.getByTestId('placeholder-initial-message')).toHaveProperty('placeholder');
  })
});