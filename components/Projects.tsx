import React from 'react';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  tags: string[];
  span?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, tags, span }) => {
  return (
    <div className={`group flex flex-col items-stretch justify-start rounded-xl shadow-sm bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${span ? 'lg:col-span-2' : ''}`}>
      <div 
        className="w-full h-60 bg-center bg-no-repeat bg-cover rounded-t-xl" 
        style={{ backgroundImage: `url("${image}")` }}
        aria-label={`Screenshot of ${title}`}
      />
      <div className="flex flex-col flex-grow items-start justify-between gap-4 p-6">
        <div>
          <h3 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary/90">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex w-full items-center justify-start gap-4 mt-4">
          <a className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-medium leading-normal hover:opacity-90 transition-opacity" href="#">
            <span className="material-symbols-outlined text-base">open_in_new</span>
            <span className="truncate">Live Demo</span>
          </a>
          <a className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-9 px-4 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal hover:bg-slate-200 dark:hover:bg-white/20 transition-colors" href="#">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="truncate">GitHub Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="relative flex h-auto w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-col flex-1 py-12 md:py-20">
          <div className="layout-content-container w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="px-4 md:px-2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tighter text-slate-900 dark:text-white">Featured Projects</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-2xl">
                A selection of my best work, showcasing problem-solving skills and technical expertise across different domains.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-8 px-4 md:px-2 lg:grid-cols-2">
              <ProjectCard 
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB0QybPyuZtmV1tviJrDUGnKkVuJvG8a5W0-1mUrubArdDJg9EOejSGwzfVG93g2Vzk2U8NgZEs4pH12dCv53kOJhj-nSdR9uYmwWJKzZSGuzWiHuLXb9diJndSew4K0_zNnOvX5Z3ODtz56fMpYYkUGczfmes_EAB9zCoQx_EUIKEBhfRYu67bpwHgQHg1taLZWZQ4OWFCS6tP_o_MXT4XYhFJ-e5k27wgnT6amyt8h_ueJJPiTxuyk2jH1cDtN0V43JlmjSEKldBu"
                title="E-Commerce Platform"
                description="A full-stack e-commerce solution with a custom CMS, product management, and a secure Stripe payment gateway integration."
                tags={['React', 'Node.js', 'PostgreSQL', 'Stripe API']}
              />
              <ProjectCard 
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuCp733CKJA_OgHqLdXNbHisvXp4xPJovS_HIFv6mQNBUZgMpN7jc1fI-N-0fR7NSSQbB31uYOPfY2NYQ5jDgW_DmhUy1aWzWhmgNKYPe2MYjnF1gS2Ej8rUd_cnVT324xeogdOEM4pxXnSX6lSJH4TqwJMExhtj-uyoCbCCx73cCgbpZCTruS-mrZvueIUJUmlw16b1JI1u_xDAOvdSpLPLfuZoR_-FsTzhomRZmgTO3EtdJbUrhxAGBTtDBWpTrtxylmjPIzlnunKS"
                title="Data Visualization Dashboard"
                description="An interactive dashboard for visualizing complex datasets, featuring real-time updates and customizable chart components."
                tags={['Python', 'Django', 'D3.js', 'AWS']}
              />
              <ProjectCard 
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAVbx50AfId5V8qJBgrbExQJkocwDX689Ju14ZIv9GcmeKjcREv9QRK3UatqSHApL2AmeW-g_6eE27V95d_ZRNZB_7MryyjpmAmmvMCmYF-ID2qMontGAZiEfu8A4Kr-uzY0tx4kaUa6M9mBqwVtyQgKuAadmTv_v17F8Ho65gQ-dXJ0kMUr3H-kEdtGyDu37fpD-7lIiBiKhJDledeqs4KYfJYrxNkmrjqKLNqdxFIeQ2dev5vssakMhxie2pmyp53veM6Zb0VMsxs"
                title="Collaborative Task Manager"
                description="A real-time, serverless task management application allowing teams to collaborate on projects with an intuitive drag-and-drop interface."
                tags={['Vue.js', 'Firebase', 'TypeScript']}
                span
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;