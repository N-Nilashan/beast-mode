'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ReflectionLog() {
  const [reflection, setReflection] = useState({
    wins: ['', '', ''],
    demon: '',
    plan: ''
  });

  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    const savedReflection = localStorage.getItem(`reflection-${today}`);
    if (savedReflection) {
      setReflection(JSON.parse(savedReflection));
    }
  }, [today]);

  const handleChange = (field, value, index = null) => {
    const newReflection = { ...reflection };
    if (index !== null) {
      newReflection.wins[index] = value;
    } else {
      newReflection[field] = value;
    }
    setReflection(newReflection);
    localStorage.setItem(`reflection-${today}`, JSON.stringify(newReflection));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Daily Reflection</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">3 Wins Today</h3>
          {reflection.wins.map((win, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={win}
                onChange={(e) => handleChange('wins', e.target.value, index)}
                placeholder={`Win #${index + 1}`}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">Biggest Demon Faced</h3>
          <textarea
            value={reflection.demon}
            onChange={(e) => handleChange('demon', e.target.value)}
            placeholder="What was your biggest challenge today?"
            className="w-full p-2 border rounded-md"
            rows="2"
          />
        </div>

        <div>
          <h3 className="font-medium mb-2">Tomorrow's Battle Plan</h3>
          <textarea
            value={reflection.plan}
            onChange={(e) => handleChange('plan', e.target.value)}
            placeholder="What's your plan for tomorrow?"
            className="w-full p-2 border rounded-md"
            rows="2"
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        {format(new Date(), 'MMMM d, yyyy')}
      </div>
    </div>
  );
}
