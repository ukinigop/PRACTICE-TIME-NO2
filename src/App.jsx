import { mockApplications } from './mockApplications.js'

function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6m-9 0h12a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.2c4.3 2.1 11.7 2.1 16 0M12 10.5v3" /></svg>
}

function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>
}

function CalendarIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4m8-4v4M3 10h18" /></svg>
}

function Logo() {
  return <a className="brand" href="/" aria-label="Applyly home"><span className="brand-icon"><BriefcaseIcon /></span><span>Applyly</span></a>
}

function ApplicationCard({ application }) {
  return (
    <article className="application-card">
      <div className="card-main">
        <div className={`company-mark ${application.color}`}>{application.initials}</div>
        <div className="role">
          <p>{application.company}</p>
          <h2>{application.title}</h2>
          <div className="metadata"><span><PinIcon />{application.location}</span><span><CalendarIcon />Submitted {application.submitted}</span></div>
        </div>
        <div className={`status ${application.statusKey}`}><span />{application.status}</div>
      </div>
      <div className="card-footer">
        <p><strong>Application ID</strong>{application.id}</p>
        <p className="status-note">{application.note}</p>
      </div>
    </article>
  )
}

function App() {
  const activeCount = mockApplications.filter((item) => item.statusKey !== 'closed').length
  const interviewCount = mockApplications.filter((item) => item.statusKey === 'interview').length

  return (
    <div className="app-shell">
      <header className="site-header">
        <Logo />
        <nav aria-label="Applicant navigation"><span>Browse jobs</span><span className="active">My applications</span></nav>
        <div className="user-chip" aria-label="Signed in as Alex Mendoza"><span>AM</span><div><strong>Alex Mendoza</strong><small>Applicant</small></div></div>
      </header>

      <main>
        <section className="page-hero">
          <div className="hero-inner">
            <div><p className="eyebrow">YOUR JOURNEY</p><h1>My applications</h1><p>Keep track of the opportunities you've applied for and where each one stands.</p></div>
            <div className="hero-mark" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </section>

        <section className="dashboard" aria-labelledby="applications-heading">
          <div className="summary-grid">
            <article><span>ALL APPLICATIONS</span><strong>{mockApplications.length}</strong><small>Submitted in total</small></article>
            <article><span>ACTIVE</span><strong>{activeCount}</strong><small>Still in progress</small></article>
            <article className="highlight"><span>INTERVIEWS</span><strong>{interviewCount}</strong><small>Next step unlocked</small></article>
          </div>

          <div className="section-heading">
            <div><p className="eyebrow">APPLICATION HISTORY</p><h2 id="applications-heading">Submitted applications</h2></div>
            <p>Updated from mock data</p>
          </div>

          <div className="application-list">
            {mockApplications.map((application) => <ApplicationCard key={application.id} application={application} />)}
          </div>

          <div className="mock-notice"><span>i</span><p><strong>Demo application data</strong>This page will show your real submissions when the applications API is connected.</p></div>
        </section>
      </main>

      <footer><Logo /><p>© 2026 Applyly. Built for better beginnings.</p></footer>
    </div>
  )
}

export default App
