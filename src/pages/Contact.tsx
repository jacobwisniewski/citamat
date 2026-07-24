import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

export const Contact = () => {
  const locale = useLocale();
  const [params] = useSearchParams();
  const initialSubject = params.get("subject") ?? "";
  const initial = useMemo<FormState>(
    () => ({ name: "", email: "", phone: "", company: "", subject: initialSubject, message: "" }),
    [initialSubject],
  );
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = form.subject || (locale === "zh" ? "项目咨询" : "Project enquiry");
    const body = [
      `${locale === "zh" ? "姓名" : "Name"}: ${form.name}`,
      `Email: ${form.email}`,
      `${locale === "zh" ? "电话" : "Phone"}: ${form.phone || "—"}`,
      `${locale === "zh" ? "公司" : "Company"}: ${form.company || "—"}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:info@citamat.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <span className={styles.eyebrow}>{locale === "zh" ? "项目咨询" : "Project enquiry"}</span>
        <h1>{locale === "zh" ? "从项目条件开始。" : "Start with the project conditions."}</h1>
        <p>
          {locale === "zh"
            ? "请提供应用部位、基面、工期与目标效果。我们将据此给出更有用的材料方向。"
            : "Share the application, substrate, programme and desired outcome. That context lets us give more useful direction."}
        </p>
      </header>
      <section className={styles.contactGrid}>
        <aside className={styles.contactAside}>
          <h2>{locale === "zh" ? "发送项目需求" : "Send the brief"}</h2>
          <p>
            {locale === "zh"
              ? "表单会打开您的邮件应用，由您确认后发送。"
              : "The form opens your email app so you can review and send the enquiry."}
          </p>
          <a href="mailto:info@citamat.com">info@citamat.com</a>
          <a
            href="https://www.google.com/maps/search/7+Alexander+Drive,+Burwood+3125,+Victoria"
            target="_blank"
            rel="noreferrer"
          >
            7 Alexander Drive, Burwood VIC 3125
          </a>
        </aside>
        <form className={styles.form} onSubmit={submit}>
          <label>
            {locale === "zh" ? "姓名 *" : "Name *"}
            <input
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </label>
          <label>
            {locale === "zh" ? "邮箱 *" : "Email *"}
            <input
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </label>
          <label>
            {locale === "zh" ? "电话" : "Phone"}
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </label>
          <label>
            {locale === "zh" ? "公司" : "Company"}
            <input
              autoComplete="organization"
              value={form.company}
              onChange={(event) => update("company", event.target.value)}
            />
          </label>
          <label className={styles.wide}>
            {locale === "zh" ? "咨询主题 *" : "Subject *"}
            <input
              required
              value={form.subject}
              onChange={(event) => update("subject", event.target.value)}
            />
          </label>
          <label className={styles.wide}>
            {locale === "zh" ? "项目详情 *" : "Project details *"}
            <textarea
              required
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
              placeholder={
                locale === "zh"
                  ? "项目类型、应用部位、基面、工期与目标效果"
                  : "Project type, application, substrate, programme and desired outcome"
              }
            />
          </label>
          <button className={`${styles.primary} ${styles.wide}`} type="submit">
            {locale === "zh" ? "在邮件中确认并发送" : "Review and send in email"}
          </button>
          {sent && (
            <p className={styles.notice} role="status">
              {locale === "zh"
                ? "邮件应用已打开。请检查内容并点击发送。"
                : "Your email app has opened. Review the message and press send."}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};
