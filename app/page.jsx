import DailyChecklist from './components/DailyChecklist.jsx';
import DemonDetector from './components/DemonDetector.jsx';
import BeastScore from './components/BeastScore.jsx';
import EmergencyButton from './components/EmergencyButton.jsx';
import ReflectionLog from './components/ReflectionLog.jsx';
import Settings from './components/Settings.jsx';

export default function Home() {
  return (
    <div>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">BeastMode</h1>
        <p className="text-gray-600">Unleash Your Inner Beast</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <DailyChecklist />
          <EmergencyButton />
          <ReflectionLog />
        </div>
        <div>
          <BeastScore />
          <DemonDetector />
        </div>
      </div>

      <Settings />
    </div>
  );
}
