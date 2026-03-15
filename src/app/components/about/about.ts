import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="about" class="py-28 relative overflow-hidden" style="background-color:var(--color-paper)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent),transparent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-sm" style="color:var(--color-accent)">01.</span>
          <h2 class="text-4xl md:text-5xl font-bold font-display" style="color:var(--color-ink)">About Me</h2>
          <div class="flex-1 h-px ml-4" style="background-color:var(--color-border)"></div>
        </div>

        <div class="grid md:grid-cols-5 gap-16 items-center">
          <div class="md:col-span-2 relative">
            <div class="relative w-full aspect-square max-w-sm mx-auto">
              <div class="absolute inset-0 rounded-3xl translate-x-4 translate-y-4 border-2" style="border-color:var(--color-accent)"></div>
              <div class="absolute inset-0 rounded-3xl overflow-hidden" style="background-color:var(--color-surface-alt)">
                <img src="banner.JPG" alt="Owen Oscar" class="absolute inset-0 w-full h-full object-cover object-center" />
                <div class="absolute bottom-0 left-0 right-0 p-5 font-mono text-xs leading-relaxed"
                     style="background:linear-gradient(to top,rgba(0,0,0,0.85),transparent)">
                  <div style="color:var(--color-accent2)">const</div>
                  <div style="color:var(--color-accent)">developer = &#123;</div>
                  <div class="pl-4 text-green-300">name: <span class="text-green-400">"Owen Oscar"</span>,</div>
                  <div class="pl-4 text-green-300">passion: <span class="text-green-400">"code + design"</span></div>
                  <div style="color:var(--color-accent)">&#125;</div>
                </div>
              </div>
            </div>
          </div>

          <div class="md:col-span-3 space-y-6">
            <p class="text-xl leading-relaxed" style="color:var(--color-ink)">
              I'm a full-stack developer with a deep love for building things that are both
              <em class="font-display not-italic" style="color:var(--color-accent)">beautiful</em> and
              <em class="font-display not-italic" style="color:var(--color-accent2)">functional</em>.
            </p>
            <p class="text-base leading-relaxed" style="color:var(--color-muted)">
              Over the past 3+ years, I've helped startups and enterprise teams ship products
              that users genuinely love. My work sits at the crossroads of clean engineering
              and purposeful design — because a product that works well should also feel effortless to use.
            </p>
            <p class="text-base leading-relaxed" style="color:var(--color-muted)">
              When I'm not writing code, I'm contributing to open source, writing about software
              architecture, or experimenting with generative art and creative coding.
            </p>

            <div class="grid grid-cols-2 gap-4 pt-4">
              @for (fact of facts; track fact.label) {
                <div class="flex items-start gap-3">
                  <mat-icon style="font-size:18px;width:18px;height:18px;color:var(--color-accent)">{{ fact.icon }}</mat-icon>
                  <div>
                    <div class="text-xs font-mono uppercase tracking-widest mb-0.5" style="color:var(--color-accent)">{{ fact.label }}</div>
                    <div class="text-sm font-medium" style="color:var(--color-ink)">{{ fact.value }}</div>
                  </div>
                </div>
              }
            </div>

            <div class="pt-2">
              <a href="OwenCV.pdf" download="Owen_Oscar_CV.pdf"
                 class="inline-flex items-center gap-3 px-6 py-3 border-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                 style="border-color:var(--color-ink);color:var(--color-ink)"
                 onmouseover="this.style.backgroundColor='var(--color-ink)';this.style.color='var(--color-paper)'"
                 onmouseout="this.style.backgroundColor='transparent';this.style.color='var(--color-ink)'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  facts = [
    { icon: 'location_on',  label: 'Location',  value: 'Nairobi, Kenya' },
    { icon: 'school',       label: 'Education', value: 'B.Sc. Computer Science' },
    { icon: 'work',         label: 'Currently', value: 'Open to Opportunities' },
    { icon: 'language',     label: 'Languages', value: 'English, Kiswahili' },
  ];
}
