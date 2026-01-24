import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Building2, Calendar, UserCog, ArrowRight } from 'lucide-react';

interface CompanySelectionProps {
  onContinue: () => void;
}

export const CompanySelection: React.FC<CompanySelectionProps> = ({ onContinue }) => {
  const { language, isRTL, setCompany, setFiscalYear } = useApp();
  const [selectedCompany, setSelectedCompany] = useState('1');
  const [selectedFiscalYear, setSelectedFiscalYear] = useState('1');
  const [selectedRole, setSelectedRole] = useState('accountant');

  const companies = [
    { id: '1', name: 'Sample Company', nameFa: 'شرکت نمونه' },
    { id: '2', name: 'Another Company', nameFa: 'شرکت دیگر' },
  ];

  const fiscalYears = [
    { id: '1', year: '2025', yearFa: '۱۴۰۴', startDate: '2025-03-21', endDate: '2026-03-20', status: 'open' as const },
    { id: '2', year: '2024', yearFa: '۱۴۰۳', startDate: '2024-03-20', endDate: '2025-03-20', status: 'closed' as const },
  ];

  const roles = [
    { id: 'admin', name: 'System Admin', nameFa: 'مدیر سیستم' },
    { id: 'financial_manager', name: 'Financial Manager', nameFa: 'مدیر مالی' },
    { id: 'accountant', name: 'Accountant', nameFa: 'حسابدار' },
  ];

  const handleContinue = () => {
    const company = companies.find(c => c.id === selectedCompany);
    const fiscalYear = fiscalYears.find(f => f.id === selectedFiscalYear);
    if (company && fiscalYear) {
      setCompany(company);
      setFiscalYear(fiscalYear);
      onContinue();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-2xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="https://moghadam.pro/lnk/orash_logo.svg" alt="Orash Logo" className="h-16 w-16" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">{t('product.name', language)}</h1>
          <p className="text-muted-foreground">
            {language === 'fa' ? 'لطفاً شرکت، نقش و سال مالی خود را انتخاب کنید' : 'Please select your company, role and fiscal year'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Company Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">{t('select.company', language)}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa' ? 'شرکتی که می‌خواهید با آن کار کنید' : 'Choose the company you want to work with'}
                </p>
              </div>
            </div>
            <RadioGroup value={selectedCompany} onValueChange={setSelectedCompany}>
              {companies.map((company) => (
                <div key={company.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={company.id} id={`company-${company.id}`} />
                  <Label htmlFor={`company-${company.id}`} className="flex-1 cursor-pointer">
                    {language === 'fa' ? company.nameFa : company.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Role Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <UserCog className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">{t('select.role', language)}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa' ? 'نقش کاری خود را مشخص کنید' : 'Select your working role'}
                </p>
              </div>
            </div>
            <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
              {roles.map((role) => (
                <div key={role.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={role.id} id={`role-${role.id}`} />
                  <Label htmlFor={`role-${role.id}`} className="flex-1 cursor-pointer">
                    {language === 'fa' ? role.nameFa : role.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Fiscal Year Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">{t('select.fiscal_year', language)}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === 'fa' ? 'سال مالی مورد نظر را انتخاب کنید' : 'Choose the fiscal year to work with'}
                </p>
              </div>
            </div>
            <RadioGroup value={selectedFiscalYear} onValueChange={setSelectedFiscalYear}>
              {fiscalYears.map((year) => (
                <div key={year.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={year.id} id={`year-${year.id}`} />
                  <Label htmlFor={`year-${year.id}`} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span>{language === 'fa' ? year.yearFa : year.year}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        year.status === 'open'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {t(`status.${year.status}`, language)}
                      </span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          {/* Continue Button */}
          <Button onClick={handleContinue} className="w-full" size="lg">
            {t('select.continue', language)}
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </div>
      </Card>
    </div>
  );
};
