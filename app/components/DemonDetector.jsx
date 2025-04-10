'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Skull, AlertTriangle, Trophy, Calendar, XCircle } from 'lucide-react';

export default function DemonDetector() {
  const [demons, setDemons] = useState([]);
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
      const initialDemons = demonsList.map(template => ({
        ...template,
        lastFailed: null,
        streak: 0
      }));
      setDemons(initialDemons);
      localStorage.setItem(`demons-${today}`, JSON.stringify(initialDemons));
    }
  }, [today]);

  const markFailed = (id) => {
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

  const getStreak = (lastFailed) => {
    if (!lastFailed) return 'Never failed';
    const days = differenceInDays(new Date(), new Date(lastFailed));
    return `${days} days strong`;
  };

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
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Skull className="w-6 h-6 text-red-600" />
        Demon Detector
      </h2>
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
      <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <p className="text-sm">Stay strong! Each day without demons makes you stronger.</p>
      </div>
    </div>
  );
}
