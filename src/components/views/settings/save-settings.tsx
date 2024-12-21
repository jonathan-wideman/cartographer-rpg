import { Save, Power } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

export function SaveSettings() {
  const { settings, updateSettings, resetGame } = useStore();

  const handleAutoSaveChange = (enabled: boolean) => {
    updateSettings({ autoSave: enabled });
    toast.success(`Autosave ${enabled ? 'enabled' : 'disabled'}`);
  };

  const handleResetGame = () => {
    resetGame();
    toast.success('Game reset successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Save & Reset
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="autosave" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Autosave
          </Label>
          <Switch
            id="autosave"
            checked={settings.autoSave}
            onCheckedChange={handleAutoSaveChange}
          />
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Power className="h-4 w-4 mr-2" />
              Reset Game
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all game data including your map, journal entries, and character sheet.
                Your settings will be preserved. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetGame}>
                Reset Game
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}