import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatCard from '../StatCard';

const defaultProps = {
  imageCount: 42,
  userCount: 7,
  iconLogo: '/brand-logos/openAI.svg',
};

describe('StatCard', () => {
  it('renders user and image counts with labels', () => {
    render(<StatCard {...defaultProps} />);

    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Images')).toBeInTheDocument();
  });

  it('calls onRefresh when the refresh button is clicked', () => {
    const onRefresh = vi.fn();
    render(<StatCard {...defaultProps} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByRole('button', { name: /refresh feed/i }));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('disables the refresh button while refreshing', () => {
    const onRefresh = vi.fn();
    render(<StatCard {...defaultProps} onRefresh={onRefresh} refreshing />);

    expect(screen.getByRole('button', { name: /refresh feed/i })).toBeDisabled();
  });
});
