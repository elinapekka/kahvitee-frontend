import { render, screen, fireEvent } from '@testing-library/react';
import CoffeeList from './components/CoffeeList';
import TeaList from './components/TeaList';
import AddCoffee from './components/AddCoffee';
import AddTea from './components/AddTea';

test('renders coffeelist', () => {
  const { getByText } = render(<CoffeeList />);
  const title = getByText(/Lempikahvit/i);
  expect(title).toBeInTheDocument();
});
  

test('renders tealist', () => {
  const { getByText } = render(<TeaList />);
  const title = getByText(/Lempiteet/i);
  expect(title).toBeInTheDocument();
});

test('renders add coffee', () => {
  const { getByText } = render(<AddCoffee getAllCoffees={[]} />);
  const title = getByText(/Lisää uusi kahvi/i);
  expect(title).toBeInTheDocument();
});

test('renders add tea', () => {
  const { getByText } = render(<AddTea getAllTeas={[]} />);
  const title = getByText(/Lisää uusi tee/i);
  expect(title).toBeInTheDocument();
});