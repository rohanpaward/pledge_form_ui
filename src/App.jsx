import './App.css'
import HeroSection from './components/HeroSection'
import KpiSection from './components/KpiSection'
import PledgeForm from './components/PledgeForm'
import PledgeWall from './components/PublicPledgeWall '
import WhySection from './components/WhySection'
function App() {

  return (
    <>
      {/* <Toaster richColors position="top-center" /> */}
      <HeroSection />
      <KpiSection />
      <WhySection />
      <PledgeForm />
      <PledgeWall />
    </>
  )
}

export default App
