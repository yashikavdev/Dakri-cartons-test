// @ts-nocheck
import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import ToolModal from '../Dashboard';
jest.mock('@mui/x-charts/PieChart', () => ({
  PieChart: jest.fn().mockReturnValue(null)
}));

describe('ToolModal', () => {
  const listData = [
    {
      id: '1',
      tool_ref: 'Tool-1',
      teammember: 'John Doe',
      status: 'Completed',
      duration: '2 hours',
    },
    {
      id: '2',
      tool_ref: 'Tool-2',
      teammember: 'Jane Smith',
      status: 'In Progress',
      duration: '3 hours',
    },
  ];

  const dataItems = [
    {
      label: 'Completed',
      value: 10,
      status: 'completed',
    },
    {
      label: 'In Progress',
      value: 5,
      status: 'in progress',
    },
    {
      label: 'Due',
      value: 3,
      status: 'due',
    },
  ];

  test('renders ToolModal component with correct title', () => {
    render(<ToolModal list={listData} data={dataItems} title="Rental Tools" chartTitle="Work Order Status" />);
    const titleElement = screen.getByText('Rental Tools');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders table with correct data', () => {
    render(<ToolModal list={listData} data={dataItems} title="Rental Tools" chartTitle="Work Order Status" />);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(listData.length + 1);
  });

  test('renders details button for each item', () => {
  render(<ToolModal list={listData} data={dataItems} title="Rental Tools" chartTitle="Work Order Status" />);
  const detailsButtons = screen.getAllByRole('button', { name: 'Details' });
  expect(detailsButtons).toHaveLength(listData.length);
});

test('renders table headers', () => {
  render(<ToolModal list={listData} data={dataItems} title="Rental Tools" chartTitle="Work Order Status" />);
  const headers = screen.getAllByRole('columnheader');
  const expectedHeaders = ['Tool Ref.', 'Team Member', 'Status', 'Duration'];
  expectedHeaders.forEach(header => {
    const headerElement = screen.getByText(header);
    expect(headerElement).toBeInTheDocument();
  });
});

test('renders missing items table without status and duration columns', () => {
  render(<ToolModal list={listData} data={dataItems} title="Missing Items" chartTitle="Work Order Status" />);
  const headers = screen.getAllByRole('columnheader');
  const expectedHeaders = ['Tool Ref.', 'Team Member'];
  expectedHeaders.forEach(header => {
    const headerElement = screen.getByText(header);
    expect(headerElement).toBeInTheDocument();
  });
});

});
