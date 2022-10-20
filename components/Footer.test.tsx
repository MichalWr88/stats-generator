import { screen, render } from '@testing-library/react';
import Footer from './Footer';
import * as pJson from '../package.json';
describe('Footer tests', () => {
  it('should render app version', () => {
    render(<Footer />);
    const version = screen.getByTestId('version');

    expect(version.textContent).toBe(`v${pJson.version}`);
  });
  it('should render vercel icon', () => {
    render(<Footer />);
    const img = screen.queryByTestId('img');
    expect(img).toBeInTheDocument();
  });
});

export {};
