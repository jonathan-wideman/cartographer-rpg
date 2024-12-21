import { Settings as SettingsIcon } from 'lucide-react';
import { ThemeSettings } from './settings/theme-settings';
import { SaveSettings } from './settings/save-settings';

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <div className="grid gap-6 max-w-2xl">
        <ThemeSettings />
        <SaveSettings />
      </div>
    </div>
  );
}