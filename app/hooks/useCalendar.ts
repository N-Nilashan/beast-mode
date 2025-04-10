'use client';

import { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameDay,
  parseISO
} from 'date-fns';
import type { CalendarDay } from '../lib/types';
import { getDayStats, getDayStatus } from '../lib/utils';

export const useCalendar = (selectedDate: Date = new Date()) => {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });

    const calendarData = days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const stats = getDayStats(dateStr);
      const status = getDayStatus(stats);

      return {
        date: dateStr,
        status,
        stats
      };
    });

    setCalendarDays(calendarData);

    // Set selected day if it's within this month
    const todayStr = format(selectedDate, 'yyyy-MM-dd');
    const todayData = calendarData.find(day => day.date === todayStr);
    if (todayData) {
      setSelectedDay(todayData);
    }
  }, [selectedDate]);

  const selectDay = (day: CalendarDay) => {
    setSelectedDay(day);
  };

  return {
    calendarDays,
    selectedDay,
    selectDay
  };
};
