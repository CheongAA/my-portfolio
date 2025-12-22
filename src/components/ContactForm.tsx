import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link with form data
    const mailtoLink = `mailto:kimcheonga97@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative z-10 space-y-6 mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Input */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm text-secondary uppercase tracking-wider mb-2"
          >
            {t("contact.form.name")}
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-primary focus:outline-none focus:border-primary/50 transition"
            placeholder={t("contact.form.namePlaceholder")}
          />
        </div>

        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-secondary uppercase tracking-wider mb-2"
          >
            {t("contact.form.email")}
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-primary focus:outline-none focus:border-primary/50 transition"
            placeholder={t("contact.form.emailPlaceholder")}
          />
        </div>
      </div>

      {/* Subject Input */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm text-secondary uppercase tracking-wider mb-2"
        >
          {t("contact.form.subject")}
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-primary focus:outline-none focus:border-primary/50 transition"
          placeholder={t("contact.form.subjectPlaceholder")}
        />
      </div>

      {/* Message Input */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm text-secondary uppercase tracking-wider mb-2"
        >
          {t("contact.form.message")}
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-primary focus:outline-none focus:border-primary/50 transition resize-none"
          placeholder={t("contact.form.messagePlaceholder")}
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative px-8 py-3 text-[13px] font-medium text-primary border border-border rounded-full transition-all duration-300 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 rounded-full bg-nav-hover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
          <span className="relative">
            {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
          </span>
        </button>

        {submitStatus === "success" && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-primary"
          >
            {t("contact.form.success")}
          </motion.span>
        )}

        {submitStatus === "error" && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-500"
          >
            {t("contact.form.error")}
          </motion.span>
        )}
      </div>
    </motion.form>
  );
}
