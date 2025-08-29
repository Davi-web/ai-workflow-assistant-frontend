# 🎨 PR Dashboard — UI Design Spec

## 1. Navigation

- **Type:** Top bar (or optional left sidebar).
- **Elements:**
  - Project logo/name.
  - Links: `Dashboard` | `Metrics` | `Settings`.

---

## 2. Dashboard (PR List View)

- **Layout:** Grid of cards.
- **Controls:**
  - 🔍 Search bar (filter by keyword).
  - 📂 Dropdown filter: `Bug | Feature | Docs`.
  - 📅 Sort menu: `Newest | Oldest`.

### Example PR Card

> **🔖 [Feature] Add drag-and-drop support**  
> Summary: Enables drag-and-drop for the board.  
> **Changed:** `useBoard.ts`, `page.tsx`

- Title: bold, 1 line.
- Label: colored badge.
  - Feature → green
  - Bug → red
  - Docs → blue
- Summary: plain text, 1–2 sentences.
- Changes: inline list of filenames.

---

## 3. PR Details View

- **Layout:** Single page (opened by clicking PR card).
- **Sections:**
  - Title
  - Label
  - Commits (list of messages)
  - Changed Files (list)
  - Impact (affected system parts)
  - Action Required (instructions for reviewer)

---

## 4. Metrics Page (Optional)

- **Charts (using Recharts):**
  - 📈 Line chart: PRs per week
  - 🥧 Pie chart: Distribution by Label
  - 📊 Bar chart: Most frequently changed files

---

## 5. Styling Guidelines

- **Framework:** React + Tailwind + Shadcn UI
- **Font:** Inter (default Tailwind)
- **Colors:**
  - Background → `gray-50`
  - Card → `white`, shadow `md`, `rounded-2xl`, padding `p-4`
  - Label colors:
    - Feature → `bg-green-500 text-white px-2 py-1 rounded`
    - Bug → `bg-red-500 text-white px-2 py-1 rounded`
    - Docs → `bg-blue-500 text-white px-2 py-1 rounded`
- **Animation:**
  - Card hover → lift with shadow-xl (`transform scale-105`)
  - Smooth transitions with Framer Motion
