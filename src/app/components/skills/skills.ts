import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <section id="skills" class="py-28 relative" style="background-color:var(--color-surface-alt)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent),transparent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-sm" style="color:var(--color-accent)">02.</span>
          <h2 class="text-4xl md:text-5xl font-bold font-display" style="color:var(--color-on-alt)">Skills & Tools</h2>
          <div class="flex-1 h-px ml-4" style="background-color:var(--color-divider)"></div>
        </div>

        <div class="flex flex-wrap gap-3 mb-12">
          @for (cat of categories; track cat; let i = $index) {
            <button
              class="px-5 py-2 rounded-full text-sm font-medium border transition-all duration-300"
              [style]="activeTab() === i
                ? 'background-color:var(--color-accent);border-color:var(--color-accent);color:#0a0a0f'
                : 'background-color:transparent;border-color:var(--color-card-border);color:var(--color-on-alt)'"
              (click)="activeTab.set(i)">
              {{ cat }}
            </button>
          }
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="group p-5 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-default"
                 style="border-color:var(--color-card-border);background-color:var(--color-skill-card)"
                 onmouseover="this.style.borderColor='var(--color-accent)'"
                 onmouseout="this.style.borderColor='var(--color-card-border)'">
              <mat-icon class="mb-3" style="font-size:28px;width:28px;height:28px;color:var(--color-accent)">{{ skill.icon }}</mat-icon>
              <div class="text-sm font-semibold mb-2" style="color:var(--color-on-alt)">{{ skill.name }}</div>
              <div class="h-1 rounded-full overflow-hidden" style="background-color:var(--color-divider)">
                <div class="h-full rounded-full transition-all duration-1000" style="background-color:var(--color-accent)" [style.width]="skill.level + '%'"></div>
              </div>
              <div class="text-xs mt-1.5 font-mono" style="color:var(--color-accent)">{{ skill.level }}%</div>
            </div>
          }
        </div>

        <div class="mt-20 overflow-hidden border-t border-b py-6" style="border-color:var(--color-divider)">
          <div class="flex gap-12 animate-marquee whitespace-nowrap">
            @for (t of marqueeItems.concat(marqueeItems); track $index) {
              <span class="text-sm font-mono uppercase tracking-widest" style="color:var(--color-skill-text)">{{ t }}</span>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  activeTab = signal(0);
  categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Design'];

  allSkills = [
    { name: 'Angular',      icon: 'web',              level: 95, cat: 'Frontend' },
    { name: 'TypeScript',   icon: 'code',             level: 92, cat: 'Frontend' },
    { name: 'React',        icon: 'hub',              level: 85, cat: 'Frontend' },
    { name: 'Tailwind CSS', icon: 'style',            level: 90, cat: 'Frontend' },
    { name: 'Spring Boot',  icon: 'local_florist',    level: 90, cat: 'Backend'  },
    { name: 'Node.js',      icon: 'dns',              level: 88, cat: 'Backend'  },
    { name: 'Python',       icon: 'terminal',         level: 82, cat: 'Backend'  },
    { name: 'GraphQL',      icon: 'account_tree',     level: 80, cat: 'Backend'  },
    { name: 'PostgreSQL',   icon: 'storage',          level: 85, cat: 'Backend'  },
    { name: 'Docker',       icon: 'inventory_2',      level: 80, cat: 'DevOps'   },
    { name: 'Kubernetes',   icon: 'settings_suggest', level: 72, cat: 'DevOps'   },
    { name: 'AWS',          icon: 'cloud',            level: 78, cat: 'DevOps'   },
    { name: 'CI/CD',        icon: 'sync_alt',         level: 85, cat: 'DevOps'   },
    { name: 'Figma',        icon: 'design_services',  level: 88, cat: 'Design'   },
    { name: 'Motion',       icon: 'animation',        level: 82, cat: 'Design'   },
  ];

  get filteredSkills() {
    return () => {
      const tab = this.activeTab();
      if (tab === 0) return this.allSkills;
      return this.allSkills.filter(s => s.cat === this.categories[tab]);
    };
  }

  marqueeItems = [
    'Angular','React','TypeScript','Node.js','Python','GraphQL',
    'PostgreSQL','MongoDB','Redis','Docker','Kubernetes','AWS','GCP',
    'Figma','Tailwind','RxJS','NestJS','FastAPI','Storybook'
  ];
}
