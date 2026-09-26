import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getUserResume,
  uploadUserResume,
  deleteUserResume,
  type UserResume,
} from "../../api/users";

export default function Resume() {
  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [resume, setResume] =
    useState<UserResume | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    try {
      setLoading(true);
      setError("");

      const result =
        await getUserResume();

      setResume(result);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to load your resume.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const lowerName =
      file.name.toLowerCase();

    const hasValidExtension =
      allowedExtensions.some(
        (extension) =>
          lowerName.endsWith(extension)
      );

    if (
      !allowedTypes.includes(file.type) &&
      !hasValidExtension
    ) {
      setError(
        "Please upload a PDF, DOC, or DOCX file."
      );

      event.target.value = "";

      return;
    }

    const maxSize =
      10 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "The resume file must be 10 MB or smaller."
      );

      event.target.value = "";

      return;
    }

    try {
      setUploading(true);

      const uploadedResume =
        await uploadUserResume(file);

      setResume(
        uploadedResume
      );

      setSuccess(
        "Your resume was uploaded successfully."
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to upload your resume.";

      setError(message);
    } finally {
      setUploading(false);

      event.target.value = "";
    }
  }

  async function handleDeleteResume() {
    const confirmed = window.confirm(
      "Delete your uploaded resume? This removes the resume from JobPilot AI and you will need to upload it again before the agent can use it."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await deleteUserResume();
      setResume(null);
      setSuccess("Your resume was deleted successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete your resume."
      );
    } finally {
      setDeleting(false);
    }
  }

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "—";
    }

    return new Date(
      date
    ).toLocaleString();
  }

  function formatFileSize(
    content?: string | null
  ) {
    if (!content) {
      return null;
    }

    return `${content.length.toLocaleString()} characters parsed`;
  }

  if (loading) {
    return (
      <div className="user-page">
        <div className="user-page-header">
          <div>
            <h1>My Resume</h1>

            <p>
              Upload and manage the resume
              JobPilot AI will use when
              searching and applying for jobs.
            </p>
          </div>
        </div>

        <div className="user-resume-grid">
          <section className="user-resume-card">
            <h2>
              Loading your resume
            </h2>

            <p>
              Please wait while we load your
              resume information.
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="user-page">
      <div className="user-page-header">
        <div>
          <h1>
            My Resume
          </h1>

          <p>
            Upload and manage the resume
            JobPilot AI will use when
            searching and applying for jobs.
          </p>
        </div>

        <button
          type="button"
          onClick={loadResume}
          disabled={uploading}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="user-error">
          {error}
        </div>
      )}

      {success && (
        <div className="user-success">
          {success}
        </div>
      )}

      <div className="user-resume-grid">
        <section className="user-resume-card">
          <h2>
            {resume
              ? "Resume"
              : "Upload Your Resume"}
          </h2>

          <p>
            {resume
              ? "This is the resume JobPilot AI will use to understand your experience, skills, and qualifications."
              : "Upload your resume so JobPilot AI can understand your experience, skills, and qualifications."}
          </p>

          {resume ? (
            <>
              <div className="user-resume-current">
                <div className="user-resume-current-header">
                  <div className="user-resume-file">
                    <div className="user-resume-file-icon">
                      PDF
                    </div>

                    <div className="user-resume-file-info">
                      <div className="user-resume-file-name">
                        {resume.file_name}
                      </div>

                      <div className="user-resume-file-date">
                        Uploaded{" "}
                        {formatDate(
                          resume.uploaded_at
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="user-status user-status-success">
                    Ready
                  </span>
                </div>
              </div>

              <div className="user-resume-upload-area">
                <div className="user-resume-upload-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      d="M12 16V4"
                    />
                    <path
                      d="m7 9 5-5 5 5"
                    />
                    <path
                      d="M5 20h14"
                    />
                  </svg>
                </div>

                <h3>
                  Replace your resume
                </h3>

                <p>
                  PDF, DOC, or DOCX · Maximum
                  file size 10 MB
                </p>

                <div className="user-resume-actions">
                <button
                  type="button"
                  className="user-resume-upload-button"
                  onClick={openFilePicker}
                  disabled={uploading || deleting}
                >
                  {uploading
                    ? "Uploading..."
                    : "Upload New Resume"}
                </button>

                <button
                  type="button"
                  className="user-resume-delete-button"
                  onClick={handleDeleteResume}
                  disabled={uploading || deleting}
                >
                  {deleting ? "Deleting..." : "Delete Resume"}
                </button>
              </div>
              </div>
            </>
          ) : (
            <div className="user-resume-upload-area">
              <div className="user-resume-upload-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="M12 16V4"
                  />
                  <path
                    d="m7 9 5-5 5 5"
                  />
                  <path
                    d="M5 20h14"
                  />
                </svg>
              </div>

              <h3>
                Upload your resume
              </h3>

              <p>
                PDF, DOC, or DOCX · Maximum
                file size 10 MB
              </p>

              <button
                type="button"
                className="user-resume-upload-button"
                onClick={openFilePicker}
                disabled={uploading}
              >
                {uploading
                  ? "Uploading..."
                  : "Choose Resume"}
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            className="user-resume-file-input"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />

          {resume?.content_text && (
            <div className="user-resume-preview">
              <h3>
                Parsed Resume Content
              </h3>

              <pre>
                {resume.content_text}
              </pre>
            </div>
          )}
        </section>

        <aside className="user-resume-card">
          <h2>
            Resume Requirements
          </h2>

          <p>
            JobPilot AI uses your resume as
            the foundation for job matching
            and applications.
          </p>

          <ul className="user-resume-info-list">
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

              PDF, DOC, or DOCX files
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

              Maximum file size: 10 MB
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

              Keep your experience and skills
              up to date
            </li>

            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12l4 4L19 6" />
              </svg>

              JobPilot AI uses the uploaded
              resume for job matching
            </li>
          </ul>

          {resume?.content_text && (
            <div className="user-resume-current">
              <div className="user-resume-file-date">
                {formatFileSize(
                  resume.content_text
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}