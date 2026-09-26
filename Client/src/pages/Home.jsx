import React from 'react'
import BackDrop from '../components/BackDrop'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Title from '../components/Title'
import QuickValues from '../components/QuickValues'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import CTA from '../components/CTA'
import FAQs from '../components/FAQs'
import Footer from '../components/Footer'
import { useRef } from 'react'

function Home() {

  const ref = useRef(null);

  const scrollToSection = () => {
    ref.current?.scrollToView({behavior: 'smooth'});
  }

  return (
    <div>
        <BackDrop/>
        <Navbar onNavClick={scrollToSection}/>
        <Hero/>
        <QuickValues/>
        <HowItWorks/>
        <KeyFeatures/>
        <FAQs/>
        <CTA/>
        <Footer/>
    </div>
  )
}

export default Home