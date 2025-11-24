import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Activity, 
  Brain, 
  Languages, 
  AlertTriangle, 
  UserX, 
  FileText, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Globe,
  Mail,
  Phone,
  Twitter,
  Linkedin,
  ChevronRight,
  Database,
  Stethoscope,
  Menu,
  X
} from 'lucide-react'

interface LandingPageProps {
  onEnterApp?: () => void
  onPatientAccess?: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onPatientAccess }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDemo, setActiveDemo] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-cycle demo cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const navItems = ['Features', 'How It Works', 'Impact', 'Technology']

  const problemCards = [
    {
      image: "/images/problems/limited-specialists.jpeg",
      bg: "bg-red-50",
      title: "Limited Specialists",
      desc: "Rural areas lack obstetricians and pharmacologists for expert guidance."
    },
    {
      image: "/images/problems/language-barriers.jpg",
      bg: "bg-orange-50",
      title: "Language Barriers",
      desc: "Medical information only available in English, not local languages."
    },
    {
      image: "/images/problems/medication-errors.jpg",
      bg: "bg-purple-50",
      title: "Medication Errors",
      desc: "40% of pregnancy complications come from unsafe drug use."
    },
    {
      image: "/images/problems/knowledge-gaps.jpg",
      bg: "bg-blue-50",
      title: "Knowledge Gaps",
      desc: "Community health workers need instant decision support tools."
    }
  ]

  const safetyLevels = [
    { level: "SAFE", color: "emerald", icon: CheckCircle, text: "Paracetamol is safe throughout pregnancy" },
    { level: "CAUTION", color: "yellow", icon: "!", text: "Monitor closely, specialist consultation recommended" },
    { level: "HIGH RISK", color: "orange", icon: AlertTriangle, text: "Requires immediate medical supervision" },
    { level: "CONTRAINDICATED", color: "red", icon: XCircle, text: "Do not use - serious risks to mother/baby" }
  ]

  const languages = [
    { lang: "English", text: "This medication is not safe during pregnancy", color: "text-blue-600" },
    { lang: "Hausa", text: "Wannan magani bai dace da mata masu juna biyu ba", color: "text-emerald-600" },
    { lang: "Yoruba", text: "Oogun yi ko dara fun aboyun", color: "text-purple-600" },
    { lang: "Igbo", text: "Ogwu a adighi mma maka nne di ime", color: "text-orange-600" }
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* NAVBAR */}
      <motion.nav 
        className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          boxShadow: scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img 
              src="/images/logo.png" 
              alt="MamaSafe" 
              className="h-16 w-16 object-contain"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <div>
              <h1 className="text-lg font-bold leading-none tracking-tight text-slate-900">MamaSafe</h1>
              <p className="text-xs font-medium text-slate-500">AI-Powered Care</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a 
                key={item} 
                href="#" 
                className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>

          <motion.button 
            className="hidden md:block rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterApp}
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="block text-sm font-medium text-slate-600"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button 
                  className="w-full rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={onEnterApp}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/50 to-white px-6 py-20 lg:py-28">
        {/* Animated Background Blobs */}
        <motion.div 
          className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl filter"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl filter"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* Hero Content */}
          <motion.div 
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Activity className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Life-Saving AI Technology</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl font-extrabold leading-[1.1] text-slate-900 lg:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Protecting <br/>
              <span className="text-emerald-500">Mothers & Babies</span> <br/>
              <span className="text-purple-600">with AI</span>
            </motion.h1>

            <motion.p 
              className="max-w-lg text-lg leading-relaxed text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              MamaSafe helps rural African healthcare workers instantly determine if medications are safe for pregnant women, preventing birth defects and maternal complications through real-time AI analysis in local languages.
            </motion.p>

            {/* Dual Path Access */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {/* Provider Path */}
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  className="flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-600"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEnterApp}
                >
                  <Stethoscope className="h-5 w-5" />
                  For Healthcare Providers
                </motion.button>
                <motion.button 
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-8 py-4 font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  Watch Demo
                </motion.button>
              </div>
              
              {/* Patient Path */}
              <motion.div 
                className="flex items-center gap-4 rounded-xl bg-purple-50 border border-purple-100 p-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-white">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-purple-900">For Patients</h3>
                  <p className="text-sm text-purple-700">Access your maternal care records securely</p>
                </div>
                <motion.button 
                  className="rounded-lg bg-purple-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPatientAccess}
                >
                  Access Records
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Interactive Demo Card */}
          <motion.div 
            className="relative z-10 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-100/50 backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Header */}
              <div className="mb-6 flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              
              {/* Simulation Input */}
              <motion.div 
                className="mb-6 rounded-xl bg-slate-50 p-4"
                whileHover={{ backgroundColor: '#f1f5f9' }}
              >
                <div className="flex items-center gap-3 text-slate-700">
                  <Stethoscope className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold">Medication Check</span>
                </div>
                <div className="mt-2 border-t border-slate-200 pt-2 text-sm text-slate-500">
                  Paracetamol + Pregnancy Week 24
                </div>
              </motion.div>

              {/* Animated Result */}
              <motion.div 
                className="rounded-xl border border-emerald-100 bg-emerald-50 p-5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-emerald-800">SAFE</h3>
                    <p className="text-sm text-emerald-600">Paracetamol is safe throughout pregnancy</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl text-center">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 md:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Critical Problem We Solve
          </motion.h2>
          <motion.p 
            className="mx-auto mt-4 max-w-2xl text-slate-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Rural healthcare faces unprecedented challenges in pregnancy care, leading to preventable complications and maternal mortality.
          </motion.p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {problemCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                className={`group relative overflow-hidden rounded-2xl ${card.bg} p-8 text-left transition cursor-pointer`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div 
                  className="mb-6 inline-flex h-28 w-40 items-center justify-center rounded-xl shadow-md"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="h-28 w-40 object-cover rounded-lg"
                  />
                </motion.div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <motion.section 
        className="bg-slate-900 py-16 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 text-center md:grid-cols-3">
          {[
            { stat: "1 in 10", color: "text-pink-500", desc: "Babies born with preventable medication-related complications" },
            { stat: "40%", color: "text-orange-500", desc: "Increase in maternal mortality from unsafe drug interactions" },
            { stat: "95%", color: "text-emerald-500", desc: "Of healthcare workers making decisions without proper guidance" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <motion.div 
                className={`text-5xl font-black ${item.color}`}
                whileInView={{ scale: [0.5, 1.1, 1] }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 + 0.3, duration: 0.6 }}
              >
                {item.stat}
              </motion.div>
              <p className="mx-auto mt-4 max-w-xs text-sm font-medium text-slate-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* DEMO SECTION */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          
          {/* Safety Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold text-slate-900">Medication Safety Analysis</h2>
            <div className="space-y-4">
              {safetyLevels.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className={`rounded-xl border border-${item.color}-100 bg-${item.color}-50 p-6 cursor-pointer`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  onClick={() => setActiveDemo(idx)}
                  style={{
                    backgroundColor: activeDemo === idx ? `rgb(${item.color === 'emerald' ? '16 185 129' : item.color === 'yellow' ? '245 158 11' : item.color === 'orange' ? '249 115 22' : '239 68 68'} / 0.1)` : undefined,
                    borderColor: activeDemo === idx ? `rgb(${item.color === 'emerald' ? '16 185 129' : item.color === 'yellow' ? '245 158 11' : item.color === 'orange' ? '249 115 22' : '239 68 68'} / 0.3)` : undefined
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-${item.color}-500 text-white ${item.icon === '!' ? 'font-bold' : ''}`}>
                      {item.icon === '!' ? '!' : <item.icon className="h-5 w-5" />}
                    </div>
                    <span className={`font-bold text-${item.color}-800`}>{item.level}</span>
                  </div>
                  <p className={`mt-2 text-${item.color === 'yellow' ? item.color + '-700' : item.color + '-600'}`}>"{item.text}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Multi-Language */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-3xl font-bold text-slate-900">Multi-Language Support</h2>
            <div className="rounded-3xl bg-slate-50 p-6">
              <div className="space-y-4">
                {languages.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className={`mb-2 flex items-center gap-2 text-sm font-bold text-slate-900`}>
                      <Globe className={`h-4 w-4 ${item.color}`} /> {item.lang}
                    </div>
                    <p className="text-slate-600">"{item.text}"</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-16 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-4">
          
          {/* Brand */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-white">
              <img src="/images/logo.png" alt="MamaSafe" className="h-20 w-20 object-contain" />
              <span className="text-xl font-bold">MamaSafe</span>
            </div>
            <p className="text-sm font-medium text-slate-400">AI-Powered Pregnancy Care</p>
            <p className="text-sm leading-relaxed">
              Protecting mothers and babies across rural Africa with AI-powered medication safety analysis.
            </p>
          </motion.div>

          {/* Platform */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-6 font-bold text-white">Platform</h4>
            <ul className="space-y-3 text-sm">
              {['Web Dashboard', 'Mobile App', 'SMS Interface', 'USSD Access'].map((link, idx) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="hover:text-emerald-400 transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-6 font-bold text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              {['Documentation', 'Training Materials', 'Clinical Guidelines', 'Support Center'].map((link, idx) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="hover:text-emerald-400 transition-colors">{link}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-6 font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" /> support@mamasafe.health
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" /> +234 800 MAMASAFE
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <motion.div 
                className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.div>
              <motion.div 
                className="flex h-10 w-10 items-center justify-center rounded bg-slate-800 hover:bg-slate-700 cursor-pointer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </footer>

    </div>
  )
}

export default LandingPage