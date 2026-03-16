import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { Story } from '@/sections/Story';
import { AboutELA } from '@/sections/AboutELA';
import { Prize } from '@/sections/Prize';
import { Pricing } from '@/sections/Pricing';
import { RaffleGrid } from '@/sections/RaffleGrid';
import { PaymentInfo } from '@/sections/PaymentInfo';
import { Gratitude } from '@/sections/Gratitude';
import { AdminPanel } from '@/sections/AdminPanel';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Navigation />
      
      <main>
        <Hero />
        <div id="historia">
          <Story />
        </div>
        <div id="ela">
          <AboutELA />
        </div>
        <div id="premio">
          <Prize />
        </div>
        <div id="precios">
          <Pricing />
        </div>
        <RaffleGrid />
        <div id="pago">
          <PaymentInfo />
        </div>
        <Gratitude />
        <AdminPanel />
      </main>

      <Footer />
    </div>
  );
}

export default App;
