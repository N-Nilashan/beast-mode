import { format, subDays, isSameDay, parseISO } from 'date-fns';
import type { Habit, Demon, DayStats, CalendarDay } from './types';

export const calculateHabitStreak = (habitId: number, date: Date): number => {
  let currentDate = subDays(date, 1); // Start from yesterday
  let streak = 0;

  while (true) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayData = localStorage.getItem(`dailyHabits-${dateStr}`);

    if (!dayData) break;

    const habits = JSON.parse(dayData);
    const habit = habits.find((h: Habit) => h.id === habitId);

    if (!habit || !habit.completed) break;

    streak++;
    currentDate = subDays(currentDate, 1);
  }

  return streak;
};

export const getDayStats = (date: string): DayStats => {
  const habits = JSON.parse(localStorage.getItem(`dailyHabits-${date}`) || '[]');
  const demons = JSON.parse(localStorage.getItem(`demons-${date}`) || '[]');
  const reflection = JSON.parse(localStorage.getItem(`reflection-${date}`) || 'null');

  const habitsCompleted = habits.filter((h: Habit) => h.completed).length;
  const demonsTriggered = demons.filter((d: Demon) => d.lastFailed === date).length;
  const beastScore = habitsCompleted - demonsTriggered;

  return {
    date,
    habitsCompleted,
    totalHabits: habits.length,
    demonsTriggered,
    beastScore,
    reflection: reflection || undefined
  };
};

export const getDayStatus = (stats: DayStats): CalendarDay['status'] => {
  if (stats.totalHabits === 0) return 'empty';
  if (stats.demonsTriggered > 0) return 'failed';
  if (stats.habitsCompleted === stats.totalHabits) return 'complete';
  return 'partial';
};

export const getStatusColor = (status: CalendarDay['status']): string => {
  switch (status) {
    case 'complete': return 'bg-green-500';
    case 'partial': return 'bg-yellow-500';
    case 'failed': return 'bg-red-500';
    default: return 'bg-gray-200';
  }
};

export const getStatusEmoji = (status: CalendarDay['status']): string => {
  switch (status) {
    case 'complete': return '🟩';
    case 'partial': return '🟨';
    case 'failed': return '🟥';
    default: return '⬜';
  }
};
