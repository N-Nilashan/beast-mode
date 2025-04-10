'use client';

import { useState, useEffect } from 'react';
import { Settings2, Sun, Dumbbell, Book, Coffee, Skull, Zap, Plus, Trash2 } from 'lucide-react';

const HABIT_ICONS = {
  'morning': Sun,
  'exercise': Dumbbell,
  'reading': Book,
  'focus': Coffee,
  'default': Zap
};

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [demons, setDemons] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [newDemon, setNewDemon] = useState('');
  const [selectedHabitIcon, setSelectedHabitIcon] = useState('default');

  useEffect(() => {
    const savedHabits = localStorage.getItem('habitsList');
    const savedDemons = localStorage.getItem('demonsList');

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
    if (savedDemons) {
      setDemons(JSON.parse(savedDemons));
    }
  }, []);

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const updatedHabits = [...habits, {
      id: Date.now(),
      name: newHabit.trim(),
      icon: selectedHabitIcon
    }];
    setHabits(updatedHabits);
    localStorage.setItem('habitsList', JSON.stringify(updatedHabits));
    setNewHabit('');
    setSelectedHabitIcon('default');
  };

  const addDemon = (e) => {
    e.preventDefault();
    if (!newDemon.trim()) return;

    const updatedDemons = [...demons, {
      id: Date.now(),
      name: newDemon.trim()
    }];
    setDemons(updatedDemons);
    localStorage.setItem('demonsList', JSON.stringify(updatedDemons));
    setNewDemon('');
  };

  const removeHabit = (id) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    setHabits(updatedHabits);
    localStorage.setItem('habitsList', JSON.stringify(updatedHabits));
  };

  const removeDemon = (id) => {
    const updatedDemons = demons.filter(demon => demon.id !== id);
    setDemons(updatedDemons);
    localStorage.setItem('demonsList', JSON.stringify(updatedDemons));
  };

  const renderHabitIcon = (iconName) => {
    const IconComponent = HABIT_ICONS[iconName] || HABIT_ICONS.default;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800"
      >
        <Settings2 className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings2 className="w-6 h-6" />
                Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Daily Habits Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Daily Beast Tasks
                </h3>
                <form onSubmit={addHabit} className="mb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        placeholder="Add new habit..."
                        className="flex-1 p-2 border rounded-md"
                      />
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(HABIT_ICONS).map(([key, Icon]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedHabitIcon(key)}
                          className={`p-2 rounded-md ${selectedHabitIcon === key ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
                <ul className="space-y-2">
                  {habits.map(habit => (
                    <li key={habit.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="flex items-center gap-2">
                        {renderHabitIcon(habit.icon)}
                        {habit.name}
                      </span>
                      <button
                        onClick={() => removeHabit(habit.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Demons Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Skull className="w-5 h-5" />
                  Demon List
                </h3>
                <form onSubmit={addDemon} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newDemon}
                      onChange={(e) => setNewDemon(e.target.value)}
                      placeholder="Add new demon..."
                      className="flex-1 p-2 border rounded-md"
                    />
                    <button
                      type="submit"
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </form>
                <ul className="space-y-2">
                  {demons.map(demon => (
                    <li key={demon.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="flex items-center gap-2">
                        <Skull className="w-5 h-5 text-red-500" />
                        {demon.name}
                      </span>
                      <button
                        onClick={() => removeDemon(demon.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
