import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="projects" class="py-28 relative overflow-hidden" style="background-color:var(--color-paper)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent2),transparent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-sm" style="color:var(--color-accent)">03.</span>
          <h2 class="text-4xl md:text-5xl font-bold font-display" style="color:var(--color-ink)">Featured Projects</h2>
          <div class="flex-1 h-px ml-4" style="background-color:var(--color-border)"></div>
        </div>

        <!-- Filter tabs -->
        <div class="flex flex-wrap gap-3 mb-12">
          @for (tag of filterTags; track tag; let i = $index) {
            <button
              class="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-300"
              [style]="activeFilter() === i
                ? 'background-color:var(--color-ink);color:var(--color-paper);border-color:var(--color-ink)'
                : 'background-color:transparent;color:var(--color-muted);border-color:var(--color-border)'"
              (click)="activeFilter.set(i)">
              {{ tag }}
            </button>
          }
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filteredProjects(); track project.title) {
            <article class="group relative rounded-3xl overflow-hidden border flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                     style="border-color:var(--color-border);background-color:var(--color-surface)">

              <!-- Thumbnail -->
              <div class="relative h-48 overflow-hidden flex-shrink-0">
                @if (project.image) {
                  <img [src]="project.image" [alt]="project.title"
                       class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105">
                  <div class="absolute inset-0" style="background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,0.4))"></div>
                } @else {
                  <div class="w-full h-full flex items-center justify-center" [style.background]="project.gradient">
                    <mat-icon style="font-size:56px;width:56px;height:56px;color:rgba(255,255,255,0.85)">{{ project.icon }}</mat-icon>
                  </div>
                }

                <!-- Hover overlay with links -->
                <div class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style="background-color:rgba(0,0,0,0.72)">
                  @if (project.demo && project.demo !== '#') {
                    <a [href]="project.demo" target="_blank" (click)="$event.stopPropagation()"
                       class="px-4 py-2 rounded-full text-xs font-semibold bg-white text-black hover:scale-105 transition-transform">
                      Live Demo
                    </a>
                  }
                  @if (project.code && project.code !== '#') {
                    <a [href]="project.code" target="_blank" (click)="$event.stopPropagation()"
                       class="px-4 py-2 rounded-full text-xs font-semibold border border-white text-white hover:scale-105 transition-transform">
                      GitHub
                    </a>
                  }
                </div>

                <!-- Featured badge -->
                @if (project.featured) {
                  <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                       style="background-color:var(--color-accent);color:#0a0a0f">
                    <mat-icon style="font-size:12px;width:12px;height:12px;line-height:12px">star</mat-icon>
                    Featured
                  </div>
                }

                <!-- Status badge -->
                @if (project.status) {
                  <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                       [style]="project.status === 'Live'
                         ? 'background-color:rgba(34,197,94,0.15);color:#22c55e;border:1px solid rgba(34,197,94,0.3)'
                         : 'background-color:rgba(200,169,110,0.15);color:var(--color-accent);border:1px solid rgba(200,169,110,0.3)'">
                    {{ project.status }}
                  </div>
                }
              </div>

              <!-- Body -->
              <div class="p-6 space-y-3 flex flex-col flex-1">
                <h3 class="text-lg font-bold font-display leading-tight" style="color:var(--color-ink)">{{ project.title }}</h3>
                <p class="text-sm leading-relaxed flex-1" style="color:var(--color-muted)">{{ project.description }}</p>
                <div class="flex flex-wrap gap-2 pt-1">
                  @for (tag of project.tags; track tag) {
                    <span class="px-2.5 py-1 rounded-full text-xs font-mono" style="background-color:rgba(124,107,196,0.12);color:var(--color-accent2)">{{ tag }}</span>
                  }
                </div>

                <!-- Links row -->
                <div class="flex items-center gap-4 pt-2 border-t" style="border-color:var(--color-border)">
                  @if (project.code && project.code !== '#') {
                    <a [href]="project.code" target="_blank" (click)="$event.stopPropagation()"
                       class="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                       style="color:var(--color-muted)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                      View Code
                    </a>
                  }
                  @if (project.demo && project.demo !== '#') {
                    <a [href]="project.demo" target="_blank" (click)="$event.stopPropagation()"
                       class="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                       style="color:var(--color-accent2)">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                      Live Demo
                    </a>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <div class="text-center mt-14">
          <a href="https://github.com/Addiowen" target="_blank"
             class="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 hover:scale-105"
             style="border-color:var(--color-border);color:var(--color-ink)"
             onmouseover="this.style.borderColor='var(--color-ink)'"
             onmouseout="this.style.borderColor='var(--color-border)'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            View all
          </a>
        </div>
      </div>
    </section>
  `
})
export class ProjectsComponent {
  activeFilter = signal(0);
  filterTags = ['All', 'Python', 'Angular', 'Node.js', 'C'];

  projects = [
    {
      title: 'Express Mail',
      icon: 'email',
      image: 'project-express-mail.jpg',
      gradient: 'linear-gradient(135deg,#1a1a2e,#4a1942)',
      description: 'A full-featured email web app built as a CS50 final project. Users can register, login, compose, send, receive and view emails. Features session-based auth, SQLite database, and dynamic inbox refresh.',
      tags: ['Python', 'Flask', 'SQLite', 'Jinja2', 'HTML/CSS'],
      featured: true,
      status: 'Live',
      cat: 'Python',
      demo: 'https://youtu.be/FYNzyv_XARE',
      code: 'https://github.com/Addiowen/Express-Mail',
    },
    {
      title: 'AirBnB Clone — The Console',
      icon: 'home',
      image: 'project-airbnb.jpg',
      gradient: 'linear-gradient(135deg,#ff5a5f,#c8335a)',
      description: 'A command-line interpreter and back-end engine for an AirBnB clone, built as part of the ALX Software Engineering programme. Implements object serialization, file storage, and a full CRUD console interface.',
      tags: ['Python', 'OOP', 'JSON', 'Shell', 'ALX'],
      featured: true,
      status: 'Open Source',
      cat: 'Python',
      demo: '#',
      code: 'https://github.com/Addiowen',
    },
    {
      title: 'FindDev API',
      icon: 'api',
      image: 'project-finddev.jpg',
      gradient: 'linear-gradient(135deg,#0d1b2a,#1b4332)',
      description: 'A RESTful API for discovering and connecting with developers. Built to explore backend API design patterns, authentication flows, and structured JSON responses for developer profiles.',
      tags: ['Node.js', 'REST API', 'JSON', 'Backend'],
      featured: false,
      status: 'Open Source',
      cat: 'Node.js',
      demo: '#',
      code: 'https://github.com/Addiowen',
    },
    {
      title: 'Angular Portfolio',
      icon: 'web',
      image: 'project-portfolio.jpg',
      gradient: 'linear-gradient(135deg,#dd0031,#c3002f)',
      description: 'This portfolio site — built with Angular 21 standalone components, Tailwind CSS, Angular Signals, and a full light/dark mode system. Features EmailJS contact form, animated sections, and responsive design.',
      tags: ['Angular', 'TypeScript', 'Tailwind CSS', 'EmailJS'],
      featured: false,
      status: 'Live',
      cat: 'Angular',
      demo: 'https://devowen.netlify.app',
      code: 'https://github.com/Addiowen',
    },
    {
      title: 'Short Python Programs',
      icon: 'terminal',
      image: 'project-python.jpg',
      gradient: 'linear-gradient(135deg,#306998,#ffd43b)',
      description: 'A collection of Python fundamentals and automation scripts covering OOP, decorators, lambda functions, list comprehensions, sets, sequences, and more — built to sharpen core Python skills.',
      tags: ['Python', 'OOP', 'Automation', 'Scripting'],
      featured: false,
      status: 'Open Source',
      cat: 'Python',
      demo: '#',
      code: 'https://github.com/Addiowen/Short-Python-Programs',
    },
    {
      title: 'CS50 Problem Sets',
      icon: 'school',
      image: 'project-cs50.jpg',
      gradient: 'linear-gradient(135deg,#a51c30,#1c1c1e)',
      description: 'All problem sets from Harvard\'s CS50x course, solved in C. Covers memory management, data structures, algorithms, sorting, encryption, and low-level systems programming fundamentals.',
      tags: ['C', 'Algorithms', 'Data Structures', 'Harvard CS50'],
      featured: false,
      status: 'Open Source',
      cat: 'C',
      demo: '#',
      code: 'https://github.com/Addiowen/CS50-PSETS',
    },
  ];

  get filteredProjects() {
    return () => {
      const tab = this.activeFilter();
      if (tab === 0) return this.projects;
      return this.projects.filter(p => p.cat === this.filterTags[tab]);
    };
  }
}