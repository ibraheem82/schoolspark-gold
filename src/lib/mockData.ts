export type Role = "admin" | "teacher" | "student" | "parent";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  phone?: string;
  status: "active" | "inactive";
  lastLogin?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  classId: string;
  className: string;
  section: string;
  rollNo: string;
  bloodGroup: string;
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  motherName: string;
  guardian?: string;
  emergencyContact: string;
  medicalConditions?: string;
  allergies?: string;
  transportMode: "School Bus" | "Private" | "Walking";
  busRoute?: string;
  status: "active" | "inactive" | "suspended";
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  designation: string;
  department: string;
  qualification: string;
  specialization: string;
  experience: number;
  joiningDate: string;
  salary: number;
  teacherType: "Full-time" | "Part-time" | "Contract";
  status: "active" | "inactive";
  email: string;
  phone: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  code: string;
  section: string;
  academicYear: string;
  grade: number;
  capacity: number;
  currentStrength: number;
  classTeacher: string;
  classroom: string;
  status: "active" | "inactive";
}

export interface Attendance {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  className: string;
  status: "present" | "absent" | "late" | "excused" | "half-day";
  remarks?: string;
  markedBy: string;
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  exam: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  gradePoint: number;
  remarks?: string;
}

export interface Fee {
  id: string;
  studentId: string;
  studentName: string;
  type: string;
  amount: number;
  discount: number;
  fine: number;
  paid: number;
  balance: number;
  status: "paid" | "partial" | "pending" | "overdue" | "waived";
  dueDate: string;
  academicYear: string;
  term: string;
  receiptNo?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: "general" | "academic" | "emergency";
  priority: "urgent" | "high" | "medium" | "low";
  targetAudience: string;
  targetClass?: string;
  isImportant: boolean;
  expiresAt?: string;
  publishedAt?: string;
  status: "published" | "draft";
}

// ============ MOCK DATA ============

export const classes: SchoolClass[] = [
  { id: "c1", name: "JSS 1A", code: "JS1A", section: "A", academicYear: "2025/2026", grade: 7, capacity: 40, currentStrength: 36, classTeacher: "Mrs. Adaeze Okonkwo", classroom: "Block A - Room 101", status: "active" },
  { id: "c2", name: "JSS 2A", code: "JS2A", section: "A", academicYear: "2025/2026", grade: 8, capacity: 40, currentStrength: 38, classTeacher: "Mr. Tunde Bakare", classroom: "Block A - Room 102", status: "active" },
  { id: "c3", name: "JSS 3A", code: "JS3A", section: "A", academicYear: "2025/2026", grade: 9, capacity: 40, currentStrength: 32, classTeacher: "Ms. Ifeoma Nwosu", classroom: "Block A - Room 103", status: "active" },
  { id: "c4", name: "SSS 1B", code: "SS1B", section: "B", academicYear: "2025/2026", grade: 10, capacity: 35, currentStrength: 30, classTeacher: "Mr. Femi Adeyemi", classroom: "Block B - Room 201", status: "active" },
  { id: "c5", name: "SSS 2A", code: "SS2A", section: "A", academicYear: "2025/2026", grade: 11, capacity: 35, currentStrength: 34, classTeacher: "Mrs. Chioma Eze", classroom: "Block B - Room 202", status: "active" },
  { id: "c6", name: "SSS 3A", code: "SS3A", section: "A", academicYear: "2025/2026", grade: 12, capacity: 30, currentStrength: 28, classTeacher: "Dr. Ngozi Obi", classroom: "Block B - Room 301", status: "active" },
];

const firstNames = ["Adaeze", "Chinedu", "Ifeoma", "Tunde", "Yusuf", "Aisha", "Emeka", "Ngozi", "Kemi", "Bola", "Chiamaka", "Olumide", "Funke", "Segun", "Zainab", "Obinna", "Folake", "Ibrahim", "Halima", "Uche", "Chidinma", "Bayo", "Hauwa", "Damilola"];
const lastNames = ["Okonkwo", "Bakare", "Adeyemi", "Eze", "Obi", "Nwosu", "Adebayo", "Ibrahim", "Afolabi", "Okafor", "Nnamdi", "Oluwaseun", "Yakubu", "Olawale", "Mohammed", "Chukwu", "Balogun", "Ojo", "Aminu"];
const subjects = ["Mathematics", "English Language", "Physics", "Chemistry", "Biology", "Geography", "History", "Civic Education", "Literature", "Economics"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }

