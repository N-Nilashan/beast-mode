export interface Habit {
  id: number;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
}

export interface Demon {
  id: number;
  name: string;
  lastFailed: string | null;
  streak: number;
}

export interface DayStats {
  date: string;
  habitsCompleted: number;
  totalHabits: number;
  demonsTriggered: number;
  beastScore: number;
  reflection?: {
    wins: string[];
    demon: string;
    plan: string;
  };
}

export interface CalendarDay {
  date: string;
  status: 'complete' | 'partial' | 'failed' | 'empty';
  stats: DayStats;
}
