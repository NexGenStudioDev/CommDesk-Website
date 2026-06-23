import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './features/Nav/v1/components';
import './App.css';
import Home from './features/Home/v1/Home';

function RoutePage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <main className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-x-hidden pt-[72px] text-center">
      <section id="center" className="py-20">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      <Navbar
        isAuthenticated={isAuthenticated}
        onAuthToggle={() => setIsAuthenticated(!isAuthenticated)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/features"
          element={
            <RoutePage
              title="Features"
              description="Explore the platform capabilities and product surface from here."
            />
          }
        />
        <Route
          path="/communities"
          element={
            <RoutePage
              title="Communities"
              description="Browse communities, groups, and shared spaces."
            />
          }
        />
        <Route
          path="/events"
          element={
            <RoutePage
              title="Events"
              description="See upcoming events, sessions, and live programming."
            />
          }
        />
        <Route
          path="/resources"
          element={
            <RoutePage
              title="Resources"
              description="Find guides, templates, and reference material."
            />
          }
        />
        <Route
          path="/pricing"
          element={
            <RoutePage
              title="Pricing"
              description="Review plans and compare tiers here."
            />
          }
        />
        <Route
          path="/about"
          element={
            <RoutePage
              title="About"
              description="Learn more about CommDesk and the team behind it."
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
