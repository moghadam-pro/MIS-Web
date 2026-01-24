# Orash Integrated Financial System

A comprehensive, modern web-based **Financial & Accounting System** designed to replace traditional Windows desktop accounting software.

## Features

### 🌐 Multi-Language Support

- **Default Language**: Persian (Farsi) with full RTL support
- **Secondary Language**: English with LTR layout
- Seamless language switching via top bar
- All UI elements, labels, and content are fully translatable

### 🎨 Dual Theme System

- **Light Theme**: Professional, eye-friendly design for long working hours
- **Dark Theme**: High-contrast dark mode for reduced eye strain
- Theme toggle available in the header

### 🏢 Multi-Company & Multi-Fiscal Year

- Manage multiple companies from a single interface
- Support for unlimited fiscal years per company
- Easy switching between companies and fiscal years
- Role-based access control per company

### 📊 Core Modules

#### 1. Basics & Definitions

- **Persons**: Manage customers, suppliers, and employees
- **Products & Services**: Product and service catalog with pricing and inventory
- **Chart of Accounts**: Multi-level account hierarchy with tree view
- **Warehouses**: Warehouse management
- **Currencies**: Multi-currency support
- **Taxes & VAT**: Tax and VAT configuration

#### 2. Accounting

- **Vouchers**: Spreadsheet-like journal entry grid
  - Keyboard-first data entry (Tab, Enter, Arrow keys)
  - Automatic debit/credit balance validation
  - Voucher statuses: Draft, Temporary, Final
  - Automatic totaling of debit and credit columns

- **Companies & Fiscal Years**: Company and fiscal year management

#### 3. Inventory

- Stock management
- Automatic accounting voucher generation from inventory transactions

#### 4. Purchase & Sales

- Purchase invoices
- Sales invoices
- Automatic accounting integration

#### 5. Reports

- **Trial Balance**: Full balance report with advanced filters
- General Ledger
- Subsidiary Ledger
- Profit & Loss Statement
- Balance Sheet
- Export to Excel, PDF, and Print

#### 6. System & Settings

- **Users**: User management
- **Roles**: Role-based permission system
- Fine-grained access control

### 🎯 Dashboard

Customizable dashboard including:

- Cash and bank summary
- Payables and receivables tracking
- Recent vouchers
- Recent invoices
- Inventory alerts
- Fiscal year status
- Interactive charts (monthly sales, purchases, cash flow)

### ⌨️ Keyboard-First Design

- Full keyboard navigation in data grids
- Shortcut hints on buttons (Ctrl+N, Ctrl+S, etc.)
- Spreadsheet-like data entry experience

### 🎨 Design System

- **Font**: Vazirmatn (Google Fonts) for both Persian and English
- **Color System**: Professional financial color palette using CSS variables
- **Components**: Reusable UI components built with Radix UI and Tailwind CSS
- **Responsive**: Desktop-first design with laptop and tablet support

### 🔐 Authentication & Access Control

- Secure login screen
- Company, role, and fiscal year selection
- Multi-role support per user
- Permission-based UI visibility

## Technical Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Build Tool**: Vite

## Language & Layout Handling

The system intelligently supports:

- RTL layout for Persian (right-aligned sidebar)
- LTR layout for English (left-aligned sidebar)
- Locale-based number formatting
- Date formatting (Persian calendar for FA, Gregorian for EN)
- Currency display (IRR for English)

## Quick Start

1. The system opens in Persian by default
2. Use the FA / EN switcher in the top bar to change language
3. Toggle light/dark mode using the sun/moon icon
4. Navigate via sidebar or dashboard quick actions

## Keyboard Shortcuts

- **Ctrl + N**: Create new item (context-aware)
- **Ctrl + S**: Save
- **Ctrl + F**: Search
- **Tab**: Move between fields
- **Enter**: Move to the next row in grids
- **Arrow Keys**: Navigate grid cells

## Status Badges

- **Draft**: Gray
- **Temporary**: Blue
- **Final**: Green
- **Open**: Emerald
- **Closing**: Yellow
- **Closed**: Red

## Professional Features

- Multi-level chart of accounts
- Balanced voucher validation
- Cost center and project tracking
- Person-level detail accounts
- Automatic totaling and validation
- Advanced filtering and search
- Export to Excel, PDF, and Print

---

**© 2026 Orash. All rights reserved.**
