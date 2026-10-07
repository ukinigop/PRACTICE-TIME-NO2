import { mockJobs } from './mockJobs.js'

function BriefcaseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6m-9 0h12a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm-2 5.2c4.3 2.1 11.7 2.1 16 0M12 10.5v3" /></svg>
}

function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>
}

function ClockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></svg>
}

function Logo() {
  return <a className="brand" href="/" aria-label="Applyly home"><span className="brand-icon"><BriefcaseIcon /></span><span>Applyly</span></a>
}

function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className={`company-mark ${job.color}`}>{job.initials}</div>
        <span className="posted"><ClockIcon />{job.posted}</span>
      </div>
      <div className="job-title-block">
        <p>{job.company}</p>
        <h2>{job.title}</h2>
      </div>
      <div className="job-meta">
        <span><PinIcon />{job.location}</span>
        <span>{job.type}</span>
        <span>{job.level}</span>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="skills" aria-label="Required skills">
        {job.skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
    </article>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Logo />
        <nav aria-label="Applicant navigation">
          <span className="active">Browse jobs</span>
          <span>My applications</span>
        </nav>
        <div className="user-chip" aria-label="Signed in as Alex Mendoza">
          <span>AM</span>
          <div><strong>Alex Mendoza</strong><small>Applicant</small></div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-decoration" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-inner">
            <p className="eyebrow">OPEN OPPORTUNITIES</p>
            <h1>Find a place to do<br /><em>your best work.</em></h1>
            <p>Explore roles from teams that value curiosity, craft, and the person behind the résumé.</p>
          </div>
        </section>

        <section className="listings" aria-labelledby="listings-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2 id="listings-title">Latest opportunities</h2>
            </div>
            <p><strong>{mockJobs.length}</strong> open roles</p>
          </div>

          <div className="job-grid">
            {mockJobs.map((job) => <JobCard key={job.id} job={job} />)}
          </div>

          <p className="mock-note">Showing sample opportunities while the jobs API is being prepared.</p>
        </section>
      </main>

      <footer><Logo /><p>© 2026 Applyly. Built for better beginnings.</p></footer>
    </div>
  )
}

export default App
