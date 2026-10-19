# 🌟 Premium Multi-Model Rating & Feedback UI

A production-ready, highly interactive Feedback and Rating web page built with **Vanilla JavaScript, HTML5, and CSS3**. This project goes beyond basic star ratings by implementing multiple modern UX patterns, smooth animations, and a fully accessible, state-driven architecture.

## 🚀 Live Demo
👉 **https://vishal-maddheshiya.github.io/rating-page/**

## Github Link
👉 **https://vishal-maddheshiya.github.io/rating-page/**

---

## ✨ Key Features

This project implements **5 different rating models** to suit various user feedback scenarios, each with unique animations:

1. **Classic Star Rating (Ripple Effect):** Hover to preview, click to select. Features a material-design style ripple animation on click.
2. **Emoji Reactions (Floating Wave):** Emotional feedback with a floating wave animation when a reaction is selected.
3. **Heart Button (Particle Burst):** A "Love" button that triggers a physics-based particle burst animation using the Web Animations API.
4. **Fluid Slider (0-100 Scale):** A dynamic slider that changes color (Red -> Yellow -> Green) and updates its track gradient based on the value.
5. **NPS Scale (0-10):** A Net Promoter Score component with color-coded severity (Detractors, Passives, Promoters).

### Additional Technical Features:
- 🌗 **Dark / Light Mode Toggle:** Seamless theme switching using CSS Variables (`data-theme`).
- 🧊 **Glassmorphism UI:** Modern, premium card designs with backdrop blur and subtle shadows.
- ♿ **Accessibility (a11y) First:** Keyboard navigable, ARIA labels (`role="radiogroup"`, `aria-checked`), and `:focus-visible` states.
- 🔔 **Custom Toast Notifications:** Replaced boring `alert()` popups with custom, auto-dismissing toast messages.
- 📦 **Centralized State Management:** A pure JS `appState` object tracks all user inputs and compiles them into a JSON object for API submission.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic structure and ARIA attributes.
- **CSS3:** Flexbox, CSS Grid, Custom Variables (Theming), Keyframe Animations, Webkit Slider Styling.
- **Vanilla JavaScript (ES6+):** Object-oriented state management, Event Delegation, Web Animations API, DOM manipulation.

*(No external libraries or frameworks like React/Bootstrap were used, keeping the bundle size 0 KB).*

---

## 📂 Project Structure

```text
/rating-feedback-widget
│── index.html      # Main HTML structure
│── style.css       # All styling, themes, and animations
└── script.js       # App logic, state management, and interactions