export const students: Student[] = Array.from({ length: 28 }, (_, i) => {
  const cls = pick(classes, i);
  const fn = pick(firstNames, i * 3);
  const ln = pick(lastNames, i * 5);
  return {
    id: `s${i + 1}`,
    firstName: fn,
    lastName: ln,
    admissionNo: `ADM/2025/${String(1000 + i).padStart(4, "0")}`,
    classId: cls.id,
    className: cls.name,
    section: cls.section,
    rollNo: String(i + 1).padStart(2, "0"),
    bloodGroup: pick(["O+", "A+", "B+", "AB+", "O-"], i),
    fatherName: `Mr. ${pick(firstNames, i + 1)} ${ln}`,
    fatherOccupation: pick(["Engineer", "Doctor", "Trader", "Civil Servant", "Lawyer", "Teacher"], i),
    fatherPhone: `+234 80${String(10000000 + i * 37).slice(0, 8)}`,
    motherName: `Mrs. ${pick(firstNames, i + 2)} ${ln}`,
    emergencyContact: `+234 70${String(20000000 + i * 41).slice(0, 8)}`,
    transportMode: pick(["School Bus", "Private", "Walking"] as const, i),
    busRoute: i % 3 === 0 ? `Route ${(i % 5) + 1} - Lekki/Ajah` : undefined,
    status: i % 11 === 0 ? "inactive" : i % 17 === 0 ? "suspended" : "active",
  };
});

