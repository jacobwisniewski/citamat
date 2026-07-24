import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { brands, categories, contact, copy, products, t } from "../data/site";
import { useLocale, withLocale } from "../hooks/useLocale";
import styles from "./Page.module.scss";

type Category = "all" | "waterproofing" | "composite" | "decorative";

export const Catalog = () => {
  const locale = useLocale();
  const [params, setParams] = useSearchParams();
  const initial = params.get("category");
  const [selected, setSelected] = useState<Category>(
    initial === "waterproofing" || initial === "composite" || initial === "decorative"
      ? initial
      : "all",
  );
  const filtered = useMemo(
    () => (selected === "all" ? products : products.filter((item) => item.category === selected)),
    [selected],
  );
  const filters = [
    { value: "all" as const, label: t(copy.common.all, locale) },
    ...categories.map((item) => ({ value: item.category, label: t(item.title, locale) })),
  ];

  const choose = (value: Category) => {
    setSelected(value);
    setParams(value === "all" ? {} : { category: value });
  };

  return (
    <div className={styles.page}>
      <header className={styles.compactHero} data-theme="dark">
        <h1>{locale === "zh" ? "按应用选择产品。" : "Choose products by application."}</h1>
        <p>
          {locale === "zh"
            ? "筛选并比较要点。如需确认是否适合，直接来电。"
            : "Filter the range and compare the essentials. Call us to confirm fit."}
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={contact.phoneHref}>
            {t(copy.common.call, locale)}
          </a>
        </div>
      </header>
      <section className={styles.section}>
        <div
          className={styles.filterBar}
          aria-label={locale === "zh" ? "产品筛选" : "Product filters"}
        >
          {filters.map((filter) => (
            <button
              className={selected === filter.value ? styles.selected : undefined}
              key={filter.value}
              type="button"
              onClick={() => choose(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className={styles.productGrid}>
          {filtered.map((product) => (
            <Link
              className={styles.productCard}
              key={product.slug}
              to={withLocale(`/products/${product.slug}`, locale)}
            >
              <div
                className={`${styles.productImage} ${
                  product.category !== "composite" ? styles.packagingImage : ""
                }`}
              >
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className={styles.cardBody}>
                <small>{brands.find((brand) => brand.slug === product.brand)?.name}</small>
                <h3>{product.name}</h3>
                <p>{t(product.summary, locale)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
