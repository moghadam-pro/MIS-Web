import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Plus, Save, Printer, X, Copy, Check } from 'lucide-react';

interface VoucherLine {
  id: string;
  account: string;
  description: string;
  debit: string;
  credit: string;
  costCenter: string;
  project: string;
  person: string;
}

export const Vouchers: React.FC = () => {
  const { language, isRTL } = useApp();
  const [voucherNumber, setVoucherNumber] = useState('1005');
  const [voucherDate, setVoucherDate] = useState(language === 'fa' ? '۱۴۰۴/۰۲/۱۳' : '2026-01-21');
  const [voucherDescription, setVoucherDescription] = useState('');
  const [voucherStatus, setVoucherStatus] = useState<'draft' | 'temporary' | 'final'>('draft');
  
  const [lines, setLines] = useState<VoucherLine[]>([
    { id: '1', account: '', description: '', debit: '', credit: '', costCenter: '', project: '', person: '' },
    { id: '2', account: '', description: '', debit: '', credit: '', costCenter: '', project: '', person: '' },
  ]);

  const addLine = () => {
    setLines([...lines, {
      id: Date.now().toString(),
      account: '',
      description: '',
      debit: '',
      credit: '',
      costCenter: '',
      project: '',
      person: '',
    }]);
  };

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter(line => line.id !== id));
    }
  };

  const updateLine = (id: string, field: keyof VoucherLine, value: string) => {
    setLines(lines.map(line => line.id === id ? { ...line, [field]: value } : line));
  };

  const calculateTotal = (type: 'debit' | 'credit') => {
    return lines.reduce((sum, line) => {
      const value = parseFloat(line[type]) || 0;
      return sum + value;
    }, 0);
  };

  const totalDebit = calculateTotal('debit');
  const totalCredit = calculateTotal('credit');
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === 'fa' ? 'fa-IR' : 'en-US').format(num);
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="new" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="list">{language === 'fa' ? 'لیست اسناد' : 'Vouchers List'}</TabsTrigger>
            <TabsTrigger value="new">{language === 'fa' ? 'سند جدید' : 'New Voucher'}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{t('nav.vouchers', language)}</h2>
            <Button onClick={() => {}}>
              <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {language === 'fa' ? 'سند جدید' : 'New Voucher'}
            </Button>
          </div>
          
          <Card className="p-4">
            <p className="text-center text-muted-foreground py-8">
              {language === 'fa' ? 'لیست اسناد حسابداری در اینجا نمایش داده می‌شود' : 'Vouchers list will be displayed here'}
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-6">
          {/* Voucher Header */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>{t('voucher.number', language)}</Label>
                <Input value={voucherNumber} onChange={(e) => setVoucherNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t('voucher.date', language)}</Label>
                <Input value={voucherDate} onChange={(e) => setVoucherDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{t('label.fiscal_year', language)}</Label>
                <Input value={language === 'fa' ? '۱۴۰۴' : '2025'} disabled />
              </div>
              <div className="space-y-2">
                <Label>{t('label.status', language)}</Label>
                <StatusBadge status={voucherStatus} label={t(`status.${voucherStatus}`, language)} />
              </div>
              <div className="space-y-2 md:col-span-4">
                <Label>{t('voucher.description', language)}</Label>
                <Textarea
                  value={voucherDescription}
                  onChange={(e) => setVoucherDescription(e.target.value)}
                  placeholder={language === 'fa' ? 'شرح کلی سند...' : 'Voucher description...'}
                  rows={2}
                />
              </div>
            </div>
          </Card>

          {/* Voucher Lines Grid */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{language === 'fa' ? 'ردیف‌های سند' : 'Voucher Lines'}</h3>
              <Button variant="outline" size="sm" onClick={addLine}>
                <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {language === 'fa' ? 'افزودن ردیف' : 'Add Line'}
              </Button>
            </div>

            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[var(--grid-header-bg)] border-b border-[var(--grid-border)]">
                    <th className="px-3 py-3 text-sm font-semibold text-center w-16">
                      {t('voucher.row', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ minWidth: '200px' }}>
                      {t('voucher.account', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ minWidth: '250px' }}>
                      {language === 'fa' ? 'شرح ردیف' : 'Description'}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold text-right" style={{ minWidth: '150px' }}>
                      {t('voucher.debit', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold text-right" style={{ minWidth: '150px' }}>
                      {t('voucher.credit', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ minWidth: '150px' }}>
                      {t('voucher.cost_center', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold" style={{ minWidth: '150px' }}>
                      {t('voucher.person', language)}
                    </th>
                    <th className="px-3 py-3 text-sm font-semibold text-center w-20">
                      {language === 'fa' ? 'عملیات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={line.id} className="border-b border-[var(--grid-border)] hover:bg-[var(--grid-hover)]">
                      <td className="px-3 py-2 text-center text-sm text-muted-foreground">
                        {language === 'fa' ? (index + 1).toLocaleString('fa-IR') : index + 1}
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          value={line.account}
                          onChange={(e) => updateLine(line.id, 'account', e.target.value)}
                          placeholder={language === 'fa' ? 'کد یا نام حساب' : 'Account code or name'}
                          className="h-9 border-0 bg-transparent focus:bg-background"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          value={line.description}
                          onChange={(e) => updateLine(line.id, 'description', e.target.value)}
                          placeholder={language === 'fa' ? 'شرح ردیف' : 'Line description'}
                          className="h-9 border-0 bg-transparent focus:bg-background"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="text"
                          value={line.debit}
                          onChange={(e) => updateLine(line.id, 'debit', e.target.value)}
                          placeholder="0"
                          className="h-9 border-0 bg-transparent focus:bg-background text-right"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          type="text"
                          value={line.credit}
                          onChange={(e) => updateLine(line.id, 'credit', e.target.value)}
                          placeholder="0"
                          className="h-9 border-0 bg-transparent focus:bg-background text-right"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          value={line.costCenter}
                          onChange={(e) => updateLine(line.id, 'costCenter', e.target.value)}
                          placeholder={language === 'fa' ? 'مرکز هزینه' : 'Cost center'}
                          className="h-9 border-0 bg-transparent focus:bg-background"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <Input
                          value={line.person}
                          onChange={(e) => updateLine(line.id, 'person', e.target.value)}
                          placeholder={language === 'fa' ? 'شخص' : 'Person'}
                          className="h-9 border-0 bg-transparent focus:bg-background"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeLine(line.id)}
                          disabled={lines.length === 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[var(--grid-header-bg)] border-t-2 border-[var(--grid-border)] font-semibold">
                    <td colSpan={3} className="px-3 py-3 text-right">
                      {language === 'fa' ? 'جمع:' : 'Total:'}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {formatNumber(totalDebit)}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {formatNumber(totalCredit)}
                    </td>
                    <td colSpan={3} className="px-3 py-3">
                      {isBalanced ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Check className="h-4 w-4" />
                          <span className="text-sm">{language === 'fa' ? 'سند متوازن است' : 'Balanced'}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <X className="h-4 w-4" />
                          <span className="text-sm">
                            {language === 'fa' ? 'عدم توازن: ' : 'Imbalance: '}
                            {formatNumber(Math.abs(totalDebit - totalCredit))}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                {language === 'fa'
                  ? '💡 نکته: از کلیدهای Tab، Enter و فلش‌ها برای حرکت سریع بین سلول‌ها استفاده کنید'
                  : '💡 Tip: Use Tab, Enter and arrow keys for quick navigation between cells'}
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline">
                <Copy className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('action.copy', language)}
              </Button>
              <Button variant="outline">
                <Printer className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('action.print', language)}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setVoucherStatus('draft')}>
                {language === 'fa' ? 'ذخیره پیش‌نویس' : 'Save as Draft'}
              </Button>
              <Button variant="outline" onClick={() => setVoucherStatus('temporary')}>
                {language === 'fa' ? 'ذخیره موقت' : 'Save as Temporary'}
              </Button>
              <Button disabled={!isBalanced} onClick={() => setVoucherStatus('final')}>
                <Save className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {language === 'fa' ? 'نهایی کردن' : 'Finalize'}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
