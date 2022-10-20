/* eslint-disable import/namespace */
import { navBarData } from '../data/routing';
import { screen, render } from '@testing-library/react';
import NavBar from './NavBar';

const mockData = navBarData.find((data) => data.id === 7);
if (!mockData) {
  throw Error('not find route by id');
}
jest.mock('next/dist/client/router', () => ({
  __esModule: true,
  useRouter: () => ({
    query: {},
    pathname: mockData.path,
    asPath: mockData.path,
    events: {
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    },
    push: jest.fn(() => Promise.resolve(true)),
    prefetch: jest.fn(() => Promise.resolve(true)),
    replace: jest.fn(() => Promise.resolve(true)),
  }),
}));

describe('Footer tests', () => {
  it('should render all Links', () => {
    render(<NavBar />);
    const navLinks = screen.getAllByTestId('navLink');

    expect(navLinks.length).toBe(navBarData.length);
  });
  it('should render one active style Link', () => {
    render(<NavBar />);
    const navLinks = screen.getAllByTestId('navLink');
    const activeLinks = navLinks.filter((link) => [...link.classList].includes('border-yellow-400'));
    expect(activeLinks.length).toBe(1);
    const activeLink = activeLinks[0];
    expect(activeLink.textContent).toBe(mockData.label);
  });
});

export {};
