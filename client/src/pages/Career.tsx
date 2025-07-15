import React, { useEffect, useState } from 'react';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  location: string;
  experience: string;
  description: string;
}

const whyJoinUs = [
  {
    icon: <Award className="w-8 h-8 text-maroon-500 mb-2" />, 
    title: 'Culture of Excellence',
    desc: 'Work with industry leaders and passionate innovators.'
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-maroon-500 mb-2" />, 
    title: 'Growth & Learning',
    desc: 'Continuous learning, mentorship, and career advancement.'
  },
  {
    icon: <Users className="w-8 h-8 text-maroon-500 mb-2" />, 
    title: 'Team Spirit',
    desc: 'Collaborative, supportive, and diverse work environment.'
  },
  {
    icon: <Briefcase className="w-8 h-8 text-maroon-500 mb-2" />, 
    title: 'Benefits',
    desc: 'Competitive pay, health insurance, and flexible policies.'
  },
];

const Career: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    experience: '',
    resume: null as File | null,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(setJobs);
  }, []);

  // Demo jobs if API returns none
  const demoJobs: Job[] = [
    {
      id: 'sales',
      title: 'Sales Executive',
      location: 'Pune, Maharashtra',
      experience: '2+ years in B2B sales',
      description: `
        <b>Job Description:</b> Responsible for generating leads, managing client relationships, and achieving sales targets for calibration and measurement systems.<br/>
        <b>Skills:</b> Excellent communication, negotiation, CRM tools, technical aptitude.<br/>
        <b>Experience:</b> 2+ years in industrial/B2B sales, preferably in engineering or instrumentation sector.
      `,
    },
    {
      id: 'marketing',
      title: 'Marketing Specialist',
      location: 'Pune, Maharashtra',
      experience: '2+ years in marketing',
      description: `
        <b>Job Description:</b> Plan and execute marketing campaigns, manage digital presence, and support product launches.<br/>
        <b>Skills:</b> Digital marketing, content creation, analytics, event management.<br/>
        <b>Experience:</b> 2+ years in marketing, preferably in technology or manufacturing domain.
      `,
    },
    {
      id: 'servicing',
      title: 'Service Engineer',
      location: 'Pan India (Travel Required)',
      experience: '1+ years in field servicing',
      description: `
        <b>Job Description:</b> Install, calibrate, and service measurement and calibration equipment at client sites.<br/>
        <b>Skills:</b> Troubleshooting, technical support, customer handling, willingness to travel.<br/>
        <b>Experience:</b> 1+ years in servicing/calibration, diploma or degree in engineering preferred.
      `,
    },
  ];
  const jobsToShow = jobs.length > 0 ? jobs : demoJobs;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, resume: e.target.files ? e.target.files[0] : null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    const data = new FormData();
    data.append('name', form.name);
    data.append('email', form.email);
    data.append('location', form.location);
    data.append('experience', form.experience);
    if (form.resume) data.append('resume', form.resume);
    data.append('jobId', selectedJob.id);
    const res = await fetch('/api/apply', { method: 'POST', body: data });
    if (res.ok) setMessage('Application submitted!');
    else setMessage('Submission failed.');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#800000] text-white py-6 overflow-hidden">
        {/* Geometric Line Pattern Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="white" strokeWidth="2" opacity="0.5">
            <polyline points="0,100 300,100 400,200 700,200" />
            <polyline points="200,0 500,0 600,100 900,100" />
            <polyline points="400,200 700,200 800,300 1100,300" />
            <polyline points="600,100 900,100 1000,200 1300,200" />
            <polyline points="800,300 1100,300 1200,400 1440,400" />
            <polyline points="1000,200 1300,200 1400,300 1440,300" />
            <polyline points="100,50 400,50 500,150 800,150" />
            <polyline points="300,150 600,150 700,250 1000,250" />
            <polyline points="500,250 800,250 900,350 1200,350" />
            <polyline points="700,50 1000,50 1100,150 1400,150" />
            <polyline points="900,150 1200,150 1300,250 1440,250" />
            <polyline points="1100,250 1400,250 1440,350 1440,350" />
            <polyline points="0,200 200,200 300,300 500,300" />
            <polyline points="200,300 400,300 500,400 700,400" />
            <polyline points="600,350 900,350 1000,400 1200,400" />
          </g>
        </svg>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 heading-white">Join Reckonix. Shape the Future.</h1>
          <p className="text-lg md:text-xl mb-6 text-maroon-100">We believe in empowering talent, fostering innovation, and building a better tomorrow. Explore your next career move with us in precision calibration and measurement technology!</p>
        </div>
        {/* Decorative SVG */}
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 100 16" preserveAspectRatio="none">
          <polygon fill="#fff" points="0,16 100,0 100,16" />
        </svg>
      </section>

      {/* Why Join Us Section */}
      <section className="max-w-5xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-maroon-500">Why Join Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {whyJoinUs.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-all">
              {item.icon}
              <div className="font-bold text-maroon-500 mb-1">{item.title}</div>
              <div className="text-gray-600 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-maroon-500">Open Positions</h2>
        {jobs.length === 0 ? (
          <ul>
            {jobsToShow.map(job => (
              <li key={job.id} className="mb-6 p-6 border border-maroon-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <div className="font-bold text-lg text-maroon-500">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.location} | {job.experience}</div>
                  </div>
                  <button className="bg-maroon-500 text-white px-5 py-2 rounded hover:bg-maroon-600 transition-all" onClick={() => setSelectedJob(job)}>
                    Apply
                  </button>
          </div>
                <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: job.description }} />
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {jobsToShow.map(job => (
              <li key={job.id} className="mb-6 p-6 border border-maroon-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                  <div>
                    <div className="font-bold text-lg text-maroon-500">{job.title}</div>
                    <div className="text-sm text-gray-600">{job.location} | {job.experience}</div>
                  </div>
                  <button className="bg-maroon-500 text-white px-5 py-2 rounded hover:bg-maroon-600 transition-all" onClick={() => setSelectedJob(job)}>
                    Apply
                  </button>
                </div>
                <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: job.description }} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Application Form */}
      {selectedJob && (
        <section className="max-w-2xl mx-auto px-4 mb-16">
          <form className="bg-gray-50 p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
            <h3 className="font-bold mb-4 text-maroon-500">Apply for: {selectedJob.title}</h3>
            <div className="mb-3">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border p-3 w-full rounded" />
            </div>
            <div className="mb-3">
              <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" type="email" className="border p-3 w-full rounded" />
            </div>
            <div className="mb-3">
              <input name="location" value={form.location} onChange={handleChange} required placeholder="Location" className="border p-3 w-full rounded" />
            </div>
            <div className="mb-3">
              <input name="experience" value={form.experience} onChange={handleChange} required placeholder="Experience" className="border p-3 w-full rounded" />
            </div>
            <div className="mb-3">
              <input name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFile} required className="border p-3 w-full rounded" />
            </div>
            <button className="bg-maroon-500 text-white px-6 py-2 rounded hover:bg-maroon-600 transition-all" type="submit">Submit Application</button>
            {message && <div className="mt-3 text-green-600">{message}</div>}
            <button type="button" className="ml-4 text-maroon-500 underline" onClick={() => setSelectedJob(null)}>
              Cancel
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default Career; 