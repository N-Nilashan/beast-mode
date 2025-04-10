'use client';

import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useCalendar } from '../hooks/useCalendar';
import { getStatusColor, getStatusEmoji } from '../lib/utils';
import type { CalendarDay } from '../lib/types';

export default function MomentumCalendar() {
  const { calendarDays, selectedDay, selectDay } = useCalendar();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Momentum Calendar
      </h2>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <button
            key={day.date}
            onClick={() => selectDay(day)}
            className={`
              aspect-square p-2 rounded-md flex flex-col items-center justify-center
              ${getStatusColor(day.status)}
              ${selectedDay?.date === day.date ? 'ring-2 ring-black' : ''}
              hover:opacity-90 transition-opacity
            `}
          >
            <span className="text-xs text-white font-medium">
              {format(parseISO(day.date), 'd')}
            </span>
            <span className="text-xs">
              {getStatusEmoji(day.status)}
            </span>
          </button>
        ))}
      </div>

      {selectedDay && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium mb-2">
            {format(parseISO(selectedDay.date), 'MMMM d, yyyy')}
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              Habits Completed: {selectedDay.stats.habitsCompleted}/{selectedDay.stats.totalHabits}
            </p>
            <p>
              Demons Triggered: {selectedDay.stats.demonsTriggered}
            </p>
            <p>
              Beast Score: {selectedDay.stats.beastScore}
            </p>
            {selectedDay.stats.reflection && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Reflection</h4>
                <div className="space-y-2">
                  <p>Wins: {selectedDay.stats.reflection.wins.join(', ')}</p>
                  <p>Biggest Demon: {selectedDay.stats.reflection.demon}</p>
                  <p>Tomorrow's Plan: {selectedDay.stats.reflection.plan}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
