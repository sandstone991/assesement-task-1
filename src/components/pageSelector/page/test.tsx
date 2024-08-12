import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';
import { Page } from '.';

describe('<Page />', () => {
  test('should render page name', () => {
    const pageName = 'PAGE_TEST';
    render(<Page checked setChecked={() => {}} pageName={pageName} />);
    expect(screen.getAllByText(pageName)[0]).toBeInTheDocument();
  });
  test('should focus checkbox child when focused', async () => {
    const pageName = 'PAGE_TEST';
    render(<Page checked setChecked={() => {}} pageName={pageName} />);
    const page = screen.getByTestId('page');
    await userEvent.click(page);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveFocus();
  });
});
