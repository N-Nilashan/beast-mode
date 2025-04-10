'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Skull, AlertTriangle, Trophy, Calendar, XCircle, Shield } from 'lucide-react';
import type { Demon } from '../lib/types';

export default function DemonDetector() {
  const [demons, setDemons] = useState<Demon[]>([]);
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    // Load demon templates
    const demonsList = JSON.parse(localStorage.getItem('demonsList') || '[]');

    // Load today's status
    const savedStatus = localStorage.getItem(`demons-${today}`);
    if (savedStatus) {
      setDemons(JSON.parse(savedStatus));
    } else {
      // Initialize today's demons from templates
      const initialDemons = demonsList.map((template: Demon) => ({
        ...template,
        lastFailed: null,
        streak: 0
      }));
      setDemons(initialDemons);
      localStorage.setItem(`demons-${today}`, JSON.stringify(initialDemons));
    }
  }, [today]);

  const markFailed = (id: number) => {
    const updatedDemons = demons.map(demon =>
      demon.id === id ? {
        ...demon,
        lastFailed: today,
        streak: 0
      } : demon
    );
    setDemons(updatedDemons);
    localStorage.setItem(`demons-${today}`, JSON.stringify(updatedDemons));
  };

  const getStreak = (lastFailed: string | null): string => {
    if (!lastFailed) return 'Never failed';
    const days = differenceInDays(new Date(), new Date(lastFailed));
    return `${days} days strong`;
  };

  const failedToday = demons.some(demon => demon.lastFailed === today);
  const demonFreeStreak = demons.every(demon => !demon.lastFailed) ? 'Perfect Record!' :
    Math.min(...demons.map(demon =>
      demon.lastFailed ? differenceInDays(new Date(), new Date(demon.lastFailed)) : Infinity
    ));

  if (demons.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Skull className="w-6 h-6 text-red-600" />
          Demon Detector
        </h2>
        <p className="text-gray-600">
          No demons configured yet. Click the settings icon to add some demons to track!
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-lg mt-6 ${failedToday ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Skull className="w-6 h-6 text-red-600" />
          Demon Detector
        </h2>
        {!failedToday && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Beast Shield Active</span>
          </div>
        )}
      </div>

      {failedToday && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm font-medium">Demons triggered today! Stay strong and fight back!</p>
        </div>
      )}

      <div className="space-y-4">
        {demons.map(demon => (
          <div key={demon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-500" />
                <h3 className="font-medium">{demon.name}</h3>
              </div>
              <p className="text-sm text-green-600 flex items-center gap-1">
                {demon.lastFailed ? (
                  <>
                    <Trophy className="w-4 h-4" />
                    {getStreak(demon.lastFailed)}
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Never failed
                  </>
                )}
              </p>
            </div>
            <button
              onClick={() => markFailed(demon.id)}
              className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Mark Failed
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Demon-Free Streak:</span>
          <span className="text-sm font-bold flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            {typeof demonFreeStreak === 'number' ? `${demonFreeStreak} days` : demonFreeStreak}
          </span>
        </div>
      </div>
    </div>
  );
}
