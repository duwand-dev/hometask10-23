import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
/**
 * @jest-environment ./App.tsx
 */
test('renders learn react link', () => {
  render(<App />);
});
