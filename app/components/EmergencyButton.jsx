'use client';

import { useState } from 'react';

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState({
    avoiding: '',
    lie: '',
    action: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for future reference
    const previousAnswers = JSON.parse(localStorage.getItem('emergencyAnswers') || '[]');
    const newAnswer = {
      ...answers,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emergencyAnswers', JSON.stringify([...previousAnswers, newAnswer]));
    setIsOpen(false);
    setAnswers({ avoiding: '', lie: '', action: '' });
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-red-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors shadow-lg"
      >
        I&apos;m Failing
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Emergency Protocol</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What am I avoiding?
                </label>
                <textarea
                  value={answers.avoiding}
                  onChange={(e) => setAnswers({ ...answers, avoiding: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What lie is my mind telling me?
                </label>
                <textarea
                  value={answers.lie}
                  onChange={(e) => setAnswers({ ...answers, lie: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  rows="2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What can I do in 2 minutes?
                </label>
                <textarea
                  value={answers.action}
                  onChange={(e) => setAnswers({ ...answers, action: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  rows="2"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Reset & Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
