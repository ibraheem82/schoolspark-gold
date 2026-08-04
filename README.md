# SchoolSync Pro

Lovable Prompt — School Management System

PROJECT BRIEF

Build a full School Management System web application with a stunning landing page and a complete dashboard interface. The application must feel premium, trustworthy, and modern — like a product a serious institution would proudly use.

DESIGN SYSTEM

Color Palette

Primary Blue:     #1877F2   (Facebook Blue — primary actions, nav, CTAs)
Deep Navy:        #0A3D7A   (headers, sidebar, trust anchors)
Gold Accent:      #F0A500   (highlights, badges, active states, premium feel)
Warm Gold Light:  #FFC947   (hover states, shimmer effects, secondary gold)
Surface White:    #FFFFFF   (cards, modals, content areas)
Background Gray:  #F0F4FA   (page background, subtle sections)
Text Primary:     #1A1D23   (headings, body text)
Text Muted:       #6B7280   (labels, captions, secondary text)
Border:           #E2E8F0   (dividers, card borders)
Success:          #16A34A
Warning:          #D97706
Error:            #DC2626


Typography

Display / Hero Headlines: Inter — 700–800 weight, tight letter-spacing (-0.02em)

Body & UI Text: Inter — 400–500 weight, comfortable 1.6 line height

Data / Monospace (IDs, codes): JetBrains Mono — for admission numbers, IDs, receipt numbers

Type Scale

Hero H1:   56px / 700 / -0.03em
Page H2:   36px / 700 / -0.02em
Section H3: 24px / 600 / -0.01em
Card H4:   18px / 600 / 0
Body:      16px / 400 / 1.6
Small:     13px / 500 / 0.01em
Label:     11px / 700 / 0.08em  (uppercase)


Signature Design Element

