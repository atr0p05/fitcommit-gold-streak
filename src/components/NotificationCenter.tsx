
import React, { useState, useEffect } from 'react';
import { Bell, BellPlus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notificationService, GoalReminder } from '@/utils/notificationService';
import { useToast } from '@/hooks/use-toast';

interface NotificationCenterProps {
  onClose?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const [reminders, setReminders] = useState<GoalReminder[]>([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [newReminderTime, setNewReminderTime] = useState('09:00');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadedReminders = notificationService.loadReminders();
    setReminders(loadedReminders);
    
    // Check if notifications are enabled
    setNotificationsEnabled(Notification.permission === 'granted');
  }, []);

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    const permissions = await notificationService.requestPermission();
    
    if (permissions.granted) {
      setNotificationsEnabled(true);
      toast({
        title: "Notifications Enabled",
        description: "You'll now receive goal reminders and progress updates",
      });
    } else {
      toast({
        title: "Permission Denied",
        description: "Please enable notifications in your browser settings",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleScheduleReminder = async () => {
    const reminder: GoalReminder = {
      id: Date.now().toString(),
      goalId: 'daily-steps',
      goalTitle: 'Daily Steps Goal',
      reminderTime: newReminderTime,
      message: 'Time to check your daily steps progress!',
      isActive: true
    };

    await notificationService.scheduleGoalReminder(reminder);
    setReminders([...reminders, reminder]);
  };

  const handleRemoveReminder = (reminderId: string) => {
    notificationService.removeReminder(reminderId);
    setReminders(reminders.filter(r => r.id !== reminderId));
    toast({
      title: "Reminder Removed",
      description: "The reminder has been deleted",
    });
  };

  const testNotification = () => {
    notificationService.sendNotification(
      "Test Notification",
      "This is a test notification from FitCommit!"
    );
  };

  return (
    <div className="space-y-6">
      {/* Notification Status */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Enable Notifications</Label>
                <p className="text-sm text-gray-400">Receive reminders and updates</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={handleEnableNotifications}
                disabled={isLoading}
              />
            </div>
            
            {notificationsEnabled && (
              <Button 
                onClick={testNotification}
                variant="outline"
                className="w-full"
              >
                Send Test Notification
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Schedule New Reminder */}
      {notificationsEnabled && (
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BellPlus className="w-5 h-5 mr-2" />
              Schedule Reminder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reminder-time" className="text-white">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={newReminderTime}
                  onChange={(e) => setNewReminderTime(e.target.value)}
                  className="bg-white/10 border-gray-600 text-white"
                />
              </div>
              <Button onClick={handleScheduleReminder} className="w-full">
                Schedule Daily Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Reminders */}
      {reminders.length > 0 && (
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-white">Active Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{reminder.goalTitle}</p>
                    <p className="text-sm text-gray-400">Daily at {reminder.reminderTime}</p>
                  </div>
                  <Button
                    onClick={() => handleRemoveReminder(reminder.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/10"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationCenter;
