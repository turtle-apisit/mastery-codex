"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/client";

function requiredString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function addAssignedHomework(courseId: string, sessionId: string, formData: FormData) {
  const question = requiredString(formData.get("question"));
  const submittedAnswer = requiredString(formData.get("submitted_answer"));

  if (!question || !submittedAnswer) {
    redirect(
      `/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent("Question and your submitted answer are required.")}`,
    );
  }

  const { error } = await supabase.from("assigned_homework").insert({
    session_id: sessionId,
    question,
    submitted_answer: submittedAnswer,
  });

  if (error) {
    redirect(`/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/courses/${courseId}/sessions/${sessionId}`);
  redirect(`/courses/${courseId}/sessions/${sessionId}`);
}

export async function updateHomeworkFeedback(
  courseId: string,
  sessionId: string,
  homeworkId: string,
  formData: FormData,
) {
  const feedback = requiredString(formData.get("grade_or_feedback"));

  const { error } = await supabase
    .from("assigned_homework")
    .update({ grade_or_feedback: feedback || null })
    .eq("id", homeworkId);

  if (error) {
    redirect(`/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/courses/${courseId}/sessions/${sessionId}`);
  redirect(`/courses/${courseId}/sessions/${sessionId}`);
}

export async function addGeneratedHomework(courseId: string, sessionId: string, formData: FormData) {
  const techniqueName = requiredString(formData.get("technique_name"));
  const question = requiredString(formData.get("question"));
  const userAnswer = requiredString(formData.get("user_answer"));
  const isCorrectRaw = formData.get("is_correct");
  const correctAnswerExplanation = requiredString(formData.get("correct_answer_explanation"));

  const isCorrectValid = isCorrectRaw === "true" || isCorrectRaw === "false";

  if (!techniqueName || !question || !userAnswer || !correctAnswerExplanation || !isCorrectValid) {
    redirect(
      `/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(
        "Fill in the technique, question, your answer, whether it was correct, and the explanation.",
      )}`,
    );
  }

  const { error } = await supabase.from("generated_homework").insert({
    session_id: sessionId,
    technique_name: techniqueName,
    question,
    user_answer: userAnswer,
    is_correct: isCorrectRaw === "true",
    correct_answer_explanation: correctAnswerExplanation,
  });

  if (error) {
    redirect(`/courses/${courseId}/sessions/${sessionId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/courses/${courseId}/sessions/${sessionId}`);
  redirect(`/courses/${courseId}/sessions/${sessionId}`);
}