The gold accent stripe — a 3px horizontal gold line (#F0A500) appears under active nav items, section headings, and as a left border on selected sidebar items. This creates a consistent visual language tying the blue structure to the gold highlight system across every page.

APPLICATION STRUCTURE

1. LANDING PAGE (Public — No Auth Required)

Build a complete, multi-section marketing landing page:

Hero Section

Full-width section with deep navy (#0A3D7A) to primary blue (#1877F2) diagonal gradient background

Bold headline: "Manage Your School Smarter" in white, 56px, Inter 800

Subheadline: "The all-in-one platform for student records, attendance, grades, fees, and communication — built for modern educational institutions."

Two CTA buttons:

Primary: "Get Started Free" — solid gold (#F0A500), dark text, rounded-lg, shadow-lg

Secondary: "See How It Works" — white outline, white text

Floating dashboard mockup screenshot/illustration positioned to the right (use a clean SVG illustration of a dashboard card cluster)

Subtle animated particles or grid lines in the hero background for depth

Stats Bar (below hero)

White card strip with 4 key stats separated by gold dividers:

50,000+ Students Managed

2,000+ Schools Trust Us

99.9% Uptime Guaranteed

4.9★ Average Rating

Numbers in Primary Blue, labels in muted gray

Features Section

Section title: "Everything Your School Needs" — centered, H2, Primary Blue

Gold underline accent (3px, 60px wide, centered) beneath the title

6-card grid (3×2 on desktop, 1 col on mobile):

🎓 Student Management — Admissions, profiles, parent info, medical records

👩‍🏫 Teacher Management — Staff records, designations, qualifications, payroll info

🏫 Class & Timetable — Class setup, academic years, capacity tracking

📋 Attendance Tracking — Daily mark, bulk entry, percentage summaries

📊 Grades & GPA — Auto-calculated grades, GPA, exam records

💰 Fee Management — Invoicing, payments, receipts, overdue tracking

Each card: white background, subtle shadow, gold icon accent, left gold border on hover, 8px border radius

How It Works Section

Dark navy background (#0A3D7A) — white text

4-step horizontal flow (desktop) / vertical (mobile):

Register & Verify — Create your institution account

Set Up Classes — Configure academic year and classes

Add Students & Teachers — Import or create profiles

Start Managing — Attendance, grades, fees in real time

Steps connected by a gold dashed line on desktop

Step numbers in large gold (#F0A500), bold

Announcements Preview

Light gray background (#F0F4FA)

Show 3 sample announcement cards with type badges (General, Academic, Emergency)

Emergency badge: red. Academic: Primary Blue. General: Gold.

Roles & Permissions Section

4 role cards side by side: Admin, Teacher, Student, Parent

Each card shows what the role can access using checkmarks (gold ✓) and locks (gray 🔒)

Admin card has a gold border to mark it as most powerful

CTA Banner

Full-width, Primary Blue background

Headline: "Ready to transform how your school operates?"

Single gold CTA button: "Create Free Account"

Footer

Dark navy (#0A3D7A) background, white text

4 columns: Logo + tagline | Product links | Support | Contact

Social icons (placeholder)

Bottom bar: "© 2026 SchoolSync. Built for educators, by educators."

Thin gold line separating footer from main content

2. AUTH PAGES

/login — Login Page

Split layout: left = navy/gold branded panel with school illustration, right = white form panel

Left panel: dark navy bg, large gold logo mark, quote or tagline

Right panel: clean white, centered form

Email field

Password field with show/hide toggle

"Forgot Password?" link in Primary Blue

"Login" button — solid Primary Blue, full width

Divider line: "Don't have an account?"

"Register" link

Error state: red border + error message below field

Account lockout warning banner (after 5 failed attempts)

/register — Register Page

Same split layout as login

Form fields: First Name, Last Name, Email, Password, Role (dropdown: Admin / Teacher / Student / Parent), Phone (optional)

Password strength indicator bar (red → yellow → green) below password field

"Create Account" button — solid Primary Blue

After submit: show a blue banner: "Check your email to verify your account before logging in."

/forgot-password and /reset-password

Minimal centered card layout, white card on light gray background

Clear instructions, gold accent on submit button

/verify-email

Large centered success state with animated gold checkmark icon

Message: "Your email has been verified! You can now log in."

Blue "Go to Login" button

3. AUTHENTICATED DASHBOARD SHELL

After login, render a full dashboard layout with:

Sidebar Navigation

Width: 260px, collapsible to 72px icon-only on mobile

Background: Deep Navy (#0A3D7A)

Top: School logo + "SchoolSync" wordmark in white

Navigation items (icon + label):

🏠 Dashboard (Overview)

👨‍🎓 Students

👩‍🏫 Teachers

🏫 Classes

📋 Attendance

📊 Grades

💰 Fees

📣 Announcements

⚙️ Settings (Profile)

Active item: gold left border (3px), gold icon, light gold tint background (rgba(240,165,0,0.12))

Inactive items: white/70 text on hover

Bottom: user avatar + name + role chip + logout button

Top Header Bar

White background, 1px bottom border (#E2E8F0)

Left: Page title (H3, dark text)

Right: notification bell icon, avatar with dropdown (Profile, Change Password, Logout)

Notification badge: gold circle with count

Main Content Area

Background: #F0F4FA

Padding: 24px

Responsive grid layout

4. DASHBOARD OVERVIEW PAGE (/dashboard)

Role-aware: admins see full stats, teachers see limited view.

Stats Cards Row (4 cards)

Total Students — Primary Blue card, white text, student icon

Total Teachers — Gold card (#F0A500), dark text, teacher icon

Active Classes — Deep Navy card, white text, class icon

Fees Collected — White card, green amount text, wallet icon

Each card: rounded-xl, shadow-md, stat number in large bold, label in small text below

Quick Actions Row

4 ghost/outline buttons with icons: "+ Add Student", "+ Add Teacher", "Mark Attendance", "Create Announcement"

Charts Row (2 columns)

Left: Attendance Overview — bar chart (Present / Absent / Late) by week — use recharts or chart.js

Right: Fee Collection Summary — donut chart (Collected vs Pending vs Overdue)

Recent Announcements (mini list)

Last 3 published announcements

Type badge + title + date

"View All" link in Primary Blue

5. STUDENTS MODULE (/students)

Students List Page

Page header: "Students" title + "+ Add Student" button (Primary Blue, right-aligned)

Filter bar: Search input, Class filter dropdown, Status filter dropdown

Data table:

Columns: Avatar+Name, Admission No., Class, Section, Roll No., Father's Name, Status, Actions

Status badge: Active = green, Inactive = gray, Suspended = red

Actions: View (eye icon), Edit (pencil icon), Delete (trash icon, red on hover)

Row hover: light blue tint (rgba(24,119,242,0.06))

Pagination bar at bottom: page number buttons, items-per-page dropdown

Add/Edit Student Drawer or Modal

Slide-in drawer from right (600px wide) OR centered full modal

Tabbed form sections:

Basic Info — Admission Number, Date, Class, Section, Roll Number, Blood Group

Family Info — Father Name/Occupation/Phone, Mother Name/Occupation/Phone, Guardian

Medical & Emergency — Medical Conditions, Allergies, Emergency Contact

Transport — Transport Mode, Bus Route

Save button: solid Primary Blue. Cancel: outline gray.

Validation errors shown inline under each field in red

Student Detail Page (/students/:id)

Header card: large avatar placeholder (initials-based, gold background), name, admission number, class badge, status badge

Tabs: Overview | Attendance | Grades | Fees

Overview tab: two-column info grid (all student fields displayed)

Attendance tab: summary stats cards + recent records table

Grades tab: grade table + GPA card (large GPA number in Primary Blue)

Fees tab: fee records table with status badges + payment history

6. TEACHERS MODULE (/teachers)

Same list/table/drawer pattern as Students

Table columns: Avatar+Name, Employee ID, Designation, Department, Qualification, Joining Date, Status, Actions

Add/Edit form fields: userId (select from users), Employee ID, Designation, Department, Qualification dropdown, Specialization, Experience (years), Joining Date, Salary, Teacher Type dropdown, Bank details (collapsible section), Emergency Contact, Bio

7. CLASSES MODULE (/classes)

Card grid layout (not table) — each class shown as a card:

Class name large (e.g. "Grade 6A"), code badge, academic year

Capacity bar: colored progress bar (gold fill, gray track) showing currentStrength / capacity

Class teacher name

Status badge

Actions: Edit, Delete, View Students

Add/Edit Class modal:

Name, Code, Section, Academic Year, Grade, Capacity, Class Teacher (dropdown), Classroom, Status

8. ATTENDANCE MODULE (/attendance)

Mark Attendance Page

Class selector dropdown at top

Date picker (defaults to today)

Student roster table: Name | Roll No. | Status (radio buttons: Present / Absent / Late / Excused / Half Day) | Remarks

"Save All" button — solid gold, saves bulk attendance

Color-coded rows: Present = light green tint, Absent = light red tint, Late = light yellow tint

Attendance History

Filter by Student or Class

Date range picker

Results table: Date | Student | Status | Remarks | Marked By

Attendance Summary

Per-student summary card with circular percentage gauge (blue stroke, gold fill at threshold)

9. GRADES MODULE (/grades)

Add Grade form: Student (searchable dropdown), Subject, Exam, Marks Obtained / Total Marks, Remarks

Auto-display calculated grade and grade point after marks entered (live preview)

Grading scale reference tooltip or sidebar: A+ (90%+) down to F (<40%), color-coded

Student grades view: table with columns — Subject | Exam | Marks | Percentage | Grade | Grade Point

GPA display: large bold number, "out of 4.0" label, color: green if ≥3.0, gold if 2.0–2.9, red if <2.0

10. FEES MODULE (/fees)

Fee Records List (Admin)

Summary cards at top: Total Collected (green), Total Pending (gold), Total Overdue (red), Paid Count

Table: Student | Type | Amount | Paid | Balance | Status | Due Date | Actions

Status badges: Paid = green, Partial = blue, Pending = gold, Overdue = red, Waived = gray

"+ Create Fee" button

Create Fee Modal

Student search, Fee Type dropdown, Amount, Discount, Fine, Due Date, Academic Year, Term

Record Payment Slide-over

Fee summary at top (read-only)

Payment amount input, Payment Mode dropdown, Transaction ID

"Record Payment" — gold button

Auto-shows new balance after payment amount entered

Student Fee Page (student view)

Their own fees only, with payment status and receipt numbers (monospace font for receipt numbers)

11. ANNOUNCEMENTS MODULE (/announcements)

Announcements List

Two tabs: Published | Drafts

Card-based layout (not table):

Type badge (color-coded) + Priority badge (Urgent = red, High = orange, Medium = gold, Low = gray)

Title (H4), content excerpt, expiry date if set

"Important" star icon (gold) for isImportant=true

Actions: Publish (if draft), Edit, Delete

"+ New Announcement" button

Create/Edit Announcement Drawer

Title, Content (rich textarea), Type dropdown, Priority dropdown, Target Audience, Target Class (optional), Expires At (optional), Is Important toggle

"Save Draft" (outline) + "Publish Now" (solid Primary Blue) button pair

12. PROFILE / SETTINGS PAGE (/settings)

Two-column layout: sidebar nav (Personal Info | Change Password | Account) + content panel

Profile section: avatar upload placeholder (initials circle, gold bg), editable fields (First Name, Last Name, Phone, Address)

Change Password section: Current Password, New Password (with strength meter), Confirm Password

Account section: read-only email, role badge, status badge, last login time, member since

API INTEGRATION

Base URL: http://localhost:3000/api

Set up an Axios instance at src/lib/api.ts:

Attach Authorization: Bearer <accessToken> from localStorage on every request

On 401 response, attempt token refresh via POST /auth/refresh-token using stored refreshToken

On refresh failure, clear tokens and redirect to /login

All endpoints follow the response format: { success, message, data, meta, timestamp }

Create service files under src/services/:

authService.ts — login, register, logout, refresh, profile, change-password, forgot-password, reset-password

studentService.ts — CRUD, list (paginated), by-class, statistics

teacherService.ts — CRUD, list

classService.ts — CRUD, list

attendanceService.ts — mark single, bulk, student history, class attendance, summary

gradeService.ts — add grade, student grades, exam grades, GPA

feeService.ts — create, pay, student fees, overdue, summary

announcementService.ts — create, publish, list, get, update, delete

Use React Context + useState/useReducer for auth state. Store accessToken and refreshToken in localStorage.

ROLE-BASED UI

Conditionally render UI elements based on the logged-in user's role:

UI Element Admin Teacher Student Sidebar: Students ✅ Full ✅ Read-only ❌ Hidden Sidebar: Teachers ✅ Full ❌ Hidden ❌ Hidden Sidebar: Classes ✅ Full ✅ Read-only ❌ Hidden "+ Add" buttons ✅ ❌ ❌ Edit/Delete buttons ✅ ❌ ❌ Fees: Overdue/Summary ✅ ❌ Own fees only Announcements ✅ Full ✅ Full ✅ View only

Show a 403 Forbidden page (illustration + "You don't have access to this page" + go back button) when a user navigates to an unauthorized route.

UX PATTERNS & MICRO-INTERACTIONS

Toast notifications (top-right, auto-dismiss 4s): success (green), error (red), info (blue), warning (gold)

Loading states: skeleton loaders (not spinners) for tables and cards — use gray shimmer animation

Empty states: centered illustration SVG + descriptive message + action button (e.g., "No students yet — Add your first student")

Confirmation dialogs: red-accented modal for destructive actions (Delete) with "This cannot be undone" warning

Search: debounced 300ms input on all searchable lists

Pagination: numbered page buttons, Previous/Next, items-per-page selector (10, 20, 50)

Table sorting: clickable column headers with up/down arrow indicators

RESPONSIVE BREAKPOINTS

Mobile (< 768px): Single column, sidebar becomes bottom nav bar or hamburger drawer

Tablet (768–1024px): Sidebar collapses to icon-only (72px)

Desktop (> 1024px): Full sidebar (260px) + main content

TECH STACK (React)

Framework: React 18 + TypeScript

Styling: Tailwind CSS (use exact hex values above via CSS variables or Tailwind config extension)

Routing: React Router v6

State: React Context API + useState/useReducer

HTTP: Axios with interceptors

Charts: Recharts (for dashboard charts)

Icons: Lucide React

Forms: Controlled components with inline validation

Notifications: Custom toast component

IMPORTANT DESIGN NOTES

Gold is an accent, not a background — use gold for CTAs on dark backgrounds, active states, badges, borders, and icons. Never fill large sections with gold.

Blue is the primary structure — navigation, primary buttons, links, and hero sections use Primary Blue (#1877F2) or Deep Navy (#0A3D7A).

White and light gray are the workspace — content areas, cards, and forms stay clean and white/light so the blue + gold system pops.

Consistency in badges — every status, type, and role across the app uses the same badge color system. Define it once, reuse everywhere.

The landing page must feel like a SaaS product homepage, not a form — it should make someone want to sign up immediately.

No generic lorem ipsum — use realistic school-themed copy throughout (student names like "Adaeze Okonkwo", subjects like "Mathematics", classes like "JSS 2A", fees like "Tuition Fee – Term 1 2026").

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ec611ef8-ad87-47d0-aba1-251eac788b72).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
