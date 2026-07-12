"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { company } from "@/data/company";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  function update(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const subject = `[Website] ${t("formTitle")} — ${form.company || form.name}`;
    const body = [
      `${t("nameLabel")}: ${form.name}`,
      `${t("companyLabel")}: ${form.company}`,
      `${t("emailLabel")}: ${form.email}`,
      `${t("phoneLabel")}: ${form.phone}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20";

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">
            {t("nameLabel")} *
          </span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder={t("namePlaceholder")}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">
            {t("companyLabel")}
          </span>
          <input
            value={form.company}
            onChange={update("company")}
            placeholder={t("companyPlaceholder")}
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">
            {t("emailLabel")} *
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="name@company.com"
            className={inputCls}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">
            {t("phoneLabel")}
          </span>
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="0X-XXX-XXXX"
            className={inputCls}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy-900">
          {t("messageLabel")} *
        </span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder={t("messagePlaceholder")}
          className={inputCls}
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-xl bg-gold-500 px-6 py-3.5 font-bold text-navy-950 shadow-sm transition hover:bg-gold-400 sm:w-auto sm:px-10"
      >
        {t("submit")}
      </button>
      <p className="text-xs text-slate-400">{t("submitNote")}</p>
    </form>
  );
}
