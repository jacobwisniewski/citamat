import { useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { contact, copy, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const locale = useLocale();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const withoutLocale = location.pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const alternate = locale === "zh" ? withoutLocale : withLocale(withoutLocale, "zh");
  const items = [
    ["/", copy.nav.home],
    ["/products", copy.nav.products],
    ["/about", copy.nav.about],
  ] as const;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.logo} to={withLocale("/", locale)} onClick={() => setOpen(false)}>
          CITAMAT
          <span>AUSTRALIA</span>
        </Link>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={open}
          aria-label={locale === "zh" ? "打开导航" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={open ? styles.navOpen : styles.nav} aria-label="Main navigation">
          {items.map(([path, label]) => (
            <NavLink
              key={path}
              to={withLocale(path, locale)}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
              end={path === "/"}
            >
              {t(label, locale)}
            </NavLink>
          ))}
          <Link className={styles.language} to={alternate} onClick={() => setOpen(false)}>
            {locale === "zh" ? "EN" : "中文"}
          </Link>
          <a className={styles.navCta} href={contact.phoneHref} onClick={() => setOpen(false)}>
            {t(copy.common.call, locale)}
          </a>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={styles.footer} data-theme="dark">
        <div>
          <Link className={styles.footerLogo} to={withLocale("/", locale)}>
            CITAMAT
          </Link>
          <p>
            {locale === "zh"
              ? "为澳大利亚项目提供更清晰的材料选择。"
              : "Clearer material choices for Australian projects."}
          </p>
        </div>
        <div>
          <span>{locale === "zh" ? "联系" : "Contact"}</span>
          <a href={contact.phoneHref}>{contact.phoneInternational}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a
            href="https://www.google.com/maps/search/7+Alexander+Drive,+Burwood+3125,+Victoria"
            target="_blank"
            rel="noreferrer"
          >
            7 Alexander Drive, Burwood VIC 3125
          </a>
        </div>
        <div>
          <span>{locale === "zh" ? "浏览" : "Explore"}</span>
          <Link to={withLocale("/products", locale)}>{t(copy.nav.products, locale)}</Link>
          <Link to={withLocale("/about", locale)}>{t(copy.nav.about, locale)}</Link>
          <Link to={withLocale("/contact", locale)}>{t(copy.nav.contact, locale)}</Link>
        </div>
        <small>© {new Date().getFullYear()} CITAMAT Australia</small>
      </footer>
    </div>
  );
};
