import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Checkbox } from '.';

describe('<Checkbox />', () => {
  test('should render the checkbox', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  test('should render unchecked by default', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
  test('should render checked when checked is true', () => {
    render(<Checkbox checked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  test('should render indeterminate when checked is indeterminate', () => {
    render(<Checkbox checked="indeterminate" />);
    expect(
      screen.getByRole<HTMLInputElement>('checkbox').indeterminate
    ).toBeTruthy();
  });
  test('should render disabled when disabled is true', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
  test("should call onCheck when checkbox is clicked and it's not disabled", () => {
    const onCheck = vi.fn();
    render(<Checkbox onCheck={onCheck} />);
    screen.getByRole('checkbox').click();
    expect(onCheck).toHaveBeenCalledWith(true);
    screen.getByRole('checkbox').click();
    expect(onCheck).toHaveBeenCalledWith(false);
  });
  test("should not be able to change the checked state when it's disabled", () => {
    const onCheck = vi.fn();
    render(<Checkbox disabled onCheck={onCheck} />);
    screen.getByRole('checkbox').click();
    expect(onCheck).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
