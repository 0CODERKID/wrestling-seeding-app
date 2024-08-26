import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WrestlerForm from '@/app/components/WrestlerForm';

const mockOnChange = jest.fn();
const mockData = {
  name: 'John Doe',
  grade: 9,
  seasonRecords: [{ wins: '10', losses: '5' }],
  placements: [],
};

describe('WrestlerForm Component', () => {
  beforeEach(() => {
    render(
      <WrestlerForm
        weightClass="106 lbs"
        data={mockData}
        onChange={mockOnChange}
      />
    );
  });

  it('renders the wrestler form with correct data', () => {
    expect(screen.getByText('106 lbs')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument(); // Changed from getByDisplayValue to getByText
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('calls onChange when input values change', () => {
    const nameInput = screen.getByDisplayValue('John Doe');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(mockOnChange).toHaveBeenCalledWith('106 lbs', 'name', 'Jane Doe');
  });

  it('adds a new placement when "Add Placement" button is clicked', () => {
    const addPlacementButton = screen.getByText('Add Placement');
    fireEvent.click(addPlacementButton);
    expect(mockOnChange).toHaveBeenCalledWith('106 lbs', 'placements', [{ tournament: '', year: '', place: '' }]);
  });
});