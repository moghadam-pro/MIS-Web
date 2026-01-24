import React, { useState } from 'react';
import { useApp } from '@/app/contexts/AppContext';
import { t } from '@/app/utils/translations';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card } from '@/app/components/ui/card';
import { Sun, Moon } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { language, setLanguage, theme, setTheme } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Language and Theme Toggles */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
        >
          <span className="font-semibold">{language === 'fa' ? 'FA' : 'EN'}</span>
          <span className="mx-1">|</span>
          <span className="text-muted-foreground">{language === 'fa' ? 'EN' : 'FA'}</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      <Card className="w-full max-w-md p-8 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="https://moghadam.pro/lnk/orash_logo.svg" alt="Orash Logo" className="h-20 w-20" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2">{t('product.name', language)}</h1>
          <p className="text-muted-foreground">{t('login.title', language)}</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t('login.username', language)}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('login.username', language)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('login.password', language)}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password', language)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {t('login.submit', language)}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          {language === 'fa' ? '© ۱۴۰۴ اوراش. تمامی حقوق محفوظ است.' : '© 2026 Orash. All rights reserved.'}
        </div>
      </Card>
    </div>
  );
};
