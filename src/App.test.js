import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Postman app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Postman/i);
  expect(linkElement).toBeInTheDocument();
});
