import { useState } from 'react'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6m-9 0h12a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.2c4.3 2.1 11.7 2.1 16 0M12 10.5v3" />
    </svg>
  )
}

function EyeIcon({ hidden }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {hidden ? (
        <>
          <path d="M3 3l18 18M10.7 10.7a1.85 1.85 0 0 0 2.6 2.6M9.9 5.2A9.7 9.7 0 0 1 12 5c5.5 0 9 7 9 7a15.2 15.2 0 0 1-2.5 3.4M6.2 6.2C4.1 7.7 3 10 3 12c0 0 3.5 7 9 7 1.1 0 2.1-.3 3-.7" />
        </>
      ) : (
        <>
          <path d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7Z" />
          <circle cx="12" cy="12" r="2.5" />
        </>
      )}
    </svg>
  )
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const updateField = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (form.password.length < 8) nextErrors.password = 'Use at least 8 characters.'
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.'
    if (!form.terms) nextErrors.terms = 'Please accept the terms to continue.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="page-shell success-shell">
        <section className="success-card" aria-live="polite">
          <div className="success-mark">✓</div>
          <p className="eyebrow">YOU'RE ALL SET</p>
          <h1>Welcome aboard, {form.firstName}.</h1>
          <p>Your applicant profile is ready. You can now start exploring opportunities made for you.</p>
          <button type="button" onClick={() => { setSubmitted(false); setForm(initialForm) }}>
            Back to registration
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="brand-panel" aria-label="Applyly introduction">
        <div className="brand">
          <span className="brand-icon"><BriefcaseIcon /></span>
          <span>Applyly</span>
        </div>

        <div className="brand-copy">
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h1>Find work that<br />feels like <em>you.</em></h1>
          <p>Create your profile and discover opportunities that match your skills, goals, and ambition.</p>
        </div>

        <div className="quote-card">
          <span className="quote-mark">“</span>
          <blockquote>Success isn't just about finding a job. It's about finding the right place to grow.</blockquote>
          <div className="quote-author">
            <span>AM</span>
            <p><strong>Ana Mendoza</strong><small>Product Designer</small></p>
          </div>
        </div>

        <p className="copyright">© 2026 Applyly. Built for better beginnings.</p>
      </section>

      <section className="form-panel">
        <div className="mobile-brand brand">
          <span className="brand-icon"><BriefcaseIcon /></span>
          <span>Applyly</span>
        </div>

        <div className="form-wrap">
          <div className="form-heading">
            <p className="eyebrow">CREATE YOUR PROFILE</p>
            <h2>Let’s get you started.</h2>
            <p>Already have an account? <a href="/login">Sign in</a></p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="name-row">
              <Field label="First name" name="firstName" value={form.firstName} onChange={updateField} error={errors.firstName} placeholder="Juan" autoComplete="given-name" />
              <Field label="Last name" name="lastName" value={form.lastName} onChange={updateField} error={errors.lastName} placeholder="Dela Cruz" autoComplete="family-name" />
            </div>

            <Field label="Email address" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} placeholder="you@example.com" autoComplete="email" />

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className={`password-wrap ${errors.password ? 'has-error' : ''}`}>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={updateField} placeholder="At least 8 characters" autoComplete="new-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'password-error' : undefined} />
                <button className="visibility-button" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((current) => !current)}>
                  <EyeIcon hidden={!showPassword} />
                </button>
              </div>
              {errors.password && <span className="error" id="password-error">{errors.password}</span>}
            </div>

            <Field label="Confirm password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={updateField} error={errors.confirmPassword} placeholder="Repeat your password" autoComplete="new-password" />

            <label className="terms">
              <input type="checkbox" name="terms" checked={form.terms} onChange={updateField} />
              <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</span>
            </label>
            {errors.terms && <span className="error terms-error">{errors.terms}</span>}

            <button className="submit-button" type="submit">Create my account <span>→</span></button>
          </form>

          <p className="secure-note"><span>◆</span> Your information is private and secure.</p>
        </div>
      </section>
    </main>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <span className="error" id={`${name}-error`}>{error}</span>}
    </div>
  )
}

export default App
