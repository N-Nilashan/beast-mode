'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Sun, Dumbbell, Book, Coffee, Zap } from 'lucide-react';

const HABIT_ICONS = {
  'morning': Sun,
  'exercise': Dumbbell,
  'reading': Book,
  'focus': Coffee,
  'default': Zap
};

export default function DailyChecklist() {
  const [habits, setHabits] = useState([]);
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    // Load habit templates
    const habitsList = JSON.parse(localStorage.getItem('habitsList') || '[]');

    // Load today's progress
    const savedProgress = localStorage.getItem(`dailyHabits-${today}`);
    if (savedProgress) {
      setHabits(JSON.parse(savedProgress));
    } else {
      // Initialize today's habits from templates
      const initialHabits = habitsList.map(template => ({
        ...template,
        completed: false
      }));
      setHabits(initialHabits);
      localStorage.setItem(`dailyHabits-${today}`, JSON.stringify(initialHabits));
    }
  }, [today]);

  const toggleHabit = (id) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem(`dailyHabits-${today}`, JSON.stringify(updatedHabits));
  };

  const renderHabitIcon = (iconName) => {
    const IconComponent = HABIT_ICONS[iconName] || HABIT_ICONS.default;
    return <IconComponent className="w-5 h-5" />;
  };

  if (habits.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Daily Beast Tasks
        </h2>
        <p className="text-gray-600">
          No habits configured yet. Click the settings icon to add some habits to track!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Zap className="w-6 h-6" />
        Daily Beast Tasks
      </h2>
      <div className="space-y-3">
        {habits.map(habit => (
          <label key={habit.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={() => toggleHabit(habit.id)}
                className="h-5 w-5 rounded border-gray-300 text-black focus:ring-black absolute opacity-0"
              />
              <div className="w-5 h-5 flex items-center justify-center">
                {habit.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {renderHabitIcon(habit.icon)}
              <span className={`text-lg ${habit.completed ? 'line-through text-gray-500' : ''}`}>
                {habit.name}
              </span>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
        <Sun className="w-4 h-4" />
        {format(new Date(), 'MMMM d, yyyy')}
      </div>
    </div>
  );
}
