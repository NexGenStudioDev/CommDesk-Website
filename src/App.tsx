import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

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
  const [count, setCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden">
      <Navbar
        isAuthenticated={isAuthenticated}
        onAuthToggle={() => setIsAuthenticated(!isAuthenticated)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-x-hidden pt-[72px] text-center">
              <section id="center" className="py-20">
                <div className="hero">
                  <img
                    src={heroImg}
                    className="base"
                    width="170"
                    height="179"
                    alt=""
                  />
                  <img src={reactLogo} className="framework" alt="React logo" />
                  <img src={viteLogo} className="vite" alt="Vite logo" />
                </div>
                <div>
                  <h1>Get started</h1>
                  <p className="hero-copy">
                    Edit <code>src/App.tsx</code> and save to test{' '}
                    <code>HMR</code>
                  </p>
                </div>
                <button
                  type="button"
                  className="counter"
                  onClick={() => setCount((count) => count + 1)}
                >
                  Count is {count}
                </button>
              </section>

              <div className="ticks"></div>

              <section id="next-steps">
                <div id="docs">
                  <svg className="icon" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#documentation-icon"></use>
                  </svg>
                  <h2>Documentation</h2>
                  <p>Your questions, answered</p>
                  <ul>
                    <li>
                      <a href="https://vite.dev/" target="_blank">
                        <img className="logo" src={viteLogo} alt="" />
                        Explore Vite
                      </a>
                    </li>
                    <li>
                      <a href="https://react.dev/" target="_blank">
                        <img className="button-icon" src={reactLogo} alt="" />
                        Learn more
                      </a>
                    </li>
                  </ul>
                </div>
                <div id="social">
                  <svg className="icon" role="presentation" aria-hidden="true">
                    <use href="/icons.svg#social-icon"></use>
                  </svg>
                  <h2>Connect with us</h2>
                  <p>Join the Vite community</p>
                  <ul>
                    <li>
                      <a href="https://github.com/vitejs/vite" target="_blank">
                        <svg
                          className="button-icon"
                          role="presentation"
                          aria-hidden="true"
                        >
                          <use href="/icons.svg#github-icon"></use>
                        </svg>
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a href="https://chat.vite.dev/" target="_blank">
                        <svg
                          className="button-icon"
                          role="presentation"
                          aria-hidden="true"
                        >
                          <use href="/icons.svg#discord-icon"></use>
                        </svg>
                        Discord
                      </a>
                    </li>
                    <li>
                      <a href="https://x.com/vite_js" target="_blank">
                        <svg
                          className="button-icon"
                          role="presentation"
                          aria-hidden="true"
                        >
                          <use href="/icons.svg#x-icon"></use>
                        </svg>
                        X.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://bsky.app/profile/vite.dev"
                        target="_blank"
                      >
                        <svg
                          className="button-icon"
                          role="presentation"
                          aria-hidden="true"
                        >
                          <use href="/icons.svg#bluesky-icon"></use>
                        </svg>
                        Bluesky
                      </a>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="ticks"></div>
              <section id="spacer"></section>
            </main>
          }
        />
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
