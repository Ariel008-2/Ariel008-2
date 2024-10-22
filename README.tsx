'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import { Menu, X, ChevronDown, Facebook, Twitter, Instagram, ArrowRight, Play, Calendar, Book, Users, Award } from 'lucide-react'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
const Map = dynamic(() => import('./components/Map'), { ssr: false })

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      const start = 0
      const increment = end / (duration * 60)
      let current = start

      const timer = setInterval(() => {
        current += increment
        if (current >= end) {
          clearInterval(timer)
          setCount(end)
        } else {
          setCount(Math.floor(current))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [end, duration, inView])

  return (
    <div ref={ref}>
      <span ref={countRef} className="text-6xl font-bold text-pink-300">
        {count}
      </span>
    </div>
  )
}

const TimelineEvent = ({ year, event }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-center mb-8"
  >
    <div className="bg-pink-500 text-white rounded-full p-2 w-16 h-16 flex items-center justify-center font-bold text-xl">
      {year}
    </div>
    <div className="ml-4 bg-purple-800 p-4 rounded-lg flex-grow">
      <p className="text-pink-200">{event}</p>
    </div>
  </motion.div>
)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  const words = ['Compromiso', 'Educación', 'Fe']
  const [currentWord, setCurrentWord] = useState(0)
  const [displayedText, setDisplayedText] = useState('')

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    { text: "La educación en Nuestra Señora de Fátima ha sido transformadora para mi hijo. Los valores y la excelencia académica son evidentes.", author: "María Rodríguez, Madre" },
    { text: "Como ex alumno, puedo decir que mi tiempo en Fátima me preparó excepcionalmente para la universidad y la vida.", author: "Juan Pérez, Graduado 2015" },
    { text: "El enfoque holístico de la educación aquí es impresionante. No solo se centran en lo académico, sino también en el desarrollo personal y espiritual.", author: "Ana López, Madre" },
  ]

  const timelineEvents = [
    { year: 1950, event: "Fundación de la Unidad Educativa Nuestra Señora de Fátima" },
    { year: 1975, event: "Expansión de las instalaciones y apertura del nivel secundario" },
    { year: 2000, event: "Implementación de programas de tecnología avanzada" },
    { year: 2010, event: "Celebración del 60º aniversario y renovación del compromiso educativo" },
    { year: 2020, event: "Adaptación exitosa a la educación virtual durante la pandemia" },
  ]

  useEffect(() => {
    let timeout
    if (displayedText.length < words[currentWord].length) {
      timeout = setTimeout(() => {
        setDisplayedText(words[currentWord].slice(0, displayedText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setCurrentWord((currentWord + 1) % words.length)
        setDisplayedText('')
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [displayedText, currentWord])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 text-white">
      <header className="fixed w-full z-50 bg-purple-900 bg-opacity-90">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-pink-300 hover:text-pink-200 transition duration-300">
              UE Nuestra Señora de Fátima
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="text-pink-300 hover:text-pink-200 transition duration-300">Inicio</Link>
              <Link href="/about" className="text-pink-300 hover:text-pink-200 transition duration-300">Sobre Nosotros</Link>
              <Link href="/academics" className="text-pink-300 hover:text-pink-200 transition duration-300">Oferta Educativa</Link>
              <Link href="/admissions" className="text-pink-300 hover:text-pink-200 transition duration-300">Admisiones</Link>
              <Link href="/contact" className="text-pink-300 hover:text-pink-200 transition duration-300">Contacto</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-pink-300 hover:text-pink-200 transition duration-300">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-purple-800 overflow-hidden"
            >
              <Link href="/" className="block px-4 py-2 text-sm text-pink-300 hover:bg-purple-700 transition duration-300">Inicio</Link>
              <Link href="/about" className="block px-4 py-2 text-sm text-pink-300 hover:bg-purple-700 transition duration-300">Sobre Nosotros</Link>
              <Link href="/academics" className="block px-4 py-2 text-sm text-pink-300 hover:bg-purple-700 transition duration-300">Oferta Educativa</Link>
              <Link href="/admissions" className="block px-4 py-2 text-sm text-pink-300 hover:bg-purple-700 transition duration-300">Admisiones</Link>
              <Link href="/contact" className="block px-4 py-2 text-sm text-pink-300 hover:bg-purple-700 transition duration-300">Contacto</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="relative h-screen">
          <ReactPlayer
            url="/video-background.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl font-bold text-pink-300 mb-4"
              >
                Bienvenidos a Nuestra Señora de Fátima
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl text-pink-200 mb-8"
              >
                {displayedText}
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#F472B6' }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold text-xl transition duration-300"
              >
                Conoce más
              </motion.button>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Años de Excelencia Educativa</h2>
            <div className="flex flex-col items-center justify-center">
              <CountUp end={74} duration={3} />
              <p className="text-2xl text-pink-200 mt-4">años formando líderes del mañana</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-indigo-900 to-blue-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Sobre Nosotros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-lg text-pink-100 mb-6"
                >
                  La Unidad Educativa Nuestra Señora de Fátima es un colegio católico comprometido con la excelencia académica y la formación integral de nuestros estudiantes. Fundada en 1950, nuestra institución ha sido un pilar en la comunidad de Riobamba, Ecuador.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-pink-100"
                >
                  Nuestro enfoque educativo combina valores católicos con metodologías de enseñanza innovadoras, preparando a nuestros estudiantes para los desafíos del siglo XXI.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link href="/about" className="inline-flex items-center mt-6 text-pink-300 hover:text-pink-200 transition duration-300">
                    Descubre nuestra historia
                    <ArrowRight className="ml-2" />
                  </Link>
                </motion.div>
              </div>
              <div className="h-96 relative">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Imagen del Colegio"
                  alt="Imagen del Colegio"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-blue-900 to-purple-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Nuestra Oferta Educativa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Educación Inicial', 'Educación Básica', 'Bachillerato'].map((level, index) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-purple-800 p-6 rounded-lg shadow-lg text-pink-100"
                >
                  <h3 className="text-2xl font-bold mb-4 text-pink-300">{level}</h3>
                  <p className="text-pink-100 mb-4">Formación integral que prepara a los estudiantes para los desafíos del futuro, con  énfasis en valores éticos y morales.</p>
                  <Link href="/academics" className="text-pink-300 hover:text-pink-200 transition duration-300">
                    Más información
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Nuestra Historia</h2>
            <div className="max-w-3xl mx-auto">
              {timelineEvents.map((event, index) => (
                <TimelineEvent key={index} year={event.year} event={event.event} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-indigo-900 to-blue-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Nuestros Logros</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Calendar className="w-12 h-12 mb-4 text-pink-300" />, title: "74 Años", description: "de excelencia educativa" },
                { icon: <Book className="w-12 h-12 mb-4 text-pink-300" />, title: "100%", description: "tasa de graduación" },
                { icon: <Users className="w-12 h-12 mb-4 text-pink-300" />, title: "5,000+", description: "alumnos graduados" },
                { icon: <Award className="w-12 h-12 mb-4 text-pink-300" />, title: "50+", description: "premios nacionales" },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-800 p-6 rounded-lg shadow-lg text-center"
                >
                  {achievement.icon}
                  <h3 className="text-2xl font-bold text-pink-300 mb-2">{achievement.title}</h3>
                  <p className="text-pink-100">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="py-16 bg-gradient-to-b from-blue-900 to-purple-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Testimonios</h2>
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-indigo-800 p-6 rounded-lg shadow-lg"
                >
                  <p className="text-pink-100 mb-4 text-lg italic">"{testimonials[currentTestimonial].text}"</p>
                  <p className="text-pink-300 font-bold">{testimonials[currentTestimonial].author}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-gradient-to-b from-purple-900 to-indigo-900"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Galería de Fotos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="overflow-hidden rounded-lg relative group"
                >
                  <Image
                    src={`/placeholder.svg?height=300&width=400&text=Foto ${i}`}
                    alt={`Foto ${i}`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition duration-300"
                    >
                      <Play />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="py-16 bg-gradient-to-b from-indigo-900 to-blue-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-pink-300 mb-12">Nuestra Ubicación</h2>
            <div className="h-96 rounded-lg overflow-hidden">
              <Map />
            </div>
            <div className="mt-8 text-center">
              <p className="text-pink-100 mb-2">Nos encontramos en:</p>
              <p className="text-pink-300 font-bold">Primera Constituyente y Magdalena Dávalos, Riobamba, Ecuador</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 text-pink-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2 text-pink-300">Contáctanos</h3>
              <p>Dirección: Primera Constituyente y Magdalena Dávalos, Riobamba, Ecuador</p>
              <p>Teléfono: (03) 2123-456</p>
              <p>Email: info@uesenordefatima.edu.ec</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2 text-pink-300">Enlaces Rápidos</h3>
              <ul>
                <li><Link href="/admissions" className="hover:text-pink-300 transition duration-300">Admisiones</Link></li>
                <li><Link href="/calendar" className="hover:text-pink-300 transition duration-300">Calendario Académico</Link></li>
                <li><Link href="/news" className="hover:text-pink-300 transition duration-300">Noticias y Eventos</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2 text-pink-300">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-pink-300 hover:text-pink-200 transition duration-300"><Facebook /></Link>
                <Link href="#" className="text-pink-300 hover:text-pink-200 transition duration-300"><Twitter /></Link>
                <Link href="#" className="text-pink-300 hover:text-pink-200 transition duration-300"><Instagram /></Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2024 Unidad Educativa Nuestra Señora de Fátima. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-purple-900 p-4 rounded-lg max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ReactPlayer
                url="/sample-video.mp4"
                width="100%"
                height="auto"
                controls
              />
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
