"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : null;
}

function cleanAge(value: FormDataEntryValue | null) {
  const age = Number(value);
  if (!Number.isInteger(age) || age < 5 || age > 18) {
    return null;
  }

  return age;
}

export async function updateStudentProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      student_name: cleanText(formData.get("student_name")),
      age: cleanAge(formData.get("age")),
      grade_level: cleanText(formData.get("grade_level")),
      favorite_subject: cleanText(formData.get("favorite_subject")),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  revalidatePath("/dashboard");
}
