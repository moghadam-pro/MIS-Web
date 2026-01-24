# سیستم یکپارچه مالی اوراش | Orash Integrated Financial System

A comprehensive, modern web-based Financial & Accounting System designed to replace traditional Windows desktop accounting software.

## Features

### 🌐 Multi-Language Support
- **Default Language**: Persian (Farsi) with full RTL support
- **Secondary Language**: English with LTR layout
- Seamless language switching via top bar
- All UI elements, labels, and content are fully translatable

### 🎨 Dual Theme System
- **Light Theme**: Professional, eye-friendly design for long working hours
- **Dark Theme**: High-contrast dark mode for reduced eye strain
- Toggle between themes via the header

### 🏢 Multi-Company & Multi-Fiscal Year
- Manage multiple companies from a single interface
- Support for multiple fiscal years per company
- Easy switching between companies and fiscal years
- Role-based access control per company

### 📊 Core Modules

#### 1. Basics & Definitions (مبانی و تعاریف)
- **Persons (اشخاص)**: Manage customers, suppliers, employees
- **Products & Services (کالا و خدمات)**: Product catalog with pricing and inventory
- **Chart of Accounts (سرفصل‌های حساب)**: Multi-level account hierarchy with tree view
- **Warehouses (انبارها)**: Warehouse management
- **Currencies (ارزها)**: Multi-currency support
- **Taxes & VAT (مالیات و ارزش افزوده)**: Tax configuration

#### 2. Accounting (حسابداری)
- **Vouchers (اسناد حسابداری)**: Spreadsheet-like grid for journal entries
  - Keyboard-first data entry (Tab, Enter, Arrow keys)
  - Auto-balance validation
  - Multiple status levels: Draft, Temporary, Final
  - Debit/Credit columns with automatic totaling
- **Companies & Fiscal Years**: Company and fiscal year management

#### 3. Inventory (انبار)
- Stock management
- Automatic voucher generation from inventory transactions

#### 4. Purchase & Sales (خرید و فروش)
- Purchase invoices
- Sales invoices
- Automatic accounting integration

#### 5. Reports (گزارشات)
- **Trial Balance (تراز آزمایشی)**: Full balance report with filters
- General Ledger (دفتر کل)
- Subsidiary Ledger (دفتر معین)
- Profit & Loss (صورت سود و زیان)
- Balance Sheet (ترازنامه)
- Export to Excel, PDF, and Print

#### 6. System & Settings (سیستم و تنظیمات)
- **Users (کاربران)**: User management
- **Roles (نقش‌ها)**: Role-based permissions
- Fine-grained access control

### 🎯 Dashboard
Customizable dashboard with:
- Cash & Bank summary
- Payables & Receivables tracking
- Recent vouchers
- Recent invoices
- Inventory alerts
- Fiscal year status
- Interactive charts (monthly sales, purchases, cash flow)

### ⌨️ Keyboard-First Design
- Full keyboard navigation in data grids
- Shortcut hints on buttons (Ctrl+N, Ctrl+S, etc.)
- Tab, Enter, and Arrow key support for fast data entry
- Spreadsheet-like experience

### 🎨 Design System
- **Font**: Vazirmatn (Google Fonts) for both Persian and English
- **Color System**: Professional financial theme with CSS variables
- **Components**: Reusable UI components built with Radix UI and Tailwind CSS
- **Responsive**: Desktop-first with laptop and tablet support

### 🔐 Authentication & Access Control
- Login screen
- Company/Role/Fiscal Year selection
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

## Language & Direction
The system intelligently handles:
- RTL layout for Persian (sidebar on right)
- LTR layout for English (sidebar on left)
- Number formatting per locale
- Date formatting (Persian calendar for FA, Gregorian for EN)
- Currency display (ریال for Persian, IRR for English)

## Quick Start
1. Default view opens in Persian
2. Use FA/EN switcher in top bar to change language
3. Use sun/moon icon to toggle theme
4. Navigate through sidebar or use quick actions on dashboard

## Keyboard Shortcuts
- **Ctrl + N**: New item (context-aware)
- **Ctrl + S**: Save
- **Ctrl + F**: Search
- **Tab**: Navigate between fields
- **Enter**: Next row in grids
- **Arrow Keys**: Navigate cells in grids

## Status Badges
- **Draft (پیش‌نویس)**: Gray
- **Temporary (موقت)**: Blue
- **Final (نهایی)**: Green
- **Open (باز)**: Emerald
- **Closing (در حال بستن)**: Yellow
- **Closed (بسته)**: Red

## Professional Features
- Multi-level Chart of Accounts
- Balanced voucher validation
- Cost center and project tracking
- Person-level detail accounts
- Automatic totaling and validation
- Export capabilities (Excel, PDF, Print)
- Advanced filtering and search

---

**© 2026 Orash. All rights reserved. | © ۱۴۰۴ اوراش. تمامی حقوق محفوظ است.**
