import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <footer class="relative py-16" style="background-color:var(--color-surface-alt)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent),transparent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid md:grid-cols-4 gap-12 mb-12">

          <div class="md:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <img src="logo2.JPG" alt="Owen Oscar" class="w-8 h-8 rounded-full">
              <span class="text-xl font-bold font-display" style="color:var(--color-on-alt)">Owen Oscar</span>
            </div>
            <p class="text-sm leading-relaxed max-w-xs" style="color:var(--color-muted)">
              Full-stack developer crafting beautiful, performant web experiences.
              Open to freelance, contract, and full-time roles.
            </p>
            <div class="flex gap-3 pt-2">
              @for (s of socials; track s.label) {
                <a [href]="s.href" [title]="s.label" target="_blank"
                   class="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
                   style="border-color:var(--color-card-border);color:var(--color-on-alt)"
                   onmouseover="this.style.borderColor='var(--color-accent)';this.style.color='var(--color-accent)'"
                   onmouseout="this.style.borderColor='var(--color-card-border)';this.style.color='var(--color-on-alt)'">
                  <mat-icon style="font-size:18px;width:18px;height:18px;">{{ s.icon }}</mat-icon>
                </a>
              }
            </div>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest mb-5" style="color:var(--color-accent)">Navigation</h4>
            <ul class="space-y-3">
              @for (link of navLinks; track link.label) {
                <li>
                  <a [href]="link.href" class="text-sm transition-colors duration-200"
                     style="color:var(--color-muted)"
                     onmouseover="this.style.color='var(--color-on-alt)'"
                     onmouseout="this.style.color='var(--color-muted)'">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest mb-5" style="color:var(--color-accent)">Availability</h4>
            <div class="space-y-3">
              @for (item of availability; track item.text) {
                <div class="flex items-center gap-3 p-3 rounded-xl border" style="border-color:var(--color-card-border);background-color:var(--color-skill-card)">
                  <mat-icon style="font-size:16px;width:16px;height:16px;flex-shrink:0;color:var(--color-accent)">{{ item.icon }}</mat-icon>
                  <span class="text-xs" style="color:var(--color-muted)">{{ item.text }}</span>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style="border-color:var(--color-divider)">
          <p class="text-xs flex items-center gap-1" style="color:var(--color-muted)">
            © {{ year }} Owen Oscar. Crafted with
            <mat-icon class="text-red-400" style="font-size:12px;width:12px;height:12px;">favorite</mat-icon>
            using Angular & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();

  socials = [
    { icon: 'code',  label: 'GitHub',   href: 'https://github.com/Addiowen' },
    { icon: 'work',  label: 'LinkedIn', href: 'https://linkedin.com/in/owen-oscar-699182330/' },
    { icon: 'email', label: 'Email',    href: 'mailto:owenoscar18@gmail.com' },
    { icon: 'phone', label: 'Phone',    href: 'tel:+254768262121' },
  ];

  navLinks = [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact'    },
  ];

  availability = [
    { icon: 'location_on',       text: 'Nairobi, Kenya'           },
    { icon: 'schedule',          text: 'Response within 24 hours' },
    { icon: 'workspace_premium', text: '3+ Years Experience'      },
  ];
}
