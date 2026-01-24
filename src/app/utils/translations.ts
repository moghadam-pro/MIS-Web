type Language = 'fa' | 'en';

export const translations: Record<string, Record<Language, string>> = {
  // Product Name
  'product.name': {
    fa: 'سیستم یکپارچه مالی اوراش',
    en: 'Orash Integrated Financial System',
  },
  
  // Navigation
  'nav.dashboard': { fa: 'داشبورد', en: 'Dashboard' },
  'nav.basics': { fa: 'مبانی و تعاریف', en: 'Basics & Definitions' },
  'nav.accounting': { fa: 'حسابداری', en: 'Accounting' },
  'nav.inventory': { fa: 'انبار', en: 'Inventory' },
  'nav.purchase_sales': { fa: 'خرید و فروش', en: 'Purchase & Sales' },
  'nav.reports': { fa: 'گزارشات', en: 'Reports' },
  'nav.system': { fa: 'سیستم و تنظیمات', en: 'System & Settings' },
  
  // Basics Menu
  'nav.persons': { fa: 'اشخاص', en: 'Persons' },
  'nav.products': { fa: 'کالا و خدمات', en: 'Products & Services' },
  'nav.accounts': { fa: 'سرفصل‌های حساب', en: 'Chart of Accounts' },
  'nav.warehouses': { fa: 'انبارها', en: 'Warehouses' },
  'nav.currencies': { fa: 'ارزها', en: 'Currencies' },
  'nav.taxes': { fa: 'مالیات و ارزش افزوده', en: 'Taxes & VAT' },
  
  // Accounting Menu
  'nav.vouchers': { fa: 'اسناد حسابداری', en: 'Accounting Vouchers' },
  'nav.companies': { fa: 'شرکت‌ها', en: 'Companies' },
  'nav.fiscal_years': { fa: 'سال‌های مالی', en: 'Fiscal Years' },
  
  // Reports Menu
  'nav.general_ledger': { fa: 'دفتر کل', en: 'General Ledger' },
  'nav.subsidiary_ledger': { fa: 'دفتر معین', en: 'Subsidiary Ledger' },
  'nav.detailed_ledger': { fa: 'دفتر تفصیلی', en: 'Detailed Ledger' },
  'nav.trial_balance': { fa: 'تراز آزمایشی', en: 'Trial Balance' },
  'nav.profit_loss': { fa: 'صورت سود و زیان', en: 'Profit & Loss' },
  'nav.balance_sheet': { fa: 'ترازنامه', en: 'Balance Sheet' },
  
  // Purchase & Sales
  'nav.purchase_invoices': { fa: 'فاکتورهای خرید', en: 'Purchase Invoices' },
  'nav.sales_invoices': { fa: 'فاکتورهای فروش', en: 'Sales Invoices' },
  
  // System
  'nav.users': { fa: 'کاربران', en: 'Users' },
  'nav.roles': { fa: 'نقش‌ها', en: 'Roles' },
  'nav.permissions': { fa: 'دسترسی‌ها', en: 'Permissions' },
  
  // Common Actions
  'action.new': { fa: 'جدید', en: 'New' },
  'action.edit': { fa: 'ویرایش', en: 'Edit' },
  'action.delete': { fa: 'حذف', en: 'Delete' },
  'action.save': { fa: 'ذخیره', en: 'Save' },
  'action.cancel': { fa: 'انصراف', en: 'Cancel' },
  'action.search': { fa: 'جستجو', en: 'Search' },
  'action.filter': { fa: 'فیلتر', en: 'Filter' },
  'action.export': { fa: 'خروجی', en: 'Export' },
  'action.print': { fa: 'چاپ', en: 'Print' },
  'action.view': { fa: 'مشاهده', en: 'View' },
  'action.copy': { fa: 'کپی', en: 'Copy' },
  'action.refresh': { fa: 'بروزرسانی', en: 'Refresh' },
  
  // Status
  'status.draft': { fa: 'پیش‌نویس', en: 'Draft' },
  'status.temporary': { fa: 'موقت', en: 'Temporary' },
  'status.final': { fa: 'نهایی', en: 'Final' },
  'status.open': { fa: 'باز', en: 'Open' },
  'status.closed': { fa: 'بسته', en: 'Closed' },
  'status.closing': { fa: 'در حال بستن', en: 'Closing' },
  'status.active': { fa: 'فعال', en: 'Active' },
  'status.inactive': { fa: 'غیرفعال', en: 'Inactive' },
  
  // Form Labels
  'label.code': { fa: 'کد', en: 'Code' },
  'label.name': { fa: 'نام', en: 'Name' },
  'label.title': { fa: 'عنوان', en: 'Title' },
  'label.description': { fa: 'شرح', en: 'Description' },
  'label.date': { fa: 'تاریخ', en: 'Date' },
  'label.amount': { fa: 'مبلغ', en: 'Amount' },
  'label.status': { fa: 'وضعیت', en: 'Status' },
  'label.type': { fa: 'نوع', en: 'Type' },
  'label.phone': { fa: 'تلفن', en: 'Phone' },
  'label.email': { fa: 'ایمیل', en: 'Email' },
  'label.address': { fa: 'آدرس', en: 'Address' },
  'label.company': { fa: 'شرکت', en: 'Company' },
  'label.fiscal_year': { fa: 'سال مالی', en: 'Fiscal Year' },
  
  // Voucher
  'voucher.number': { fa: 'شماره سند', en: 'Voucher Number' },
  'voucher.date': { fa: 'تاریخ سند', en: 'Voucher Date' },
  'voucher.description': { fa: 'شرح سند', en: 'Description' },
  'voucher.debit': { fa: 'بدهکار', en: 'Debit' },
  'voucher.credit': { fa: 'بستانکار', en: 'Credit' },
  'voucher.balance': { fa: 'مانده', en: 'Balance' },
  'voucher.account': { fa: 'حساب', en: 'Account' },
  'voucher.row': { fa: 'ردیف', en: 'Row' },
  'voucher.cost_center': { fa: 'مرکز هزینه', en: 'Cost Center' },
  'voucher.project': { fa: 'پروژه', en: 'Project' },
  'voucher.person': { fa: 'شخص', en: 'Person' },
  
  // Dashboard Widgets
  'widget.cash_bank': { fa: 'خلاصه نقد و بانک', en: 'Cash & Bank Summary' },
  'widget.payables_receivables': { fa: 'بدهکاران و بستانکاران', en: 'Payables & Receivables' },
  'widget.recent_vouchers': { fa: 'آخرین اسناد حسابداری', en: 'Recent Vouchers' },
  'widget.recent_invoices': { fa: 'آخرین فاکتورها', en: 'Recent Invoices' },
  'widget.inventory_alerts': { fa: 'هشدار موجودی انبار', en: 'Inventory Alerts' },
  'widget.fiscal_status': { fa: 'وضعیت سال مالی', en: 'Fiscal Year Status' },
  
  // Login
  'login.title': { fa: 'ورود به سیستم', en: 'Login' },
  'login.username': { fa: 'نام کاربری', en: 'Username' },
  'login.password': { fa: 'رمز عبور', en: 'Password' },
  'login.submit': { fa: 'ورود', en: 'Login' },
  
  // Selection
  'select.company': { fa: 'انتخاب شرکت', en: 'Select Company' },
  'select.role': { fa: 'انتخاب نقش', en: 'Select Role' },
  'select.fiscal_year': { fa: 'انتخاب سال مالی', en: 'Select Fiscal Year' },
  'select.continue': { fa: 'ادامه', en: 'Continue' },
  
  // Misc
  'currency': { fa: 'ریال', en: 'IRR' },
  'logout': { fa: 'خروج', en: 'Logout' },
  'settings': { fa: 'تنظیمات', en: 'Settings' },
  'help': { fa: 'راهنما', en: 'Help' },
  'profile': { fa: 'پروفایل', en: 'Profile' },
  'calculator': { fa: 'ماشین حساب', en: 'Calculator' },
  'calendar': { fa: 'تقویم', en: 'Calendar' },
  'reminders': { fa: 'یادآورها', en: 'Reminders' },
  'theme.light': { fa: 'روشن', en: 'Light' },
  'theme.dark': { fa: 'تیره', en: 'Dark' },
};

export const t = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || key;
};
