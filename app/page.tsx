import DailyChecklist from './components/DailyChecklist';
import DemonDetector from './components/DemonDetector';
import BeastScore from './components/BeastScore';
import EmergencyButton from './components/EmergencyButton';
import ReflectionLog from './components/ReflectionLog';
import Settings from './components/Settings';
import MomentumCalendar from './components/MomentumCalendar';

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
          <MomentumCalendar />
        </div>
      </div>

      <Settings />
    </div>
  );
}
