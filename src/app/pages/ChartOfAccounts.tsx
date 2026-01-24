import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card } from '@/app/components/ui/card';
import { StatusBadge } from '@/app/components/StatusBadge';
import { ChevronRight, ChevronDown, Plus, Search } from 'lucide-react';

interface Account {
  code: string;
  name: string;
  nameFa: string;
  level: number;
  balance: number;
  status: 'active' | 'inactive';
  children?: Account[];
}

export const ChartOfAccounts: React.FC = () => {
  const { language, isRTL } = useApp();
  const [expandedCodes, setExpandedCodes] = useState<string[]>(['1', '2', '3']);
  const [searchTerm, setSearchTerm] = useState('');

  const mockAccounts: Account[] = [
    {
      code: '1',
      name: 'Assets',
      nameFa: 'دارایی‌ها',
      level: 1,
      balance: 0,
      status: 'active',
      children: [
        {
          code: '10',
          name: 'Current Assets',
          nameFa: 'دارایی‌های جاری',
          level: 2,
          balance: 0,
          status: 'active',
          children: [
            { code: '1001', name: 'Cash', nameFa: 'صندوق', level: 3, balance: 15000000, status: 'active' },
            { code: '1002', name: 'Bank', nameFa: 'بانک', level: 3, balance: 110000000, status: 'active' },
            { code: '1003', name: 'Accounts Receivable', nameFa: 'حساب‌های دریافتنی', level: 3, balance: 85000000, status: 'active' },
          ],
        },
        {
          code: '11',
          name: 'Fixed Assets',
          nameFa: 'دارایی‌های ثابت',
          level: 2,
          balance: 0,
          status: 'active',
          children: [
            { code: '1101', name: 'Land', nameFa: 'زمین', level: 3, balance: 500000000, status: 'active' },
            { code: '1102', name: 'Building', nameFa: 'ساختمان', level: 3, balance: 800000000, status: 'active' },
            { code: '1103', name: 'Machinery', nameFa: 'ماشین‌آلات', level: 3, balance: 250000000, status: 'active' },
          ],
        },
      ],
    },
    {
      code: '2',
      name: 'Liabilities',
      nameFa: 'بدهی‌ها',
      level: 1,
      balance: 0,
      status: 'active',
      children: [
        {
          code: '20',
          name: 'Current Liabilities',
          nameFa: 'بدهی‌های جاری',
          level: 2,
          balance: 0,
          status: 'active',
          children: [
            { code: '2001', name: 'Accounts Payable', nameFa: 'حساب‌های پرداختنی', level: 3, balance: 62000000, status: 'active' },
            { code: '2002', name: 'Short-term Loans', nameFa: 'وام‌های کوتاه‌مدت', level: 3, balance: 35000000, status: 'active' },
          ],
        },
      ],
    },
    {
      code: '3',
      name: 'Equity',
      nameFa: 'حقوق صاحبان سهام',
      level: 1,
      balance: 0,
      status: 'active',
      children: [
        { code: '3001', name: 'Capital', nameFa: 'سرمایه', level: 2, balance: 1000000000, status: 'active' },
        { code: '3002', name: 'Retained Earnings', nameFa: 'سود انباشته', level: 2, balance: 651000000, status: 'active' },
      ],
    },
  ];

  const toggleExpand = (code: string) => {
    setExpandedCodes(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(num);
  };

  const renderAccount = (account: Account) => {
    const isExpanded = expandedCodes.includes(account.code);
    const hasChildren = account.children && account.children.length > 0;
    const indent = (account.level - 1) * 24;

    return (
      <div key={account.code}>
        <div
          className="flex items-center gap-2 p-3 hover:bg-muted/50 border-b cursor-pointer"
          style={{ paddingInlineStart: `${indent + 12}px` }}
          onClick={() => hasChildren && toggleExpand(account.code)}
        >
          <div className="w-6 flex-shrink-0">
            {hasChildren && (
              isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            )}
          </div>
          <div className="font-mono text-sm w-24 flex-shrink-0">{account.code}</div>
          <div className="flex-1 font-medium">{language === 'fa' ? account.nameFa : account.name}</div>
          {account.balance > 0 && (
            <div className="text-right w-40 flex-shrink-0">{formatNumber(account.balance)}</div>
          )}
          <div className="w-24 flex-shrink-0">
            <StatusBadge status={account.status} label={t(`status.${account.status}`, language)} />
          </div>
        </div>
        {hasChildren && isExpanded && account.children!.map(child => renderAccount(child))}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.accounts', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'ساختار سرفصل‌های حسابداری' : 'Chart of accounts structure'}
          </p>
        </div>
        <Button>
          <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {language === 'fa' ? 'حساب جدید' : 'New Account'}
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            type="text"
            placeholder={t('action.search', language)}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>
        <Button variant="outline">{language === 'fa' ? 'گسترش همه' : 'Expand All'}</Button>
        <Button variant="outline">{t('action.export', language)}</Button>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-[var(--grid-header-bg)] p-3 border-b flex items-center gap-2">
          <div className="w-6"></div>
          <div className="font-semibold text-sm w-24">{t('label.code', language)}</div>
          <div className="font-semibold text-sm flex-1">{t('label.title', language)}</div>
          <div className="font-semibold text-sm w-40 text-right">{language === 'fa' ? 'مانده' : 'Balance'}</div>
          <div className="font-semibold text-sm w-24">{t('label.status', language)}</div>
        </div>
        <div>
          {mockAccounts.map(account => renderAccount(account))}
        </div>
      </Card>
    </div>
  );
};
