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
=======
# 🚀 PR Dashboard

A lightweight **Pull Request Dashboard** built with [Next.js 14](https://nextjs.org/), [React Query](https://tanstack.com/query/latest), [AWS DynamoDB](https://aws.amazon.com/dynamodb/), and [shadcn/ui](https://ui.shadcn.com/).  
It provides a simple way to **track, view, and refresh pull requests** across repositories in real time.

---

## ✨ Features

- 📊 **Dashboard View** – List all pull requests with repo, number, title, status, and labels.  
- 🔄 **Real-time Refresh** – Refresh PRs on demand with React Query.  
- 🎨 **Styled Tables** – Clean, accessible UI with [shadcn tables](https://ui.shadcn.com/docs/components/table).  
- 🌐 **Server + Client Components** – Server-side fetch from DynamoDB with client-side revalidation.  
- ⚡ **Typed Models** – Strong typing with TypeScript and reusable `IPullRequest` interface.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/docs/app)
- **Database:** [AWS DynamoDB](https://aws.amazon.com/dynamodb/)
- **Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Language:** TypeScript

---

## 📦 Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pr-dashboard.git
cd pr-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
DYNAMODB_TABLE_NAME=your-table-name
```

### 4. Run locally

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
app/
  page.tsx         // Server component, fetches PRs from DynamoDB
components/
  Dashboard.tsx    // Client dashboard, renders PR table
  DashboardHeader.tsx
lib/
  fetchPRs.ts      // Fetcher used by React Query
types/
  IPullRequest.ts  // PR TypeScript interface
```

---

## 🔄 Data Model

DynamoDB stores pull requests with the following schema:

```ts
export interface IPullRequest {
  pr_id: string;
  repo: string;
  pr_number: number;
  title: string;
  summary: string;
  changes: string[];
  impact: string;
  action_required: string;
  labels: string[];
  commit_messages: string[];
  created_at: string;
  updated_at: string;
  status: 'open' | 'closed' | 'merged' | 'draft';
  author: string;
  reviewers: string[];
}
```

---

## 🖥 Usage

- Open the dashboard to view all PRs.  
- Use the **Refresh button** to fetch the latest data from DynamoDB.  
- Labels are color-coded for quick scanning.  

---

## 🚀 Deployment

You can deploy this app to [Vercel](https://vercel.com/) or [AWS Amplify](https://aws.amazon.com/amplify/).  

Make sure to configure your **environment variables** in the hosting provider’s settings.

---

## 🤝 Contributing

1. Fork the repo  
2. Create a feature branch  
3. Commit changes  
4. Open a Pull Request 🎉  

---

## 📜 License

MIT License © 2025 Your Name
