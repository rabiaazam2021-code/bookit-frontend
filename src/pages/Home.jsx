import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const stats = [
    { number: "500+", label: "Businesses" },
    { number: "10,000+", label: "Bookings" },
    { number: "50+", label: "Cities" },
  ];

  const categories = [
    { icon: "🏥", title: "Doctors", desc: "Manage patient appointments online" },
    { icon: "💇", title: "Salons", desc: "Accept beauty bookings easily" },
    { icon: "📚", title: "Tutors", desc: "Schedule student sessions" },
    { icon: "💼", title: "Consultants", desc: "Book client meetings effortlessly" },
  ];

  const steps = [
    { step: "01", icon: "🔍", title: "Find a business", desc: "Search doctors, salons or tutors near you" },
    { step: "02", icon: "📅", title: "Choose a time slot", desc: "Select your preferred date and time" },
    { step: "03", icon: "✅", title: "Booking confirmed", desc: "Get an instant email confirmation" },
  ];

  const plans = [
    {
      name: "Free",
      price: "Rs 0",
      period: "forever",
      features: ["Up to 10 bookings/month", "Basic dashboard", "Email confirmation", "1 service"],
      cta: "Get started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "Rs 1,999",
      period: "per month",
      features: ["Unlimited bookings", "Advanced dashboard", "Email + SMS reminders", "Unlimited services", "Priority support"],
      cta: "Start free trial",
      highlighted: true,
    },
    {
      name: "Business",
      price: "Rs 4,999",
      period: "per month",
      features: ["Everything in Pro", "Multiple staff members", "Custom booking page", "Analytics & reports", "Dedicated support"],
      cta: "Contact us",
      highlighted: false,
    },
  ];

  const faqs = [
    { q: "Is BookIt really free?", a: "Yes! Our Free plan is completely free forever. You can upgrade anytime for more features." },
    { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no hidden fees. Cancel your subscription anytime with one click." },
    { q: "What businesses can use BookIt?", a: "Any business that takes appointments — doctors, salons, tutors, consultants, gyms, and more." },
    { q: "Do customers need to create an account?", a: "Yes, customers create a free account to book and manage their appointments easily." },
    { q: "Will I get notified about new bookings?", a: "Yes! You get email notifications for every new booking, cancellation, or status change." },
  ];

  const testimonials = [
    { name: "Dr. Ahmed Ali", role: "Karachi", text: "Managing appointments used to be a hassle. BookIt made everything automatic!" },
    { name: "Sara Beauty Salon", role: "Lahore", text: "Customers now book online themselves. It saves us so much time every day." },
    { name: "Ustad Farhan", role: "Islamabad", text: "Scheduling students has never been easier. Highly recommended!" },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-violet-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="bg-purple-800 text-purple-200 text-sm px-4 py-1.5 rounded-full inline-block mb-6">
            Pakistan's #1 appointment booking platform
          </span>
          <h1 className="text-5xl font-bold mb-5 leading-tight">
            Book appointments
            <br />
            <span className="text-yellow-400">in seconds!</span>
          </h1>
          <p className="text-purple-100 text-lg mb-10 max-w-xl mx-auto">
            Doctors, salons, tutors and consultants — all bookings in one place.
            No calls, no waiting. Just click and done!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-8 py-3.5 rounded-xl text-base font-bold hover:bg-yellow-300 transition"
            >
              Get started free →
            </Link>
            <Link
              to="/login"
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 px-8 py-3.5 rounded-xl text-base font-medium hover:bg-opacity-30 transition"
            >
              Login
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-12 mt-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-yellow-400">{s.number}</p>
                <p className="text-purple-200 mt-1 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Who is BookIt for?</h2>
          <p className="text-gray-500 mt-2">Built for every type of business</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((c) => (
            <div
              key={c.title}
              className="border border-gray-200 rounded-2xl p-6 text-center hover:border-purple-400 hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{c.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="bg-purple-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">How does it work?</h2>
            <p className="text-gray-500 mt-2">Just 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  Step {s.step}
                </span>
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What people are saying</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
              <p className="text-gray-600 mb-5 italic text-sm leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
                <span className="ml-auto text-yellow-400 text-sm">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-purple-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Simple pricing</h2>
            <p className="text-gray-500 mt-2">Start free, upgrade when you are ready</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 ${
                  p.highlighted
                    ? "bg-purple-700 text-white shadow-xl scale-105"
                    : "bg-white border border-gray-200"
                }`}
              >
                {p.highlighted && (
                  <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Most popular
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${p.highlighted ? "text-white" : "text-gray-900"}`}>
                  {p.name}
                </h3>
                <div className="flex items-end gap-1 mb-5">
                  <span className={`text-3xl font-bold ${p.highlighted ? "text-white" : "text-gray-900"}`}>
                    {p.price}
                  </span>
                  <span className={`text-sm mb-1 ${p.highlighted ? "text-purple-200" : "text-gray-500"}`}>
                    /{p.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className={p.highlighted ? "text-yellow-400" : "text-purple-600"}>✓</span>
                      <span className={p.highlighted ? "text-purple-100" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition ${
                    p.highlighted
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                      : "border border-purple-600 text-purple-700 hover:bg-purple-50"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-700 to-violet-700 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Get started today — it's free!</h2>
          <p className="text-purple-100 text-lg mb-8">
            Create your account in 5 minutes and receive your first booking
          </p>
          <Link
            to="/register"
            className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl text-lg font-bold hover:bg-yellow-300 inline-block transition"
          >
            Create free account →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}