import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="home" class="relative min-h-screen flex items-center overflow-hidden pt-20"
             style="background-color:var(--color-paper)">

      <div class="absolute top-20 right-0 w-96 h-96 rounded-full bg-accent opacity-20 blur-[60px] animate-blob"></div>
      <div class="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-accent2 opacity-15 blur-[80px] animate-blob delay-200"></div>

      <div class="absolute inset-0 opacity-[0.04]"
           style="background-image:linear-gradient(var(--color-ink) 1px,transparent 1px),linear-gradient(90deg,var(--color-ink) 1px,transparent 1px);background-size:60px 60px"></div>

      <div class="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="grid md:grid-cols-2 gap-12 items-center">

          <!-- Left -->
          <div class="space-y-8">
            <div class="space-y-2 opacity-0 animate-fade-in-up delay-200" style="animation-fill-mode:forwards">
              <p class="text-lg font-medium" style="color:var(--color-muted)">Hello, I'm</p>
              <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight font-display" style="color:var(--color-ink)">
                Owen<br><span style="color:var(--color-accent)">Oscar</span>
              </h1>
            </div>

            <div class="overflow-hidden h-8 opacity-0 animate-fade-in-up delay-300" style="animation-fill-mode:forwards">
              <div #roleTicker class="flex flex-col">
                <span class="text-xl font-mono h-8 flex items-center" style="color:var(--color-accent2)">Full-Stack Developer</span>
                <span class="text-xl font-mono h-8 flex items-center" style="color:var(--color-accent2)">Angular Developer</span>
                <span class="text-xl font-mono h-8 flex items-center" style="color:var(--color-accent2)">SpringBoot Developer</span>
              </div>
            </div>

            <p class="text-lg leading-relaxed max-w-md opacity-0 animate-fade-in-up delay-400" style="animation-fill-mode:forwards;color:var(--color-muted)">
              I craft beautiful, performant web applications that live at the intersection of engineering excellence and thoughtful design.
            </p>

            <div class="flex flex-wrap gap-4 opacity-0 animate-fade-in-up delay-500" style="animation-fill-mode:forwards">
              <a href="#projects"
                 class="group px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 style="background-color:var(--color-ink);color:var(--color-paper)">
                View My Work
                <svg class="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#contact"
                 class="px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-300 hover:scale-105"
                 style="border-color:var(--color-ink);color:var(--color-ink)">
                Let's Talk
              </a>
            </div>

            <div class="grid grid-cols-3 gap-6 pt-4 opacity-0 animate-fade-in-up delay-600" style="animation-fill-mode:forwards">
              @for (stat of stats; track stat.label) {
                <div class="border-l-2 pl-4" style="border-color:var(--color-accent)">
                  <div class="text-2xl font-bold font-display" style="color:var(--color-ink)">{{ stat.value }}</div>
                  <div class="text-xs mt-0.5" style="color:var(--color-muted)">{{ stat.label }}</div>
                </div>
              }
            </div>
          </div>

          <!-- Right -->
          <div class="relative items-center justify-center hidden md:flex">
            <div class="absolute w-80 h-80 rounded-full border border-dashed opacity-30 animate-spin-slow" style="border-color:var(--color-accent)"></div>
            <div class="absolute w-64 h-64 rounded-full border opacity-20 animate-spin-slow" style="border-color:var(--color-accent2);animation-direction:reverse;animation-duration:15s"></div>
            <div class="relative w-56 h-56 rounded-full overflow-hidden animate-float"
                 style="background:linear-gradient(135deg,#c8a96e 0%,#7c6bc4 100%)">
              <img src="profile.jpg" alt="Owen Oscar" class="w-full h-full object-cover object-center" />
            </div>
            <div class="absolute top-8 -right-4 px-4 py-3 rounded-2xl shadow-xl border text-sm font-mono animate-float"
                 style="animation-delay:1s;border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-ink)">
              <span style="color:var(--color-accent)">&#123;</span> code: <span style="color:var(--color-accent2)">"passion"</span> <span style="color:var(--color-accent)">&#125;</span>
            </div>
            <div class="absolute bottom-8 -left-4 px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold animate-float"
                 style="animation-delay:2s;background-color:var(--color-surface-alt);color:var(--color-on-alt)">
               3+ Years Exp
            </div>
          </div>

        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span class="text-xs font-mono tracking-widest uppercase" style="color:var(--color-ink)">Scroll</span>
        <div class="w-px h-12" style="background:linear-gradient(to bottom,var(--color-ink),transparent)"></div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('roleTicker') roleTicker!: ElementRef;

  stats = [
    { value: '3+',  label: 'Years Experience' },
    { value: '40+', label: 'Projects Shipped'  },
    { value: '20+', label: 'Happy Clients'     },
  ];

  ngAfterViewInit() {
    let idx = 0;
    const el = this.roleTicker?.nativeElement;
    if (!el) return;
    setInterval(() => {
      idx++;
      el.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      el.style.transform = `translateY(-${idx * 2}rem)`;
      if (idx >= 2) {
        setTimeout(() => {
          el.style.transition = 'none';
          el.style.transform = 'translateY(0)';
          idx = 0;
        }, 520);
      }
    }, 2800);
  }
}
