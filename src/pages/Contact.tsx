import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { contact } from "../data/site";
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
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const update = (field: keyof FormState, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <h1>{locale === "zh" ? "来电，我们帮您选择。" : "Call us. We’ll help you choose."}</h1>
        <p>
          {locale === "zh"
            ? `致电 ${contact.phoneDisplay}，与墨尔本团队讨论您的项目。`
            : `Call ${contact.phoneDisplay} to discuss your project with our Melbourne team.`}
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={contact.phoneHref}>
            {locale === "zh" ? `立即致电 ${contact.phoneDisplay}` : `Call ${contact.phoneDisplay}`}
          </a>
        </div>
      </header>
      <section className={styles.contactGrid}>
        <aside className={styles.contactAside}>
          <h2>{locale === "zh" ? "仓库与联系方式" : "Warehouse & contact"}</h2>
          <div className={styles.contactBlock}>
            <h3>{locale === "zh" ? "地址" : "Address"}</h3>
            <address>{contact.address}</address>
            <a href={contact.mapHref} target="_blank" rel="noreferrer">
              {locale === "zh" ? "查看路线" : "Get directions"}
            </a>
          </div>
          <div className={styles.contactBlock}>
            <h3>{locale === "zh" ? "仓库开放时间" : "Warehouse hours"}</h3>
            <dl className={styles.hours}>
              <div>
                <dt>{locale === "zh" ? "周一至周五" : "Monday–Friday"}</dt>
                <dd>{contact.weekdayHours}</dd>
              </div>
              <div>
                <dt>{locale === "zh" ? "周六" : "Saturday"}</dt>
                <dd>{contact.saturdayHours}</dd>
              </div>
            </dl>
            <p>
              {locale === "zh"
                ? "取货或到访前建议先来电确认。"
                : "Please call ahead before visiting or collecting."}
            </p>
          </div>
          <div className={styles.contactBlock}>
            <h3>{locale === "zh" ? "直接联系" : "Direct contact"}</h3>
            <a href={contact.phoneHref}>{contact.phoneInternational}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </aside>
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.formIntro}>
            <h2>{locale === "zh" ? "发送项目详情" : "Send project details"}</h2>
            <p>
              {locale === "zh"
                ? "更喜欢邮件？填写要点，我们会在您的邮件应用中准备内容。"
                : "Prefer email? Add the key details and we’ll prepare the message in your email app."}
            </p>
          </div>
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
            {locale === "zh" ? "准备邮件" : "Prepare email"}
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
