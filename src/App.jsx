import { useState } from 'react'

const initialForm = {
  firstName: '', lastName: '', email: '', phone: '', portfolio: '',
  experience: '', coverLetter: '', consent: false,
}

function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6m-9 0h12a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.2c4.3 2.1 11.7 2.1 16 0M12 10.5v3" /></svg>
}

function UploadIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4.5" /></svg>
}

function Logo() {
  return <a className="brand" href="/" aria-label="Applyly home"><span className="brand-icon"><BriefcaseIcon /></span><span>Applyly</span></a>
}

function TextField({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete, optional }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}{optional && <span>Optional</span>}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <small className="error" id={`${name}-error`}>{error}</small>}
    </div>
  )
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [resume, setResume] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const updateField = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleResume = (event) => {
    const file = event.target.files?.[0] ?? null
    setResume(file)
    setErrors((current) => ({ ...current, resume: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!form.experience) nextErrors.experience = 'Select your experience level.'
    if (form.coverLetter.trim().length < 40) nextErrors.coverLetter = 'Please write at least 40 characters.'
    if (!resume) nextErrors.resume = 'Attach your résumé to continue.'
    if (!form.consent) nextErrors.consent = 'Confirm that the information is accurate.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="success-shell">
        <section className="success-card" aria-live="polite">
          <div className="success-mark">✓</div>
          <p className="eyebrow">APPLICATION READY</p>
          <h1>Thank you, {form.firstName}.</h1>
          <p>Your application form passed frontend validation. It will be sent once the applications API is connected.</p>
          <button type="button" onClick={() => setSubmitted(false)}>Review application</button>
        </section>
      </main>
    )
  }

  return (
    <div className="app-shell">
      <header><Logo /><div className="step"><span>APPLICATION</span><strong>Step 1 of 1</strong></div></header>

      <main className="content">
        <aside className="job-summary">
          <p className="eyebrow">YOU'RE APPLYING FOR</p>
          <div className="company-mark">NL</div>
          <p className="company">Northstar Labs</p>
          <h1>Frontend Developer</h1>
          <div className="job-facts"><span>Makati City · Hybrid</span><span>Full-time</span><span>Junior</span></div>
          <blockquote>“Bring your curiosity. We'll give you room to grow.”</blockquote>
          <div className="summary-note"><strong>A quick, thoughtful application.</strong><p>Tell the hiring team who you are, share your experience, and attach your latest résumé.</p></div>
        </aside>

        <section className="form-card" aria-labelledby="form-title">
          <div className="form-heading">
            <p className="eyebrow">YOUR APPLICATION</p>
            <h2 id="form-title">Tell us about yourself.</h2>
            <p>Fields marked with an asterisk are required.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Personal details</legend>
              <div className="two-column">
                <TextField label="First name *" name="firstName" value={form.firstName} onChange={updateField} error={errors.firstName} placeholder="Juan" autoComplete="given-name" />
                <TextField label="Last name *" name="lastName" value={form.lastName} onChange={updateField} error={errors.lastName} placeholder="Dela Cruz" autoComplete="family-name" />
              </div>
              <div className="two-column">
                <TextField label="Email address *" name="email" type="email" value={form.email} onChange={updateField} error={errors.email} placeholder="you@example.com" autoComplete="email" />
                <TextField label="Phone number *" name="phone" type="tel" value={form.phone} onChange={updateField} error={errors.phone} placeholder="+63 912 345 6789" autoComplete="tel" />
              </div>
              <TextField label="Portfolio or LinkedIn" name="portfolio" type="url" value={form.portfolio} onChange={updateField} error={errors.portfolio} placeholder="https://" autoComplete="url" optional />
            </fieldset>

            <fieldset>
              <legend>Experience</legend>
              <div className="field">
                <label htmlFor="experience">Experience level *</label>
                <select id="experience" name="experience" value={form.experience} onChange={updateField} aria-invalid={Boolean(errors.experience)}>
                  <option value="">Select one</option><option value="student">Student / Intern</option><option value="entry">Entry level</option><option value="junior">Junior (1–2 years)</option><option value="mid">Mid-level (3–5 years)</option>
                </select>
                {errors.experience && <small className="error">{errors.experience}</small>}
              </div>
              <div className="field">
                <label htmlFor="coverLetter">Short introduction *</label>
                <textarea id="coverLetter" name="coverLetter" value={form.coverLetter} onChange={updateField} placeholder="What makes this opportunity a good fit for you?" rows="5" maxLength="800" aria-invalid={Boolean(errors.coverLetter)} />
                <div className="textarea-meta">{errors.coverLetter ? <small className="error">{errors.coverLetter}</small> : <span />}<small>{form.coverLetter.length}/800</small></div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Résumé</legend>
              <label className={`upload-box ${errors.resume ? 'has-error' : ''}`} htmlFor="resume">
                <UploadIcon /><strong>{resume ? resume.name : 'Choose a file to upload'}</strong><span>PDF, DOC, or DOCX · up to 5 MB</span>
                <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResume} />
              </label>
              {errors.resume && <small className="error upload-error">{errors.resume}</small>}
            </fieldset>

            <label className="consent"><input name="consent" type="checkbox" checked={form.consent} onChange={updateField} /><span>I confirm that the information provided is accurate and complete.</span></label>
            {errors.consent && <small className="error consent-error">{errors.consent}</small>}
            <p className="mock-note">This mockup validates your form locally and does not send or store personal information.</p>
            <button className="submit-button" type="submit">Submit application <span>→</span></button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
