'use client';

import { useEffect, useState } from 'react';
import { format, subDays, startOfWeek, startOfMonth, eachDayOfInterval } from 'date-fns';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BeastScore() {
  const [score, setScore] = useState(0);
  const [view, setView] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [historicalData, setHistoricalData] = useState({ weekly: [], monthly: [] });

  const calculateScoreForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const habits = JSON.parse(localStorage.getItem(`dailyHabits-${dateStr}`) || '[]');
    const demons = JSON.parse(localStorage.getItem(`demons-${dateStr}`) || '[]');

    const completedHabits = habits.filter(h => h.completed).length;
    const failedDemons = demons.filter(d => d.lastFailed === dateStr).length;

    return completedHabits - failedDemons;
  };

  useEffect(() => {
    const calculateScore = () => {
      const today = new Date();
      const todayScore = calculateScoreForDate(today);
      setScore(todayScore);

      // Calculate weekly data
      const weekStart = startOfWeek(today);
      const weekDays = eachDayOfInterval({ start: weekStart, end: today });
      const weeklyScores = weekDays.map(date => ({
        date: format(date, 'MM/dd'),
        score: calculateScoreForDate(date)
      }));

      // Calculate monthly data
      const monthStart = startOfMonth(today);
      const monthDays = eachDayOfInterval({ start: monthStart, end: today });
      const monthlyScores = monthDays.map(date => ({
        date: format(date, 'MM/dd'),
        score: calculateScoreForDate(date)
      }));

      setHistoricalData({
        weekly: weeklyScores,
        monthly: monthlyScores
      });
    };

    calculateScore();
    window.addEventListener('storage', calculateScore);
    return () => window.removeEventListener('storage', calculateScore);
  }, []);

  const chartData = {
    weekly: {
      labels: historicalData.weekly.map(d => d.date),
      datasets: [{
        label: 'Weekly Beast Score',
        data: historicalData.weekly.map(d => d.score),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    monthly: {
      labels: historicalData.monthly.map(d => d.date),
      datasets: [{
        label: 'Monthly Beast Score',
        data: historicalData.monthly.map(d => d.score),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Beast Score</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1 rounded ${view === 'daily' ? 'bg-white text-black' : 'text-white'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-3 py-1 rounded ${view === 'weekly' ? 'bg-white text-black' : 'text-white'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`px-3 py-1 rounded ${view === 'monthly' ? 'bg-white text-black' : 'text-white'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      {view === 'daily' ? (
        <>
          <div className="text-5xl font-bold text-center my-4">
            {score}
          </div>
          <p className="text-gray-400 text-center">
            Complete tasks and avoid demons to increase your score
          </p>
        </>
      ) : (
        <div className="bg-white p-4 rounded-lg">
          <Line
            data={chartData[view]}
            options={chartOptions}
          />
        </div>
      )}
    </div>
  );
}
