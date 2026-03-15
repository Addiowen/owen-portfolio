import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="experience" class="py-28 relative" style="background-color:var(--color-surface-alt)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent),transparent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-sm" style="color:var(--color-accent)">04.</span>
          <h2 class="text-4xl md:text-5xl font-bold font-display" style="color:var(--color-on-alt)">Experience</h2>
          <div class="flex-1 h-px ml-4" style="background-color:var(--color-divider)"></div>
        </div>

        <div class="grid md:grid-cols-3 gap-12">
          <!-- Timeline -->
          <div class="md:col-span-2 relative">
            <div class="absolute left-4 top-0 bottom-0 w-px" style="background-color:var(--color-divider)"></div>
            <div class="space-y-8">
              @for (job of jobs; track job.company; let i = $index) {
                <div class="relative pl-14 cursor-pointer" (click)="activeJob.set(i)">
                  <div class="absolute left-0 top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                       [style]="activeJob() === i
                         ? 'border-color:var(--color-accent);background-color:var(--color-accent)'
                         : 'border-color:var(--color-card-border);background-color:var(--color-surface-alt)'">
                    <div class="w-2 h-2 rounded-full transition-all"
                         [style]="activeJob() === i ? 'background-color:#0a0a0f' : 'background-color:var(--color-muted)'"></div>
                  </div>

                  <div class="p-6 rounded-2xl border transition-all duration-300"
                       [style]="activeJob() === i
                         ? 'border-color:var(--color-accent);background-color:var(--color-surface)'
                         : 'border-color:var(--color-card-border);background-color:var(--color-skill-card)'">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 class="text-lg font-bold" style="color:var(--color-on-alt)">{{ job.role }}</h3>
                        <div class="flex items-center gap-2 mt-1">
                          <span style="color:var(--color-accent)">{{ job.company }}</span>
                          <span class="text-xs px-2 py-0.5 rounded-full" style="background-color:rgba(124,107,196,0.15);color:var(--color-accent2)">{{ job.type }}</span>
                        </div>
                      </div>
                      <span class="text-xs font-mono" style="color:var(--color-muted)">{{ job.period }}</span>
                    </div>

                    @if (activeJob() === i) {
                      <div class="mt-4 space-y-3">
                        <p class="text-sm leading-relaxed" style="color:var(--color-muted)">{{ job.description }}</p>
                        <ul class="space-y-1.5">
                          @for (item of job.highlights; track item) {
                            <li class="flex items-start gap-2 text-sm" style="color:var(--color-muted)">
                              <mat-icon style="font-size:14px;width:14px;height:14px;line-height:14px;flex-shrink:0;color:var(--color-accent)">chevron_right</mat-icon>{{ item }}
                            </li>
                          }
                        </ul>
                        <div class="flex flex-wrap gap-2 pt-2">
                          @for (tech of job.tech; track tech) {
                            <span class="px-2.5 py-1 text-xs font-mono rounded-full border" style="border-color:var(--color-card-border);color:var(--color-muted)">{{ tech }}</span>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-bold font-display mb-6" style="color:var(--color-on-alt)">Education</h3>
              @for (edu of education; track edu.degree) {
                <div class="p-5 rounded-2xl border mb-4" style="border-color:var(--color-card-border);background-color:var(--color-skill-card)">
                  <mat-icon class="mb-3" style="font-size:28px;width:28px;height:28px;color:var(--color-accent)">{{ edu.icon }}</mat-icon>
                  <div class="font-semibold text-sm" style="color:var(--color-on-alt)">{{ edu.degree }}</div>
                  <div class="text-xs mt-1" style="color:var(--color-accent)">{{ edu.school }}</div>
                  <div class="text-xs mt-0.5" style="color:var(--color-muted)">{{ edu.year }}</div>
                </div>
              }
            </div>
            <div>
              <h3 class="text-lg font-bold font-display mb-6" style="color:var(--color-on-alt)">Certifications</h3>
              @for (cert of certs; track cert.name) {
                <div class="flex items-center gap-3 mb-3 p-3 rounded-xl border" style="border-color:var(--color-card-border);background-color:var(--color-skill-card)">
                  <mat-icon style="font-size:20px;width:20px;height:20px;color:var(--color-accent)">{{ cert.icon }}</mat-icon>
                  <div>
                    <div class="text-xs font-semibold" style="color:var(--color-on-alt)">{{ cert.name }}</div>
                    <div class="text-xs" style="color:var(--color-muted)">{{ cert.issuer }}</div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent {
  activeJob = signal(0);

  jobs = [
    {
      role: 'Software Engineer II (Full-Stack)', company: 'Compulynx', type: 'Full-time', period: 'Dec 2023 — Present',
      description: 'Architecting and developing enterprise-grade web applications for financial institutions across East Africa, serving 50+ enterprise clients with 99.5% uptime.',
      highlights: [
        'Reduced application load times by 40% through lazy loading, code splitting, AOT compilation and strategic caching',
        'Built real-time dashboards using Angular, RxJS observables and WebSockets for biometric verification systems',
        'Developed reusable Angular component libraries with Material Design, cutting development time by 35%',
        'Implemented CI/CD pipelines using Jenkins and Docker for microservices architecture',
        'Mentored 3 junior developers on Angular best practices, TypeScript patterns and Spring Boot development',
        'Maintained 85%+ code coverage with Jasmine/Karma and JUnit/Mockito',
      ],
      tech: ['Angular 14-17', 'Spring Boot', 'PostgreSQL', 'RxJS', 'JWT', 'Docker', 'Jenkins']
    },
    {
      role: 'Junior Software Developer (Frontend)', company: 'Techlit Africa', type: 'Full-time', period: 'Jul 2023 — Dec 2023',
      description: 'Developed CRM interfaces and interactive dashboards using Angular 10+, translating UX mockups into functional components.',
      highlights: [
        'Built custom component libraries with Angular Material, reactive forms and data tables',
        'Implemented complex form validations and interactive dashboards from UX mockups',
        'Achieved bug-free deployments across multiple client projects through rigorous testing',
        'Collaborated in Agile sprints to gather requirements and iterate on user feedback',
      ],
      tech: ['Angular 10+', 'TypeScript', 'Angular Material', 'Jasmine', 'Karma']
    },
    {
      role: 'IT Support Intern', company: 'DeepAfrica Co LTD', type: 'Internship', period: 'Sep 2022 — Dec 2022',
      description: 'Provided technical support to 250+ clients while assisting with web hosting and frontend deployment processes.',
      highlights: [
        'Achieved 4.8/5 client satisfaction rating across 250+ supported clients',
        'Assisted with web hosting configuration and frontend deployment for client websites',
        'Troubleshot software and hardware issues across diverse client environments',
      ],
      tech: ['Technical Support', 'Web Hosting', 'Frontend Deployment']
    },
  ];

  education = [
    { icon: 'school', degree: 'B.Sc. Computer Science',          school: 'University of the People',               year: '2026 – 2029' },
    { icon: 'school', degree: 'Software Engineering Certificate', school: 'ALX Africa',                             year: 'Nov 2022 – Jan 2024' },
    { icon: 'school', degree: 'Diploma in ICT',                   school: "Ol'lessos Technical Training Institute", year: '' },
  ];

  certs = [
    { icon: 'verified',         name: 'CS50X Computer Science',         issuer: 'Harvard University'  },
    { icon: 'verified',         name: 'Google IT Support Professional', issuer: 'Coursera'            },
    { icon: 'cloud',            name: 'AWS Solutions Architect',        issuer: 'Amazon Web Services' },
    { icon: 'settings_suggest', name: 'Certified Kubernetes Admin',     issuer: 'CNCF'                },
    { icon: 'web',              name: 'Angular Developer Expert',       issuer: 'Google'              },
  ];
}
