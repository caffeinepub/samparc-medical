import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Stethoscope, Pill, FlaskConical, HeartPulse, Ambulance,
  ShieldCheck, Users, Award, Clock, ChevronRight, Star
} from 'lucide-react';
import { useGetContent } from '../hooks/useQueries';

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

const services = [
  { icon: Stethoscope, title: 'General Medicine', desc: 'Comprehensive primary care for all age groups with experienced physicians.', color: 'bg-teal-50 text-medical-primary' },
  { icon: Ambulance, title: 'Emergency Care', desc: '24/7 emergency services with rapid response and critical care support.', color: 'bg-red-50 text-red-600' },
  { icon: Pill, title: 'Pharmacy', desc: 'Full-service pharmacy with a wide range of medicines at affordable prices.', color: 'bg-blue-50 text-blue-600' },
  { icon: FlaskConical, title: 'Diagnostics', desc: 'Advanced laboratory and imaging services for accurate diagnosis.', color: 'bg-purple-50 text-purple-600' },
  { icon: HeartPulse, title: 'Cardiac Care', desc: 'Specialized cardiac monitoring, ECG, and preventive heart health services.', color: 'bg-pink-50 text-pink-600' },
  { icon: ShieldCheck, title: 'Preventive Health', desc: 'Regular health checkups, vaccinations, and wellness programs.', color: 'bg-green-50 text-green-600' },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients Served' },
  { icon: Award, value: '15+', label: 'Years of Excellence' },
  { icon: Clock, value: '24/7', label: 'Emergency Care' },
  { icon: Star, value: '4.9★', label: 'Patient Rating' },
];

const testimonials = [
  { name: 'Rajesh Sharma', text: 'SAMPARC MEDICAL provided excellent care during my treatment. The staff is professional and compassionate.', rating: 5 },
  { name: 'Priya Patel', text: 'The pharmacy has all medicines available at reasonable prices. Highly recommend this hospital!', rating: 5 },
  { name: 'Suresh Kumar', text: 'Emergency services are top-notch. They responded quickly and provided excellent treatment.', rating: 5 },
];

export default function Home() {
  const { data: heroContent } = useGetContent('hero');
  const heroSection = useIntersectionObserver();
  const servicesSection = useIntersectionObserver();
  const statsSection = useIntersectionObserver();
  const testimonialsSection = useIntersectionObserver();

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1440x600.png"
            alt="SAMPARC MEDICAL"
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-dark/90 via-medical-dark/70 to-medical-primary/40"></div>
        </div>

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-medical-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className={`max-w-2xl transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 text-gold-light px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              Trusted Healthcare Since 2009
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              {heroContent || (
                <>
                  Your Health is Our<br />
                  <span className="text-gold">Top Priority</span>
                </>
              )}
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
              SAMPARC MEDICAL — a beacon of healthcare excellence in Malavali. We combine modern medicine with compassionate care to serve our community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-medical-primary hover:bg-medical-dark text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Appointment <ChevronRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 text-xs animate-bounce">
          <span>Scroll</span>
          <div className="w-0.5 h-6 bg-white/40 rounded-full"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section ref={statsSection.ref} className="bg-medical-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${statsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <stat.icon size={24} className="text-gold mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-teal-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesSection.ref} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-medical-primary font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">Our Medical Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SAMPARC MEDICAL offers a comprehensive range of healthcare services designed to meet all your medical needs under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-medical transition-all duration-500 hover:-translate-y-1 border border-gray-100 group ${
                  servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon size={22} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-medical-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-medical-dark transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View All Services <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section ref={heroSection.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 ${heroSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <span className="text-medical-primary font-semibold text-sm uppercase tracking-widest">About SAMPARC MEDICAL</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                A Legacy of <span className="text-medical-primary">Healthcare Excellence</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                SAMPARC MEDICAL is a premier healthcare institution located near Malavali Railway Station, Maharashtra. Founded with a vision to provide accessible, quality healthcare to the community, we have grown into a trusted medical center serving thousands of patients.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Under the visionary leadership of our Founder Director <strong>AMITKUMAR BANERJEE</strong> and CEO <strong>ANUJ SINGH</strong>, SAMPARC MEDICAL continues to expand its services and embrace modern medical technologies to deliver the best patient outcomes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-medical-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-medical-dark transition-all"
                >
                  Meet Our Team <ChevronRight size={16} />
                </Link>
                <a
                  href="tel:+919766343454"
                  className="inline-flex items-center gap-2 border-2 border-medical-primary text-medical-primary px-5 py-2.5 rounded-xl font-semibold hover:bg-medical-light transition-all"
                >
                  Call Us Now
                </a>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${heroSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-medical-light rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-medical-primary mb-1">10K+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Patients</div>
                </div>
                <div className="bg-gold/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-gold-dark mb-1">15+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-blue-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Medical Staff</div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-extrabold text-green-600 mb-1">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsSection.ref} className="py-20 bg-gradient-to-br from-medical-dark to-medical-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`text-center mb-12 transition-all duration-700 ${testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">Patient Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">What Our Patients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-700 ${
                  testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold/30 rounded-full flex items-center justify-center">
                    <span className="text-gold font-bold text-sm">{t.name[0]}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Experience Quality Healthcare?</h2>
          <p className="text-gray-600 mb-8 text-lg">Visit SAMPARC MEDICAL today or contact us for appointments and inquiries.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/919766343454"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              WhatsApp Us
            </a>
            <a
              href="tel:+919766343454"
              className="inline-flex items-center gap-2 bg-medical-primary hover:bg-medical-dark text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Call Now: +91 9766343454
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
