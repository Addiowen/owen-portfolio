import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  template: `
    <section id="contact" class="py-28 relative overflow-hidden" style="background-color:var(--color-paper)">
      <div class="absolute top-0 left-0 right-0 h-px" style="background:linear-gradient(90deg,transparent,var(--color-accent2),transparent)"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-[80px] pointer-events-none" style="background-color:var(--color-accent)"></div>

      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-sm" style="color:var(--color-accent)">05.</span>
          <h2 class="text-4xl md:text-5xl font-bold font-display" style="color:var(--color-ink)">Get In Touch</h2>
          <div class="flex-1 h-px ml-4" style="background-color:var(--color-border)"></div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 items-start">
          <!-- Left -->
          <div class="space-y-8">
            <div class="space-y-4">
              <p class="text-2xl font-medium leading-relaxed font-display" style="color:var(--color-ink)">
                Have a project in mind? Let's build something
                <em class="not-italic" style="color:var(--color-accent)">remarkable</em> together.
              </p>
              <p class="text-base leading-relaxed" style="color:var(--color-muted)">
                Whether you're a startup looking for a technical co-founder, an agency
                needing extra firepower, or a company with a complex problem to solve —
                I'd love to hear from you.
              </p>
            </div>

            <div class="space-y-4">
              @for (item of contactLinks; track item.label) {
                <a [href]="item.href" target="_blank"
                   class="group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                   style="border-color:var(--color-border)"
                   onmouseover="this.style.borderColor='var(--color-accent)'"
                   onmouseout="this.style.borderColor='var(--color-border)'">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background-color:rgba(200,169,110,0.15)">
                    <mat-icon style="font-size:20px;width:20px;height:20px;color:var(--color-accent)">{{ item.icon }}</mat-icon>
                  </div>
                  <div>
                    <div class="text-xs font-mono uppercase tracking-widest" style="color:var(--color-muted)">{{ item.label }}</div>
                    <div class="text-sm font-medium mt-0.5" style="color:var(--color-ink)">{{ item.value }}</div>
                  </div>
                  <mat-icon class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style="font-size:16px;width:16px;height:16px;color:var(--color-muted)">open_in_new</mat-icon>
                </a>
              }
            </div>
          </div>

          <!-- Form -->
          <div class="p-8 rounded-3xl border shadow-sm" style="border-color:var(--color-border);background-color:var(--color-surface)">
            @if (!sent()) {
              <form class="space-y-5" (ngSubmit)="handleSubmit()">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-mono uppercase tracking-widest block mb-2" style="color:var(--color-muted)">Name</label>
                    <input type="text" placeholder="John Doe" required [(ngModel)]="form.name" name="name"
                           class="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                           style="border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-ink)"
                           onfocus="this.style.borderColor='var(--color-accent)'"
                           onblur="this.style.borderColor='var(--color-border)'">
                  </div>
                  <div>
                    <label class="text-xs font-mono uppercase tracking-widest block mb-2" style="color:var(--color-muted)">Email</label>
                    <input type="email" placeholder="john@example.com" required [(ngModel)]="form.email" name="email"
                           class="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                           style="border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-ink)"
                           onfocus="this.style.borderColor='var(--color-accent)'"
                           onblur="this.style.borderColor='var(--color-border)'">
                  </div>
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-widest block mb-2" style="color:var(--color-muted)">Subject</label>
                  <input type="text" placeholder="Project Inquiry" required [(ngModel)]="form.subject" name="subject"
                         class="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                         style="border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-ink)"
                         onfocus="this.style.borderColor='var(--color-accent)'"
                         onblur="this.style.borderColor='var(--color-border)'">
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-widest block mb-2" style="color:var(--color-muted)">Budget (optional)</label>
                  <select [(ngModel)]="form.budget" name="budget"
                          class="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                          style="border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-muted)">
                    <option>Select budget range</option>
                    <option>Under KSh 50,000</option>
                    <option>KSh 50,000 – KSh 150,000</option>
                    <option>KSh 150,000 – KSh 500,000</option>
                    <option>KSh 500,000 – KSh 1,000,000</option>
                    <option>KSh 1,000,000+</option>
                  </select>
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-widest block mb-2" style="color:var(--color-muted)">Message</label>
                  <textarea rows="4" placeholder="Tell me about your project..." required [(ngModel)]="form.message" name="message"
                            class="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                            style="border-color:var(--color-border);background-color:var(--color-paper);color:var(--color-ink)"
                            onfocus="this.style.borderColor='var(--color-accent)'"
                            onblur="this.style.borderColor='var(--color-border)'"></textarea>
                </div>

                @if (error()) {
                  <p class="text-sm text-red-500 flex items-center gap-2">
                    <mat-icon style="font-size:16px;width:16px;height:16px;">error</mat-icon>
                    {{ error() }}
                  </p>
                }

                <button type="submit" [disabled]="loading()"
                        class="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        style="background-color:var(--color-ink);color:var(--color-paper)">
                  @if (loading()) {
                    <mat-icon class="animate-spin" style="font-size:16px;width:16px;height:16px;">refresh</mat-icon>
                    Sending...
                  } @else {
                    Send Message
                    <mat-icon style="font-size:16px;width:16px;height:16px;">send</mat-icon>
                  }
                </button>
              </form>
            } @else {
              <div class="flex flex-col items-center justify-center py-16 text-center space-y-4">
                <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <mat-icon class="text-green-500" style="font-size:36px;width:36px;height:36px;">check_circle</mat-icon>
                </div>
                <h3 class="text-2xl font-bold font-display" style="color:var(--color-ink)">Message Sent!</h3>
                <p class="text-sm" style="color:var(--color-muted)">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button (click)="sent.set(false)" class="mt-4 text-sm underline" style="color:var(--color-accent)">Send another</button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  sent    = signal(false);
  loading = signal(false);
  error   = signal('');

  form = { name: '', email: '', subject: '', budget: 'Select budget range', message: '' };

  contactLinks = [
    { icon: 'email', label: 'Email',    value: 'owenoscar18@gmail.com',    href: 'mailto:owenoscar18@gmail.com' },
    { icon: 'work',  label: 'LinkedIn', value: 'linkedin.com/in/owen-oscar', href: 'https://www.linkedin.com/in/owen-oscar-699182330/' },
    { icon: 'code',  label: 'GitHub',   value: 'github.com/Addiowen',       href: 'https://github.com/Addiowen' },
    { icon: 'phone', label: 'Phone',    value: '+254 768 262 121',           href: 'tel:+254768262121' },
  ];

  async handleSubmit() {
    this.loading.set(true);
    this.error.set('');
    try {
      await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
        from_name:  this.form.name,
        from_email: this.form.email,
        subject:    this.form.subject,
        budget:     this.form.budget,
        message:    this.form.message,
        to_email:   'owenoscar18@gmail.com',
      }, 'PUBLIC_KEY');
      this.sent.set(true);
      this.form = { name: '', email: '', subject: '', budget: 'Select budget range', message: '' };
    } catch (err) {
      this.error.set('Something went wrong. Please try again or email me directly.');
    } finally {
      this.loading.set(false);
    }
  }
}