export const teachers: Teacher[] = Array.from({ length: 12 }, (_, i) => {
  const fn = pick(firstNames, i * 2 + 1);
  const ln = pick(lastNames, i * 3 + 2);
  return {
    id: `t${i + 1}`,
    firstName: fn,
    lastName: ln,
    employeeId: `EMP/2024/${String(100 + i).padStart(3, "0")}`,
    designation: pick(["Senior Teacher", "Head of Department", "Subject Teacher", "Vice Principal"], i),
    department: pick(["Sciences", "Languages", "Arts", "Mathematics", "Social Sciences"], i),
    qualification: pick(["B.Ed", "M.Ed", "B.Sc + PGDE", "M.Sc + PGDE", "Ph.D"], i),
    specialization: pick(subjects, i),
    experience: 2 + (i % 18),
    joiningDate: `20${15 + (i % 10)}-${String(1 + (i % 12)).padStart(2, "0")}-15`,
    salary: 180000 + i * 25000,
    teacherType: pick(["Full-time", "Part-time", "Contract"] as const, i),
    status: "active",
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@schoolsync.edu`,
    phone: `+234 81${String(30000000 + i * 53).slice(0, 8)}`,
  };
});

const today = new Date();
function dateOffset(d: number): string {
  const x = new Date(today); x.setDate(x.getDate() - d); return x.toISOString().slice(0, 10);
}

export const attendance: Attendance[] = students.slice(0, 20).flatMap((s, si) =>
  Array.from({ length: 5 }, (_, di) => ({
    id: `a${si}-${di}`,
    date: dateOffset(di),
    studentId: s.id,
    studentName: `${s.firstName} ${s.lastName}`,
    className: s.className,
    status: (["present", "present", "present", "late", "absent"] as const)[(si + di) % 5],
    remarks: (si + di) % 7 === 0 ? "Doctor's appointment" : undefined,
    markedBy: "Mrs. Adaeze Okonkwo",
  }))
);

function gradeFor(pct: number): { grade: string; gp: number } {
  if (pct >= 90) return { grade: "A+", gp: 4.0 };
  if (pct >= 80) return { grade: "A", gp: 3.7 };
  if (pct >= 70) return { grade: "B", gp: 3.3 };
  if (pct >= 60) return { grade: "C", gp: 2.7 };
  if (pct >= 50) return { grade: "D", gp: 2.0 };
  if (pct >= 40) return { grade: "E", gp: 1.0 };
  return { grade: "F", gp: 0 };
}

export const grades: Grade[] = students.slice(0, 15).flatMap((s, si) =>
  subjects.slice(0, 5).map((sub, gi) => {
    const marks = 45 + ((si * 7 + gi * 13) % 50);
    const total = 100;
    const pct = (marks / total) * 100;
    const g = gradeFor(pct);
    return {
      id: `g${si}-${gi}`,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      subject: sub,
      exam: "First Term Examination",
      marksObtained: marks,
      totalMarks: total,
      grade: g.grade,
      gradePoint: g.gp,
    };
  })
);

export const fees: Fee[] = students.slice(0, 22).map((s, i) => {
  const amount = 150000 + (i % 4) * 25000;
  const paid = i % 4 === 0 ? 0 : i % 4 === 1 ? amount / 2 : amount;
  const balance = amount - paid;
  const status: Fee["status"] = paid === 0 ? (i % 5 === 0 ? "overdue" : "pending") : balance === 0 ? "paid" : "partial";
  return {
    id: `f${i + 1}`,
    studentId: s.id,
    studentName: `${s.firstName} ${s.lastName}`,
    type: pick(["Tuition Fee – Term 1 2026", "Examination Fee", "Sports Levy", "Books & Uniform"], i),
    amount,
    discount: i % 6 === 0 ? 5000 : 0,
    fine: status === "overdue" ? 2500 : 0,
    paid,
    balance,
    status,
    dueDate: dateOffset(-7 + (i % 30)),
    academicYear: "2025/2026",
    term: "First Term",
    receiptNo: paid > 0 ? `RCP-2026-${String(2000 + i).padStart(5, "0")}` : undefined,
  };
});

export const announcements: Announcement[] = [
  { id: "an1", title: "Mid-term Break Schedule Released", content: "The mid-term break will run from Oct 20 to Oct 27. All students should resume on Monday Oct 28 by 7:30 AM.", type: "general", priority: "medium", targetAudience: "All", isImportant: true, publishedAt: dateOffset(2), status: "published" },
  { id: "an2", title: "First Term Examination Timetable", content: "Examinations begin Nov 18. Please collect your timetable from the academic office or download from the parent portal.", type: "academic", priority: "high", targetAudience: "Students & Parents", isImportant: true, publishedAt: dateOffset(5), status: "published" },
  { id: "an3", title: "Fire Drill — Friday at 10:00 AM", content: "A mandatory fire drill will take place this Friday. Teachers should guide students to assembly points as practiced.", type: "emergency", priority: "urgent", targetAudience: "All Staff & Students", isImportant: true, publishedAt: dateOffset(1), status: "published" },
  { id: "an4", title: "PTA Meeting — Saturday 10 AM", content: "Parents are invited to the term's PTA meeting in the main auditorium.", type: "general", priority: "medium", targetAudience: "Parents", isImportant: false, publishedAt: dateOffset(7), status: "published" },
  { id: "an5", title: "Inter-house Sports Postponed", content: "Due to weather, the inter-house sports event has been moved to next Saturday.", type: "general", priority: "low", targetAudience: "All", isImportant: false, status: "draft" },
];

export const currentUser: User = {
  id: "u1",
  email: "admin@schoolsync.edu",
  firstName: "Adaeze",
  lastName: "Okonkwo",
  role: "admin",
  phone: "+234 803 444 1212",
  status: "active",
  lastLogin: new Date().toISOString(),
  createdAt: "2024-01-15T08:00:00Z",
};

export const stats = {
  totalStudents: students.length,
  totalTeachers: teachers.length,
  activeClasses: classes.filter((c) => c.status === "active").length,
  feesCollected: fees.reduce((s, f) => s + f.paid, 0),
  feesPending: fees.reduce((s, f) => s + f.balance, 0),
};