import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { DataGrid, Column } from '@/app/components/DataGrid';
import { StatusBadge } from '@/app/components/StatusBadge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Person {
  id: string;
  code: string;
  name: string;
  type: string;
  nationalId: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
}

export const Persons: React.FC = () => {
  const { language, isRTL } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const mockPersons: Person[] = [
    { id: '1', code: '1001', name: language === 'fa' ? 'شرکت الف' : 'Company A', type: language === 'fa' ? 'مشتری' : 'Customer', nationalId: '1234567890', phone: '021-12345678', email: 'info@companya.com', status: 'active' },
    { id: '2', code: '1002', name: language === 'fa' ? 'شرکت ب' : 'Company B', type: language === 'fa' ? 'تامین‌کننده' : 'Supplier', nationalId: '0987654321', phone: '021-87654321', email: 'info@companyb.com', status: 'active' },
    { id: '3', code: '1003', name: language === 'fa' ? 'احمد محمدی' : 'Ahmad Mohammadi', type: language === 'fa' ? 'کارمند' : 'Employee', nationalId: '1122334455', phone: '0912-3456789', email: 'ahmad@example.com', status: 'active' },
    { id: '4', code: '1004', name: language === 'fa' ? 'شرکت ج' : 'Company C', type: language === 'fa' ? 'مشتری' : 'Customer', nationalId: '5544332211', phone: '021-55443322', email: 'info@companyc.com', status: 'inactive' },
  ];

  const columns: Column<Person>[] = [
    { key: 'code', label: t('label.code', language), width: '100px' },
    { key: 'name', label: t('label.name', language), width: '200px' },
    { key: 'type', label: t('label.type', language), width: '150px' },
    { key: 'nationalId', label: language === 'fa' ? 'کد ملی/شناسه' : 'National ID', width: '150px' },
    { key: 'phone', label: t('label.phone', language), width: '150px' },
    { key: 'email', label: t('label.email', language), width: '200px' },
    {
      key: 'status',
      label: t('label.status', language),
      width: '120px',
      render: (value) => (
        <StatusBadge status={value} label={t(`status.${value}`, language)} />
      ),
    },
    {
      key: 'actions',
      label: language === 'fa' ? 'عملیات' : 'Actions',
      width: '120px',
      align: 'center',
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPerson(row);
              setDialogOpen(true);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filteredPersons = mockPersons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.code.includes(searchTerm) ||
      person.nationalId.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t('nav.persons', language)}</h1>
          <p className="text-muted-foreground mt-1">
            {language === 'fa' ? 'مدیریت اشخاص حقیقی و حقوقی' : 'Manage persons and entities'}
          </p>
        </div>
        <Button onClick={() => { setSelectedPerson(null); setDialogOpen(true); }}>
          <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {language === 'fa' ? 'شخص جدید' : 'New Person'}
        </Button>
      </div>

      {/* Search and Filters */}
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
        <Button variant="outline">
          {language === 'fa' ? 'فیلتر پیشرفته' : 'Advanced Filter'}
        </Button>
        <Button variant="outline">
          {t('action.export', language)}
        </Button>
      </div>

      {/* Data Grid */}
      <DataGrid
        columns={columns}
        data={filteredPersons}
        keyField="id"
        onRowClick={(row) => {
          setSelectedPerson(row);
          setDialogOpen(true);
        }}
      />

      {/* Person Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedPerson
                ? (language === 'fa' ? 'ویرایش شخص' : 'Edit Person')
                : (language === 'fa' ? 'شخص جدید' : 'New Person')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>{t('label.code', language)}</Label>
              <Input defaultValue={selectedPerson?.code} />
            </div>
            <div className="space-y-2">
              <Label>{t('label.type', language)}</Label>
              <Select defaultValue={selectedPerson?.type}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={language === 'fa' ? 'مشتری' : 'Customer'}>
                    {language === 'fa' ? 'مشتری' : 'Customer'}
                  </SelectItem>
                  <SelectItem value={language === 'fa' ? 'تامین‌کننده' : 'Supplier'}>
                    {language === 'fa' ? 'تامین‌کننده' : 'Supplier'}
                  </SelectItem>
                  <SelectItem value={language === 'fa' ? 'کارمند' : 'Employee'}>
                    {language === 'fa' ? 'کارمند' : 'Employee'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>{t('label.name', language)}</Label>
              <Input defaultValue={selectedPerson?.name} />
            </div>
            <div className="space-y-2">
              <Label>{language === 'fa' ? 'کد ملی/شناسه اقتصادی' : 'National ID / Economic Code'}</Label>
              <Input defaultValue={selectedPerson?.nationalId} />
            </div>
            <div className="space-y-2">
              <Label>{t('label.phone', language)}</Label>
              <Input defaultValue={selectedPerson?.phone} />
            </div>
            <div className="space-y-2">
              <Label>{t('label.email', language)}</Label>
              <Input type="email" defaultValue={selectedPerson?.email} />
            </div>
            <div className="space-y-2">
              <Label>{t('label.status', language)}</Label>
              <Select defaultValue={selectedPerson?.status || 'active'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('status.active', language)}</SelectItem>
                  <SelectItem value="inactive">{t('status.inactive', language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>{t('label.address', language)}</Label>
              <Input defaultValue="" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t('action.cancel', language)}
            </Button>
            <Button onClick={() => setDialogOpen(false)}>
              {t('action.save', language)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
