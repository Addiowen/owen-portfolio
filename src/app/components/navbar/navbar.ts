import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            [style]="scrolled()
              ? 'background-color:var(--color-paper);backdrop-filter:blur(12px);border-bottom:1px solid var(--color-border);box-shadow:0 1px 8px rgba(0,0,0,0.06)'
              : 'background-color:transparent'">
      <nav class="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">

        <!-- Logo -->
        <a href="#home" class="flex items-center gap-2.5">
          <img src="logo2.JPG" alt="Owen Oscar" class="w-8 h-8 rounded-full">
          <span class="text-xl font-bold font-display" style="color:var(--color-ink)">Owen Oscar</span>
        </a>

        <!-- Desktop nav links -->
        <ul class="hidden md:flex items-center gap-8">
          @for (item of navItems; track item.label) {
            <li>
              <a [href]="item.href"
                 class="text-sm font-medium transition-colors duration-200 relative group/link"
                 style="color:var(--color-muted)"
                 onmouseover="this.style.color='var(--color-ink)'"
                 onmouseout="this.style.color='var(--color-muted)'">
                {{ item.label }}
                <span class="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover/link:w-full"></span>
              </a>
            </li>
          }
        </ul>

        <!-- Right side: toggle + hire me (desktop) + hamburger (mobile) -->
        <div class="flex items-center gap-2">

          <!-- Theme toggle — always visible -->
          <button
            (click)="toggleTheme()"
            [title]="isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
            class="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
            style="border-color:var(--color-border);color:var(--color-muted)"
            onmouseover="this.style.borderColor='var(--color-accent)';this.style.color='var(--color-accent)'"
            onmouseout="this.style.borderColor='var(--color-border)';this.style.color='var(--color-muted)'">
            @if (isDark()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>

          <!-- Hire Me — desktop only -->
          <button (click)="modalOpen.set(true)"
             class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:opacity-90"
             style="background-color:var(--color-ink);color:var(--color-paper)">
            Hire Me
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          <!-- Hamburger — mobile only -->
          <button class="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full border transition-all duration-300"
                  style="border-color:var(--color-border)"
                  (click)="mobileOpen.set(!mobileOpen())">
            <span class="w-4 h-0.5 block transition-all duration-300 origin-center"
                  style="background-color:var(--color-ink)"
                  [style.transform]="mobileOpen() ? 'rotate(45deg) translateY(6px)' : ''"></span>
            <span class="w-4 h-0.5 block transition-all duration-300"
                  style="background-color:var(--color-ink)"
                  [style.opacity]="mobileOpen() ? '0' : '1'"></span>
            <span class="w-4 h-0.5 block transition-all duration-300 origin-center"
                  style="background-color:var(--color-ink)"
                  [style.transform]="mobileOpen() ? 'rotate(-45deg) translateY(-6px)' : ''"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile menu -->
      @if (mobileOpen()) {
        <div class="md:hidden px-6 pb-6 border-t" style="border-color:var(--color-border);background-color:var(--color-paper)">
          <ul class="flex flex-col gap-4 pt-4">
            @for (item of navItems; track item.label) {
              <li>
                <a [href]="item.href" class="text-lg font-medium" style="color:var(--color-ink)" (click)="mobileOpen.set(false)">
                  {{ item.label }}
                </a>
              </li>
            }
          </ul>
          <button (click)="mobileOpen.set(false); modalOpen.set(true)"
                  class="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full"
                  style="background-color:var(--color-ink);color:var(--color-paper)">
            Hire Me
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      }
    </header>

    <!-- Hire Me Modal -->
    @if (modalOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center p-4"
           (click)="modalOpen.set(false)">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <div class="relative w-full max-w-lg rounded-3xl border overflow-hidden shadow-2xl"
             style="border-color:var(--color-border);background-color:var(--color-paper)"
             (click)="$event.stopPropagation()">

          <!-- Header — always dark -->
          <div class="relative p-8 pb-6" style="background:linear-gradient(135deg,#0a0a0f,#1a1a2e)">
            <button (click)="modalOpen.set(false)"
                    class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <mat-icon class="text-white" style="font-size:18px;width:18px;height:18px;">close</mat-icon>
            </button>
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-full overflow-hidden border-2" style="border-color:var(--color-accent)">
                <img src="profile.jpg" alt="Owen Oscar" class="w-full h-full object-cover">
              </div>
              <div>
                <h2 class="text-xl font-bold font-display text-white">Owen Oscar</h2>
                <p class="text-sm font-mono" style="color:var(--color-accent)">Software Engineer II</p>
                <div class="flex items-center gap-1.5 mt-1">
                  <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span class="text-xs text-white/60">Available for hire</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Body -->
          <div class="p-8 space-y-6">
            <div class="grid grid-cols-3 gap-4">
              @for (stat of stats; track stat.label) {
                <div class="text-center p-3 rounded-2xl border" style="background-color:rgba(200,169,110,0.06);border-color:rgba(200,169,110,0.2)">
                  <div class="text-lg font-bold font-display" style="color:var(--color-ink)">{{ stat.value }}</div>
                  <div class="text-xs mt-0.5" style="color:var(--color-muted)">{{ stat.label }}</div>
                </div>
              }
            </div>

            <div class="space-y-2">
              <p class="text-xs font-mono uppercase tracking-widest" style="color:var(--color-muted)">What I bring</p>
              <div class="space-y-2">
                @for (item of offerings; track item.text) {
                  <div class="flex items-center gap-3">
                    <mat-icon style="font-size:16px;width:16px;height:16px;flex-shrink:0;color:var(--color-accent)">{{ item.icon }}</mat-icon>
                    <span class="text-sm" style="color:var(--color-ink)">{{ item.text }}</span>
                  </div>
                }
              </div>
            </div>

            <div class="p-4 rounded-2xl border flex items-center gap-3" style="border-color:var(--color-border);background-color:rgba(200,169,110,0.05)">
              <mat-icon style="font-size:20px;width:20px;height:20px;color:var(--color-accent)">schedule</mat-icon>
              <div>
                <div class="text-sm font-semibold" style="color:var(--color-ink)">Response within 24 hours</div>
                <div class="text-xs" style="color:var(--color-muted)">Based in Nairobi, Kenya · Open to remote</div>
              </div>
            </div>

            <div class="flex gap-3">
              <a href="#contact" (click)="modalOpen.set(false)"
                 class="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all hover:opacity-90 hover:scale-[1.02]"
                 style="background-color:var(--color-ink);color:var(--color-paper)">
                Send a Message
              </a>
              <a href="OwenCV.pdf" download="Owen_Oscar_CV.pdf"
                 class="flex-1 py-3 rounded-xl text-sm font-semibold text-center border-2 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                 style="border-color:var(--color-ink);color:var(--color-ink)"
                 onmouseover="this.style.backgroundColor='var(--color-ink)';this.style.color='var(--color-paper)'"
                 onmouseout="this.style.backgroundColor='transparent';this.style.color='var(--color-ink)'">
                <mat-icon style="font-size:16px;width:16px;height:16px;">download</mat-icon>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    }

    <!-- Back to Top -->
    @if (scrolled()) {
      <button
        (click)="scrollToTop()"
        title="Back to top"
        class="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:opacity-90"
        style="background-color:var(--color-ink);color:var(--color-paper)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    }
  `
})
export class NavbarComponent implements OnInit {
  scrolled   = signal(false);
  mobileOpen = signal(false);
  modalOpen  = signal(false);
  isDark     = signal(false);

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved ? saved === 'dark' : prefersDark;
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
  }

  toggleTheme() {
    const next = !this.isDark();
    this.isDark.set(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navItems = [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact'    },
  ];

  stats = [
    { value: '3+',  label: 'Years Exp'     },
    { value: '15+', label: 'Projects'      },
    { value: '99%', label: 'Uptime Record' },
  ];

  offerings = [
    { icon: 'web',     text: 'Angular & Spring Boot development'         },
    { icon: 'api',     text: 'RESTful API & microservices architecture'  },
    { icon: 'speed',   text: '40% performance optimization track record' },
    { icon: 'group',   text: 'Team leadership & junior dev mentoring'    },
    { icon: 'devices', text: 'Responsive, accessible UI/UX'             },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 60); }

  @HostListener('document:keydown.escape')
  onEscape() { this.modalOpen.set(false); }
}