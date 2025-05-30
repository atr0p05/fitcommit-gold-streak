
import { toast } from "@/hooks/use-toast";

export interface NotificationPermissions {
  granted: boolean;
  denied: boolean;
}

export interface GoalReminder {
  id: string;
  goalId: string;
  goalTitle: string;
  reminderTime: string;
  message: string;
  isActive: boolean;
}

class NotificationService {
  private reminders: GoalReminder[] = [];

  async requestPermission(): Promise<NotificationPermissions> {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return { granted: false, denied: true };
    }

    const permission = await Notification.requestPermission();
    return {
      granted: permission === "granted",
      denied: permission === "denied"
    };
  }

  async scheduleGoalReminder(reminder: GoalReminder): Promise<void> {
    const permissions = await this.requestPermission();
    
    if (!permissions.granted) {
      toast({
        title: "Notification Permission Required",
        description: "Please enable notifications to receive goal reminders",
        variant: "destructive"
      });
      return;
    }

    this.reminders.push(reminder);
    this.saveReminders();
    
    toast({
      title: "Reminder Set",
      description: `You'll be reminded about "${reminder.goalTitle}" at ${reminder.reminderTime}`,
    });
  }

  sendNotification(title: string, message: string, options?: NotificationOptions): void {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        ...options
      });
    }
  }

  checkGoalProgress(goalId: string, currentProgress: number, target: number): void {
    const progressPercentage = (currentProgress / target) * 100;
    const now = new Date();
    const currentHour = now.getHours();

    // Send reminder if progress is low in the evening
    if (currentHour >= 18 && progressPercentage < 70) {
      this.sendNotification(
        "Goal Reminder",
        `You're at ${Math.round(progressPercentage)}% of your goal. Keep pushing!`
      );
    }
  }

  private saveReminders(): void {
    localStorage.setItem('fitcommit-reminders', JSON.stringify(this.reminders));
  }

  loadReminders(): GoalReminder[] {
    const saved = localStorage.getItem('fitcommit-reminders');
    if (saved) {
      this.reminders = JSON.parse(saved);
    }
    return this.reminders;
  }

  removeReminder(reminderId: string): void {
    this.reminders = this.reminders.filter(r => r.id !== reminderId);
    this.saveReminders();
  }
}

export const notificationService = new NotificationService();
