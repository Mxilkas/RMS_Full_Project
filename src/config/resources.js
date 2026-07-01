import {
  Building2,
  Building,
  UsersRound,
  UserRound,
  KeyRound,
  BadgeDollarSign,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';

function calculatePaymentStatus(total, paid) {
  const totalNumber = Number(total || 0);
  const paidNumber = Number(paid || 0);
  if (paidNumber <= 0) return 'Unpaid';
  if (paidNumber >= totalNumber) return 'Paid';
  return 'Partial';
}

export const resources = {
  properties: {
    title: 'Properties',
    singular: 'Property',
    description: 'Manage every property, price, owner and availability status.',
    endpoint: '/properties',
    idKey: 'propertyID',
    icon: Building2,
    fields: [
      { name: 'propertyName', label: 'Property Name', required: true },
      { name: 'propertyType', label: 'Type', type: 'select', required: true, choices: ['Apartment', 'House', 'Shop', 'Office', 'Villa'] },
      { name: 'location', label: 'Location', required: true },
      { name: 'price', label: 'Price', type: 'number', required: true, format: 'currency' },
      { name: 'status', label: 'Status', type: 'select', required: true, choices: ['Available', 'Rented', 'Sold'], format: 'status' },
      { name: 'ownerID', label: 'Owner', type: 'select', required: true, optionsEndpoint: '/owners', optionValue: 'ownerID', optionLabel: 'fullName', displayKey: 'ownerName' },
      { name: 'description', label: 'Description', type: 'textarea', showInTable: false },
    ],
  },
  apartments: {
    title: 'Apartments',
    singular: 'Apartment',
    description: 'Manage apartment listings available to renters and buyers.',
    endpoint: '/apartments',
    idKey: 'propertyID',
    icon: Building,
    fields: [
      { name: 'propertyName', label: 'Apartment Name', required: true },
      { name: 'location', label: 'Location', required: true },
      { name: 'price', label: 'Monthly Price', type: 'number', required: true, format: 'currency' },
      { name: 'status', label: 'Status', type: 'select', required: true, choices: ['Available', 'Rented', 'Sold'], format: 'status' },
      { name: 'ownerID', label: 'Owner', type: 'select', required: true, optionsEndpoint: '/owners', optionValue: 'ownerID', optionLabel: 'fullName', displayKey: 'ownerName' },
      { name: 'description', label: 'Description', type: 'textarea', showInTable: false },
    ],
    preparePayload(payload) {
      return { ...payload, propertyType: 'Apartment' };
    },
  },
  owners: {
    title: 'Owners',
    singular: 'Owner',
    description: 'Keep verified property-owner contact details in one place.',
    endpoint: '/owners',
    idKey: 'ownerID',
    icon: UsersRound,
    fields: [
      { name: 'fullName', label: 'Full Name', required: true },
      { name: 'phone', label: 'Phone', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Address' },
    ],
  },
  customers: {
    title: 'Customers',
    singular: 'Customer',
    description: 'Manage tenants, buyers and their essential contact information.',
    endpoint: '/customers',
    idKey: 'customerID',
    icon: UserRound,
    fields: [
      { name: 'fullName', label: 'Full Name', required: true },
      { name: 'phone', label: 'Phone', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'address', label: 'Address' },
      { name: 'customerType', label: 'Customer Type', type: 'select', required: true, choices: ['Tenant', 'Buyer', 'Both'] },
    ],
  },
  rentals: {
    title: 'Rentals',
    singular: 'Rental',
    description: 'Create rental agreements and track deposits, dates and payment status.',
    endpoint: '/rentals',
    idKey: 'rentalID',
    icon: KeyRound,
    fields: [
      { name: 'propertyID', label: 'Property', type: 'select', required: true, optionsEndpoint: '/properties', optionValue: 'propertyID', optionLabel: 'propertyName', optionExtra: 'status', displayKey: 'propertyName' },
      { name: 'customerID', label: 'Customer', type: 'select', required: true, optionsEndpoint: '/customers', optionValue: 'customerID', optionLabel: 'fullName', displayKey: 'customerName' },
      { name: 'rentAmount', label: 'Rent Amount', type: 'number', required: true, format: 'currency' },
      { name: 'deposit', label: 'Deposit', type: 'number', required: true, defaultValue: 0, format: 'currency' },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true, format: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date', required: true, format: 'date' },
      { name: 'paymentStatus', label: 'Payment Status', type: 'select', required: true, choices: ['Unpaid', 'Partial', 'Paid'], format: 'status' },
    ],
  },
  sales: {
    title: 'Sales',
    singular: 'Sale',
    description: 'Track sold properties, buyer information, paid amount and balance.',
    endpoint: '/sales',
    idKey: 'saleID',
    icon: BadgeDollarSign,
    fields: [
      { name: 'propertyID', label: 'Property', type: 'select', required: true, optionsEndpoint: '/properties', optionValue: 'propertyID', optionLabel: 'propertyName', optionExtra: 'status', displayKey: 'propertyName' },
      { name: 'buyerID', label: 'Buyer', type: 'select', required: true, optionsEndpoint: '/customers', optionValue: 'customerID', optionLabel: 'fullName', displayKey: 'buyerName' },
      { name: 'salePrice', label: 'Sale Price', type: 'number', required: true, format: 'currency' },
      { name: 'paidAmount', label: 'Paid Amount', type: 'number', required: true, defaultValue: 0, format: 'currency' },
      { name: 'balance', label: 'Balance', type: 'number', formOnly: false, format: 'currency' },
      { name: 'saleDate', label: 'Sale Date', type: 'date', required: true, format: 'date' },
      { name: 'paymentStatus', label: 'Payment Status', formOnly: false, format: 'status' },
    ],
    preparePayload(payload) {
      return {
        ...payload,
        paymentStatus: calculatePaymentStatus(payload.salePrice, payload.paidAmount),
      };
    },
  },
  payments: {
    title: 'Payments',
    singular: 'Payment',
    description: 'Record rental and property-sale payments with outstanding balances.',
    endpoint: '/payments',
    idKey: 'paymentID',
    icon: CreditCard,
    fields: [
      { name: 'customerID', label: 'Customer', type: 'select', required: true, optionsEndpoint: '/customers', optionValue: 'customerID', optionLabel: 'fullName', displayKey: 'customerName' },
      { name: 'propertyID', label: 'Property', type: 'select', required: true, optionsEndpoint: '/properties', optionValue: 'propertyID', optionLabel: 'propertyName', displayKey: 'propertyName' },
      { name: 'paymentType', label: 'Payment Type', type: 'select', required: true, choices: ['Rent', 'Sale'] },
      { name: 'totalAmount', label: 'Total Amount', type: 'number', required: true, format: 'currency' },
      { name: 'paidAmount', label: 'Paid Amount', type: 'number', required: true, format: 'currency' },
      { name: 'remainingBalance', label: 'Remaining Balance', type: 'number', formOnly: false, format: 'currency' },
      { name: 'paymentDate', label: 'Payment Date', type: 'date', required: true, format: 'date' },
      { name: 'note', label: 'Note', type: 'textarea', showInTable: false },
    ],
  },
  users: {
    title: 'System Users',
    singular: 'User',
    description: 'Manage the simple Admin, Manager and User accounts used by the API.',
    endpoint: '/users',
    idKey: 'userID',
    icon: ShieldCheck,
    fields: [
      { name: 'username', label: 'Username', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true, showInTable: false },
      { name: 'role', label: 'Role', type: 'select', required: true, choices: ['Admin', 'Manager', 'User'] },
    ],
  },
};

export function getResource(resourceKey) {
  return resources[resourceKey];
}
