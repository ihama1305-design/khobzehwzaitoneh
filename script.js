(function () {
  const header = document.querySelector("[data-header]");
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  if (header) {
    const setHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }

  if (navToggle && header && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    if (!track || !prev || !next) return;

    const scrollCards = (direction) => {
      const amount = Math.max(280, track.clientWidth * 0.82);
      track.scrollBy({ left: amount * direction, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollCards(-1));
    next.addEventListener("click", () => scrollCards(1));
  });

  const reviewGrid = document.getElementById("reviewGrid");
  if (reviewGrid && window.location.protocol !== "file:") {
    fetch("data/reviews.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((reviews) => {
        if (!Array.isArray(reviews) || !reviews.length) return;
        reviewGrid.replaceChildren(...reviews.slice(0, 3).map((review) => {
          const card = document.createElement("a");
          card.className = "review-card arabic-frame";
          card.href = review.url || "https://maps.app.goo.gl/xRNT1w5RNDVHsaGbA";
          card.target = "_blank";
          card.rel = "noopener";

          const stars = document.createElement("span");
          stars.className = "review-stars";
          const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
          stars.textContent = "★★★★★".slice(0, rating) || "Rating pending";
          stars.setAttribute("aria-label", rating ? `${rating} out of 5 stars` : "Rating pending");

          const text = document.createElement("p");
          text.textContent = review.text || "Verified Google review quote pending.";

          const name = document.createElement("strong");
          name.textContent = review.name || "Google reviewer";

          const cta = document.createElement("em");
          cta.textContent = "Read on Google Maps";

          if (review.avatar) {
            const avatar = document.createElement("img");
            avatar.className = "review-avatar";
            avatar.src = review.avatar;
            avatar.alt = review.name ? `${review.name} reviewer avatar` : "Google reviewer avatar";
            card.appendChild(avatar);
          }

          card.append(stars, text, name, cta);
          return card;
        }));
      })
      .catch(() => {});
  }

  const menuData = window.KWZ_MENU_DATA;
  if (!menuData) return;

  const sectionContainer = document.getElementById("menuSections");
  const categoryNav = document.getElementById("categoryNav");
  const signatureGrid = document.getElementById("signatureGrid");
  const searchInput = document.getElementById("menuSearch");
  const menuCount = document.getElementById("menuCount");
  const noResults = document.getElementById("noResults");

  if (!sectionContainer || !categoryNav || !signatureGrid || !searchInput) return;

  const sections = [...menuData.sections].sort((a, b) => a.order - b.order);
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const items = [...menuData.items].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  const signatureNames = [
    "Mansaf",
    "Chicken Musakhan",
    "Zaatar",
    "Hummus",
    "Jabel Al Nar Breakfast Tray",
    "Shrimp Pottery with Vegetables",
    "Palestinian Olive Oil(500ml)",
    "Truffle Pizza"
  ];

  const localImages = new Map([
    ["jabel al nar breakfast tray", "assets/dishes/breakfast-tray.jpg"],
    ["falafel fattah", "assets/images/falafel-fatteh.jpg"],
    ["mushrouha cheese and oman chips", "assets/images/mushrouha-cheese-oman.jpg"],
    ["truffle pizza", "assets/images/truffle-pizza.jpg"]
  ]);

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const slugify = (value) =>
    normalize(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const formatPrice = (item) => {
    const options = Array.isArray(item.priceOptions) ? item.priceOptions.filter((option) => option.value !== null) : [];
    if (!options.length && item.price === null) return "Ask server";
    if (options.length <= 1) return `AED ${item.price ?? options[0].value}`;

    return options.map((option) => {
      const label = option.label ? `${option.label} ` : "";
      return `${label}AED ${option.value}`;
    }).join(" / ");
  };

  const displayTags = (item) => {
    const tags = new Set();
    const rawTags = Array.isArray(item.tags) ? item.tags : [];
    const name = normalize(item.name);

    if (item.highlighted || signatureNames.some((signature) => name.includes(normalize(signature)))) tags.add("Signature");
    if (rawTags.includes("new")) tags.add("New");
    if (rawTags.includes("vegetarian")) tags.add("Vegetarian");
    if (rawTags.includes("spicy")) tags.add("Spicy");
    if (item.soldout) tags.add("Sold out");

    return [...tags];
  };

  const imageForItem = (item) => {
    const exact = localImages.get(normalize(item.name));
    if (exact) return exact;
    for (const [key, value] of localImages.entries()) {
      if (normalize(item.name).includes(key)) return value;
    }
    return "";
  };

  const itemMatches = (item, query) => {
    if (!query) return true;
    const section = sectionById.get(item.sectionId);
    const haystack = normalize([
      item.name,
      item.ar,
      item.description,
      item.descriptionAr,
      section ? section.name : "",
      section ? section.ar : "",
      Array.isArray(item.tags) ? item.tags.join(" ") : ""
    ].join(" "));
    return haystack.includes(query);
  };

  const createItemCard = (item) => {
    const article = document.createElement("article");
    article.className = "menu-item-card arabic-frame";
    article.dataset.search = [
      item.name,
      item.ar,
      item.description,
      item.descriptionAr,
      sectionById.get(item.sectionId)?.name || "",
      Array.isArray(item.tags) ? item.tags.join(" ") : ""
    ].join(" ");

    const image = imageForItem(item);
    if (image) {
      const figure = document.createElement("figure");
      figure.className = "menu-item-image";
      const img = document.createElement("img");
      img.src = image;
      img.alt = `${item.name} from Khobzeh w Zaitoneh`;
      figure.appendChild(img);
      article.appendChild(figure);
    }

    const content = document.createElement("div");
    content.className = "menu-card-content";
    const top = document.createElement("div");
    top.className = "menu-card-top";

    const title = document.createElement("h4");
    title.textContent = item.name || "Unnamed item";
    top.appendChild(title);

    if (item.ar) {
      const ar = document.createElement("span");
      ar.className = "arabic-name";
      ar.lang = "ar";
      ar.dir = "rtl";
      ar.textContent = item.ar;
      top.appendChild(ar);
    }

    content.appendChild(top);

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      content.appendChild(description);
    }

    const tags = displayTags(item);
    if (tags.length) {
      const tagWrap = document.createElement("div");
      tagWrap.className = "menu-card-tags";
      tags.forEach((tag) => {
        const tagEl = document.createElement("span");
        tagEl.textContent = tag;
        tagWrap.appendChild(tagEl);
      });
      content.appendChild(tagWrap);
    }

    const price = document.createElement("div");
    price.className = "menu-price";
    price.textContent = formatPrice(item);

    article.append(content, price);
    return article;
  };

  const createSignatureCard = (item) => {
    const card = document.createElement("article");
    card.className = "signature-card arabic-frame";

    const image = imageForItem(item);
    if (image) {
      const img = document.createElement("img");
      img.src = image;
      img.alt = `${item.name} from Khobzeh w Zaitoneh`;
      card.appendChild(img);
    }

    const section = sectionById.get(item.sectionId);
    const tag = document.createElement("p");
    tag.className = "tag";
    tag.textContent = section ? section.name : "Signature";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const ar = document.createElement("span");
    ar.className = "arabic-name";
    ar.lang = "ar";
    ar.dir = "rtl";
    ar.textContent = item.ar || "";

    const description = document.createElement("p");
    description.textContent = item.description || "A current favourite from the Khobzeh w Zaitoneh menu.";

    const meta = document.createElement("div");
    meta.className = "signature-meta";

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = formatPrice(item);

    const anchor = document.createElement("a");
    anchor.href = `#${slugify(section ? section.name : "menu")}`;
    anchor.textContent = "View section";

    meta.append(price, anchor);
    card.append(tag, title);
    if (item.ar) card.appendChild(ar);
    card.append(description, meta);
    return card;
  };

  const renderCategoryNav = () => {
    categoryNav.replaceChildren();
    sections.forEach((section) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = section.name;
      button.dataset.target = slugify(section.name);
      button.addEventListener("click", () => {
        document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      categoryNav.appendChild(button);
    });
  };

  const renderSignatures = () => {
    const selected = [];
    signatureNames.forEach((signature) => {
      const match = items.find((item) => normalize(item.name) === normalize(signature)) ||
        items.find((item) => normalize(item.name).includes(normalize(signature)));
      if (match && !selected.some((item) => item.id === match.id)) selected.push(match);
    });
    signatureGrid.replaceChildren(...selected.slice(0, 8).map(createSignatureCard));
  };

  const renderMenu = () => {
    const query = normalize(searchInput.value);
    sectionContainer.replaceChildren();

    let visibleCount = 0;
    const visibleSections = [];

    sections.forEach((section) => {
      const sectionItems = items.filter((item) => item.sectionId === section.id && itemMatches(item, query));
      if (!sectionItems.length) return;

      visibleCount += sectionItems.length;
      visibleSections.push(section.id);

      const sectionEl = document.createElement("section");
      sectionEl.className = "menu-section";
      sectionEl.id = slugify(section.name);
      sectionEl.dataset.sectionId = section.id;

      const headerEl = document.createElement("div");
      headerEl.className = "menu-section-header arabic-frame";

      const titleWrap = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = section.name;
      titleWrap.appendChild(title);

      if (section.ar) {
        const ar = document.createElement("span");
        ar.className = "arabic-name";
        ar.lang = "ar";
        ar.dir = "rtl";
        ar.textContent = section.ar;
        titleWrap.appendChild(ar);
      }

      const count = document.createElement("span");
      count.textContent = `${sectionItems.length} item${sectionItems.length === 1 ? "" : "s"}`;
      headerEl.append(titleWrap, count);

      const grid = document.createElement("div");
      grid.className = "menu-item-grid";
      sectionItems.forEach((item) => grid.appendChild(createItemCard(item)));

      sectionEl.append(headerEl, grid);
      sectionContainer.appendChild(sectionEl);
    });

    menuCount.textContent = query
      ? `${visibleCount} matching item${visibleCount === 1 ? "" : "s"}`
      : `${items.length} menu item${items.length === 1 ? "" : "s"} across ${sections.length} categories`;
    noResults.hidden = visibleCount > 0;

    [...categoryNav.querySelectorAll("button")].forEach((button) => {
      const section = sections.find((entry) => slugify(entry.name) === button.dataset.target);
      button.hidden = query && section ? !visibleSections.includes(section.id) : false;
    });

    observeSections();
  };

  let observer;
  const observeSections = () => {
    if (observer) observer.disconnect();
    const buttons = new Map([...categoryNav.querySelectorAll("button")].map((button) => [button.dataset.target, button]));

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        buttons.forEach((button) => button.classList.remove("is-active"));
        const active = buttons.get(visible.target.id);
        if (active) active.classList.add("is-active");
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    document.querySelectorAll(".menu-section").forEach((section) => observer.observe(section));
  };

  renderCategoryNav();
  renderSignatures();
  renderMenu();

  searchInput.addEventListener("input", renderMenu);
})();
