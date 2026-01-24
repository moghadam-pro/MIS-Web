import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { DataGrid, Column } from '@/app/components/DataGrid';
import { Printer, FileDown, Search, Filter } from 'lucide-react';

interface TrialBalanceRow {
  code: string;
  account: string;
  accountFa: string;
  debit: number;
  credit: number;
  balance: number;
}

export const TrialBalance: React.FC = () => {
  const { language, isRTL } = useApp();
  const [dateFrom, setDateFrom] = useState(language === 'fa' ? '۱۴۰۴/۰۱/۰۱' : '2025-03-21');
  const [dateTo, setDateTo] = useState(language === 'fa' ? '۱۴۰۴/۰۲/۱۳' : '2026-01-21');

  const mockData: TrialBalanceRow[] = [
    { code: '1001', account: 'Cash', accountFa: 'صندوق', debit: 25000000, credit: 10000000, balance: 15000000 },
    { code: '1002', account: 'Bank', accountFa: 'بانک', debit: 250000000, credit: 140000000, balance: 110000000 },
    { code: '1003', account: 'Accounts Receivable', accountFa: 'حساب‌های دریافتنی', debit: 150000000, credit: 65000000, balance: 85000000 },
    { code: '2001', account: 'Accounts Payable', accountFa: 'حساب‌های پرداختنی', debit: 28000000, credit: 90000000, balance: -62000000 },
    { code: '2002', account: 'Short-term Loans', accountFa: 'وام‌های کوتاه‌مدت', debit: 5000000, credit: 40000000, balance: -35000000 },
    { code: '3001', account: 'Capital', accountFa: 'سرمایه', debit: 0, credit: 1000000000, balance: -1000000000 },
    { code: '4001', account: 'Sales Revenue', accountFa: 'درآمد فروش', debit: 15000000, credit: 330000000, balance: -315000000 },
    { code: '5001', account: 'Cost of Goods Sold', accountFa: 'بهای تمام شده', debit: 180000000, credit: 0, balance: 180000000 },
    { code: '6001', account: 'Salaries Expense', accountFa: 'هزینه حقوق', debit: 120000000, credit: 0, balance: 120000000 },
    { code: '6002', account: 'Utilities Expense', accountFa: 'هزینه آب و برق', debit: 8000000, credit: 0, balance: 8000000 },
  ];

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(Math.abs(num));
  };

  const totalDebit = mockData.reduce((sum, row) => sum + row.debit, 0);
  const totalCredit = mockData.reduce((sum, row) => sum + row.credit, 0);

  const columns: Column<TrialBalanceRow>[] = [
    { key: 'code', label: t('label.code', language), width: '120px' },
    { key: 'account', label: t('label.name', language), width: '300px', render: (_, row) => language === 'fa' ? row.accountFa : row.account },
    { key: 'debit', label: t('voucher.debit', language), width: '180px', align: 'right', render: (value) => formatNumber(value) },
    { key: 'credit', label: t('voucher.credit', language), width: '180px', align: 'right', render: (value) => formatNumber(value) },
    {
      key: 'balance',
      label: t('voucher.balance', language),
      width: '180px',
      align: 'right',
      render: (value) => (
        <span className={value > 0 ? 'text-blue-600 dark:text-blue-400' : value < 0 ? 'text-red-600 dark:text-red-400' : ''}>
          {formatNumber(value)}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.trial_balance', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'گزارش تراز آزمایشی حساب‌ها' : 'Trial balance report'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>{language === 'fa' ? 'از تاریخ' : 'From Date'}</Label>
            <Input value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{language === 'fa' ? 'تا تاریخ' : 'To Date'}</Label>
            <Input value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>{language === 'fa' ? 'از حساب' : 'From Account'}</Label>
            <Input placeholder={language === 'fa' ? 'کد حساب' : 'Account code'} />
          </div>
          <div className="space-y-2">
            <Label>{language === 'fa' ? 'تا حساب' : 'To Account'}</Label>
            <Input placeholder={language === 'fa' ? 'کد حساب' : 'Account code'} />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button>
            <Search className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {language === 'fa' ? 'نمایش گزارش' : 'Show Report'}
          </Button>
          <Button variant="outline">
            <Filter className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {language === 'fa' ? 'فیلترهای پیشرفته' : 'Advanced Filters'}
          </Button>
        </div>
      </Card>

      {/* Report Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{t('nav.trial_balance', language)}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileDown className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {language === 'fa' ? 'خروجی اکسل' : 'Export Excel'}
            </Button>
            <Button variant="outline" size="sm">
              <FileDown className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {language === 'fa' ? 'خروجی PDF' : 'Export PDF'}
            </Button>
            <Button variant="outline" size="sm">
              <Printer className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('action.print', language)}
            </Button>
          </div>
        </div>

        <DataGrid columns={columns} data={mockData} keyField="code" />

        {/* Totals */}
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="grid grid-cols-3 gap-4 font-semibold">
            <div></div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{language === 'fa' ? 'جمع بدهکار' : 'Total Debit'}</div>
              <div className="text-lg">{formatNumber(totalDebit)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{language === 'fa' ? 'جمع بستانکار' : 'Total Credit'}</div>
              <div className="text-lg">{formatNumber(totalCredit)}</div>
            </div>
          </div>
          {totalDebit === totalCredit && (
            <div className="text-center mt-2 text-green-600 dark:text-green-400 text-sm">
              ✓ {language === 'fa' ? 'تراز متوازن است' : 'Balance is correct'}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
