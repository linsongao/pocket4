const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.progress span');
const glow = document.querySelector('.cursor-glow');
const reveals = document.querySelectorAll('.reveal');
const devices = document.querySelectorAll('[data-depth]');
const storyCards = document.querySelectorAll('.photo-card');
const storyCurrent = document.querySelector('.story-counter b');
const storyBar = document.querySelector('.story-counter span');
const closingImage = document.querySelector('.closing-image');
const hero = document.querySelector('.hero');
const manifesto = document.querySelector('.manifesto');
const futureDevice = document.querySelector('.future-device');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

reveals.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
  observer.observe(el);
});

const storyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const index = Number(entry.target.dataset.index);
    storyCards.forEach(card => card.classList.toggle('active', card === entry.target));
    storyCurrent.textContent = String(index).padStart(2, '0');
    storyBar.style.setProperty('--story-progress', `${index * 25}%`);
  });
}, { rootMargin: '-35% 0px -45% 0px', threshold: 0 });

storyCards.forEach(card => storyObserver.observe(card));

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  progress.style.width = `${ratio * 100}%`;

  if (!reducedMotion) {
    const heroProgress = Math.min(1, scrollY / innerHeight);
    if (hero) {
      hero.style.setProperty('--hero-drift', `${heroProgress * 120}px`);
      hero.querySelector('.hero-copy').style.transform = `translateY(${heroProgress * -55}px)`;
      hero.querySelector('.device-stage').style.opacity = String(1 - heroProgress * .58);
    }

    if (manifesto) {
      const rect = manifesto.getBoundingClientRect();
      const local = Math.max(-1, Math.min(1, rect.top / innerHeight));
      manifesto.style.setProperty('--manifesto-shift', `${local * 34}px`);
    }

    storyCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        const centerOffset = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
        card.style.setProperty('--image-y', `${centerOffset * -26}px`);
        card.style.setProperty('--image-scale', `${1.08 - Math.min(.04, Math.abs(centerOffset) * .04)}`);
      }
    });

    if (futureDevice) {
      const rect = futureDevice.getBoundingClientRect();
      if (rect.top < innerHeight && rect.bottom > 0) {
        futureDevice.style.setProperty('--future-turn', `${(rect.top / innerHeight) * 5}deg`);
      }
    }
  }

  if (!reducedMotion && closingImage) {
    const rect = closingImage.parentElement.getBoundingClientRect();
    if (rect.top < innerHeight && rect.bottom > 0) {
      closingImage.style.transform = `translateY(${rect.top * .055}px) scale(1.06)`;
    }
  }
}

function onPointerMove(event) {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;

  if (reducedMotion || scrollY > innerHeight * 1.05) return;
  const x = (event.clientX / innerWidth - .5);
  const y = (event.clientY / innerHeight - .5);
  devices.forEach(device => {
    const depth = Number(device.dataset.depth);
    const base = device.classList.contains('device-4') ? -5 : 5;
    const lift = device.classList.contains('device-4') ? 15 : -5;
    device.style.transform = `translate(${x * depth * 22}px, ${lift + y * depth * 16}px) rotate(${base + x * depth * 4}deg) ${device.classList.contains('device-4p') ? 'scale(1.06)' : ''}`;
  });
}

addEventListener('scroll', onScroll, { passive: true });
addEventListener('pointermove', onPointerMove, { passive: true });
addEventListener('load', () => document.body.classList.add('loaded'), { once: true });
onScroll();
