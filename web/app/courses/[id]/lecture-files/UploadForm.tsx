"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { recordLectureFile } from "./actions";

const BUCKET = "lecture-files";

export default function UploadForm({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("files") as HTMLInputElement;
    const files = Array.from(input.files ?? []);

    if (files.length === 0) {
      setError("Choose at least one file to upload.");
      return;
    }

    setBusy(true);
    setError(null);

    for (const file of files) {
      const path = `${courseId}/${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true });

      if (uploadError) {
        setError(`${file.name}: ${uploadError.message}`);
        setBusy(false);
        return;
      }

      const result = await recordLectureFile(courseId, file.name, uploadData.path);
      if (result.error) {
        setError(`${file.name}: ${result.error}`);
        setBusy(false);
        return;
      }
    }

    setBusy(false);
    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="field">
        <label className="field-label" htmlFor="files">
          Upload lecture files
        </label>
        <input className="input" id="files" name="files" type="file" multiple required />
        <span className="field-hint">You can select more than one file at once</span>
        {error && <span className="field-hint error">{error}</span>}
      </div>
      <div className="form-actions">
        <button type="submit" className="btn primary" disabled={busy}>
          {busy ? "Uploading…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
