import { useState } from 'react'

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6m-9 0h12a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.2c4.3 2.1 11.7 2.1 16 0M12 10.5v3" />
    </svg>
  )
}

function EyeIcon({ visible }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {visible ? (
        <><path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" /><circle cx="12" cy="12" r="2.5" /></>
      ) : (
        <><path d="M3 3l18 18M10.7 10.7a1.85 1.85 0 0 0 2.6 2.6M9.9 5.2A9.7 9.7 0 0 1 12 5c5.5 0 9 7 9 7a15.2 15.2 0 0 1-2.5 3.4M6.2 6.2C4.1 7.7 3 10 3 12c0 0 3.5 7 9 7 1.1 0 2.1-.3 3-.7" /></>
      )}
    </svg>
  )
}

function Logo() {
  return <div className="brand"><span className="brand-icon"><BriefcaseIcon /></span><span>Applyly</span></div>
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [signedIn, setSignedIn] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = 'Enter a valid email address.'
    if (!password) nextErrors.password = 'Password is required.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSignedIn(true)
  }

  if (signedIn) {
    return (
      <main className="success-shell">
        <section className="success-card" aria-live="polite">
          <div className="success-mark">✓</div>
          <p className="eyebrow">WELCOME BACK</p>
          <h1>You're signed in.</h1>
          <p>The login interface is working. Account authentication will be connected when the backend API is available.</p>
          <button type="button" onClick={() => setSignedIn(false)}>Back to login</button>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="story-panel" aria-label="Applyly introduction">
        <Logo />
        <div className="story-copy">
          <p className="eyebrow">WELCOME BACK</p>
          <h1>Keep moving<br />toward what<br /><em>matters.</em></h1>
          <p>Your next opportunity may be closer than you think. Sign in and continue building your future.</p>
        </div>
        <div className="progress-card">
          <div className="progress-art" aria-hidden="true">
            <span className="path path-one" /><span className="path path-two" /><span className="path path-three" />
            <span className="dot dot-one" /><span className="dot dot-two" /><span className="dot dot-three" />
          </div>
          <div><strong>Your journey, all in one place.</strong><p>Pick up where you left off and stay focused on your next step.</p></div>
        </div>
        <p className="copyright">© 2026 Applyly. Built for better beginnings.</p>
      </section>

      <section className="form-panel">
        <div className="mobile-logo"><Logo /></div>
        <div className="form-wrap">
          <header className="form-heading">
            <p className="eyebrow">APPLICANT PORTAL</p>
            <h2>Good to see you again.</h2>
            <p>New to Applyly? <a href="/register">Create an account</a></p>
          </header>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: '' })) }} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
              {errors.email && <span className="error" id="email-error">{errors.email}</span>}
            </div>

            <div className="field">
              <div className="label-row"><label htmlFor="password">Password</label><a href="/forgot-password">Forgot password?</a></div>
              <div className={`password-wrap ${errors.password ? 'has-error' : ''}`}>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: '' })) }} placeholder="Enter your password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} />
                <button className="visibility-button" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}><EyeIcon visible={showPassword} /></button>
              </div>
              {errors.password && <span className="error" id="password-error">{errors.password}</span>}
            </div>

            <label className="remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Keep me signed in on this device</span></label>
            <button className="submit-button" type="submit">Sign in to my account <span>→</span></button>
          </form>

          <div className="divider"><span>SECURE APPLICANT ACCESS</span></div>
          <p className="support-note">Having trouble signing in? <a href="mailto:support@applyly.test">Contact support</a></p>
        </div>
      </section>
    </main>
  )
}

export default App
