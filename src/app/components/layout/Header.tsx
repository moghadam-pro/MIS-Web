import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import {
  Search,
  Calculator,
  Calendar,
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Input } from '@/app/components/ui/input';

export const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme, company, fiscalYear, isRTL } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fa' ? 'en' : 'fa');
  };

  const currentDate = language === 'fa' ? '۱۴۰۴/۰۲/۱۳' : 'January 21, 2026';

  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4 sticky top-0 z-50">
      {/* Logo and Product Name */}
      <div className={`flex items-center gap-3 ${isRTL ? 'ml-6' : 'mr-6'}`}>
        <img 
          src="https://moghadam.pro/lnk/orash_logo.svg" 
          alt="Orash Logo" 
          className="h-10 w-10"
        />
        <span className="font-semibold hidden lg:block">
          {t('product.name', language)}
        </span>
      </div>

      {/* Global Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            type="text"
            placeholder={t('action.search', language)}
            className={`w-full ${isRTL ? 'pr-10' : 'pl-10'}`}
            onClick={() => setSearchOpen(true)}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Company Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <span>{language === 'fa' ? company?.nameFa : company?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem>{language === 'fa' ? 'شرکت نمونه' : 'Sample Company'}</DropdownMenuItem>
            <DropdownMenuItem>{language === 'fa' ? 'شرکت دیگر' : 'Other Company'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Fiscal Year Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex gap-2">
              <span>{language === 'fa' ? fiscalYear?.yearFa : fiscalYear?.year}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem>{language === 'fa' ? '۱۴۰۴' : '2025'}</DropdownMenuItem>
            <DropdownMenuItem>{language === 'fa' ? '۱۴۰۳' : '2024'}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Current Date */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md text-sm">
          <Calendar className="h-4 w-4" />
          <span>{currentDate}</span>
        </div>

        {/* Calculator */}
        <Button variant="ghost" size="icon" title={t('calculator', language)}>
          <Calculator className="h-5 w-5" />
        </Button>

        {/* Reminders */}
        <Button variant="ghost" size="icon" title={t('reminders', language)}>
          <Bell className="h-5 w-5" />
        </Button>

        {/* Language Switcher */}
        <Button variant="ghost" size="sm" onClick={toggleLanguage}>
          <span className="font-semibold">{language === 'fa' ? 'FA' : 'EN'}</span>
          <span className="mx-1">|</span>
          <span className="text-muted-foreground">{language === 'fa' ? 'EN' : 'FA'}</span>
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon" title={t('help', language)}>
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" title={t('settings', language)}>
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRTL ? 'start' : 'end'}>
            <DropdownMenuItem>
              <User className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('profile', language)}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('settings', language)}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('logout', language)}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
