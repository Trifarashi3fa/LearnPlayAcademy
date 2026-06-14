import { Button } from "@/components/Button";
import { DashboardCard } from "@/components/DashboardCard";

export type StudentProfileSummary = {
  studentName: string | null;
  age: number | null;
  gradeLevel: string | null;
  favoriteSubject: string | null;
};

type StudentProfileFormProps = {
  profile: StudentProfileSummary;
  action: (formData: FormData) => Promise<void>;
};

const gradeOptions = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
const subjectOptions = [
  "Mathematics",
  "English",
  "Science",
  "Critical Thinking",
  "Life Skills",
];

export function StudentProfileForm({ profile, action }: StudentProfileFormProps) {
  return (
    <DashboardCard title="Student Profile" tone="white">
      <form action={action} className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-ink">
          Student name
          <input
            name="student_name"
            defaultValue={profile.studentName ?? ""}
            placeholder="Example: Aisyah"
            className="min-h-12 rounded-2xl border border-ink/10 bg-cloud px-4 text-base font-bold outline-none focus:border-sky"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Age
          <input
            name="age"
            type="number"
            min="5"
            max="18"
            defaultValue={profile.age ?? ""}
            placeholder="Example: 9"
            className="min-h-12 rounded-2xl border border-ink/10 bg-cloud px-4 text-base font-bold outline-none focus:border-sky"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Grade level
          <select
            name="grade_level"
            defaultValue={profile.gradeLevel ?? ""}
            className="min-h-12 rounded-2xl border border-ink/10 bg-cloud px-4 text-base font-bold outline-none focus:border-sky"
          >
            <option value="">Choose grade</option>
            {gradeOptions.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-ink">
          Favorite subject
          <select
            name="favorite_subject"
            defaultValue={profile.favoriteSubject ?? ""}
            className="min-h-12 rounded-2xl border border-ink/10 bg-cloud px-4 text-base font-bold outline-none focus:border-sky"
          >
            <option value="">Choose subject</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-2">
          <Button type="submit" variant="blue">
            Save Profile
          </Button>
        </div>
      </form>
    </DashboardCard>
  );
}

