(function () {
  const createImageFallback = () => {
    const fallback = document.createElement("span");
    fallback.className = "image-fallback-mark";
    fallback.lang = "ar";
    fallback.dir = "rtl";
    fallback.textContent = "خبزة و زيتونة";
    fallback.setAttribute("aria-hidden", "true");
    return fallback;
  };

  const markImageMissing = (img) => {
    if (!img || img.dataset.fallbackApplied === "true") return;
    img.dataset.fallbackApplied = "true";

    const card = img.closest(".menu-item-card, .signature-card, .visual-category-card, .menu-hero-card, .dish-card, .menu-jump-card");
    card?.classList.add("image-missing", "no-photo");

    const holder = img.closest("figure, .visual-category-media") || img.parentElement;
    if (holder) {
      holder.classList.add("is-missing");
      img.remove();
      if (!holder.querySelector(".image-fallback-mark")) holder.appendChild(createImageFallback());
      return;
    }

    img.remove();
  };

  document.addEventListener("error", (event) => {
    if (event.target instanceof HTMLImageElement) markImageMissing(event.target);
  }, true);

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

  document.querySelectorAll("[data-autoplay-video]").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const attemptPlay = () => {
      const playRequest = video.play();
      if (playRequest && typeof playRequest.catch === "function") {
        playRequest.catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    window.addEventListener("load", attemptPlay, { once: true });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) attemptPlay();
    });
    document.addEventListener("touchstart", attemptPlay, { once: true, passive: true });
    document.addEventListener("pointerdown", attemptPlay, { once: true, passive: true });
  });

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
  const visualCategoryStrip = document.getElementById("visualCategoryStrip");
  const signatureGrid = document.getElementById("signatureGrid");
  const searchInput = document.getElementById("menuSearch");
  const menuCount = document.getElementById("menuCount");
  const noResults = document.getElementById("noResults");

  if (!sectionContainer || !categoryNav || !visualCategoryStrip || !signatureGrid || !searchInput) return;

  const sections = [...menuData.sections].sort((a, b) => a.order - b.order);
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const sectionByName = new Map(sections.map((section) => [normalizeSectionName(section.name), section]));
  const items = [...menuData.items].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  const mediaBaseUrl = menuData.mediaBaseUrl || "";
  const signatureNames = [
    "Mushrouha Cheese and Oman Chips",
    "Falafel Fattah",
    "Shrimp Sajeyeh",
    "Ouzi Surra",
    "Jabel Al Nar Breakfast Tray",
    "Mermaid Breakfast Tray",
    "Truffle Pizza",
    "Palestinian Olive Oil(500ml)"
  ];

  const sectionGroups = [
    {
      id: "group-morning-table",
      name: "Morning Table",
      detail: "Breakfast, mezze, salads, soup, and fatteh",
      sectionNames: ["Try our New Items", "Soup", "Salad", "Cold Appetizer", "Breakfast Tray", "Fatteh"]
    },
    {
      id: "group-oven-bakery",
      name: "Oven & Bakery",
      detail: "Mana'esh, sourdough, pastries, ka'ak, pizza, and oven trays",
      sectionNames: ["Mana'esh", "Manakesh Sour Dough", "County Style Pastries", "Mashrouha Pastry", "Tradditional Palestenian Ka'ak", "Pizza", "From The Oven"]
    },
    {
      id: "group-mains-pottery",
      name: "Mains & Kids",
      detail: "Hot appetizers, fryers, daily dishes, pottery, and kids menu",
      sectionNames: ["Hot Appetizer", "Fryers", "Daily Dish", "Pottery", "Kids Menu"]
    },
    {
      id: "group-sweets-drinks",
      name: "Sweets & Drinks",
      detail: "Desserts, hot drinks, juices, mojitos, iced coffee, smoothies, and soft drinks",
      sectionNames: ["Sweets", "Hot Beverages", "Fresh Juices", "Mojitos", "Iced Coffee", "Smoothie", "Soft Drinks"]
    },
    {
      id: "group-shisha-retail",
      name: "Shisha & Retail",
      detail: "Shisha and Palestinian pantry items",
      sectionNames: ["Shisha", "Retail"]
    }
  ];

  const openSections = new Set(sections[0]?.id ? [sections[0].id] : []);

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  function normalizeSectionName(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\s+/g, " ")
      .trim();
  }

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
    if (item.image) return imageUrl(item.image);
    return "";
  };

  const imageForSection = (section) => {
    if (!section) return "";
    if (section.image) return imageUrl(section.image);
    const representativeItem = items.find((item) => item.sectionId === section.id && item.image);
    return representativeItem ? imageForItem(representativeItem) : "";
  };

  const imageForGroup = (group) => {
    for (const sectionName of group.sectionNames) {
      const section = sectionByName.get(normalizeSectionName(sectionName));
      const image = imageForSection(section);
      if (image) return image;
    }
    return "";
  };

  const imageUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return `${mediaBaseUrl}${path}`;
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

  const createManagedImage = (src, alt, className, width, height) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";
    if (className) img.className = className;
    if (width) img.width = width;
    if (height) img.height = height;
    img.addEventListener("error", () => markImageMissing(img), { once: true });
    return img;
  };

  const createPhotoFallback = (className = "menu-item-no-photo") => {
    const fallback = document.createElement("div");
    fallback.className = className;
    fallback.appendChild(createImageFallback());
    return fallback;
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
    const figure = document.createElement("figure");
    figure.className = "menu-item-image";
    if (image) {
      const img = createManagedImage(image, `${item.name} from Khobzeh w Zaitoneh`, "menu-item-photo", 120, 120);
      figure.appendChild(img);
    } else {
      article.classList.add("no-photo");
      figure.classList.add("is-missing");
      figure.appendChild(createPhotoFallback());
    }
    article.appendChild(figure);

    const content = document.createElement("div");
    content.className = "menu-card-content";
    const top = document.createElement("div");
    top.className = "menu-card-top";

    const titleWrap = document.createElement("div");
    titleWrap.className = "menu-card-title";
    const title = document.createElement("h4");
    title.textContent = item.name || "Unnamed item";
    titleWrap.appendChild(title);

    if (item.ar) {
      const ar = document.createElement("span");
      ar.className = "arabic-name";
      ar.lang = "ar";
      ar.dir = "rtl";
      ar.textContent = item.ar;
      titleWrap.appendChild(ar);
    }

    const price = document.createElement("div");
    price.className = "menu-price";
    price.textContent = formatPrice(item);

    top.append(titleWrap, price);
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

    article.appendChild(content);
    return article;
  };

  const createSignatureCard = (item) => {
    const card = document.createElement("article");
    card.className = "signature-card arabic-frame";

    const image = imageForItem(item);
    if (image) {
      const img = createManagedImage(image, `${item.name} from Khobzeh w Zaitoneh`, "", 640, 480);
      card.appendChild(img);
    } else {
      card.classList.add("no-photo");
      card.appendChild(createPhotoFallback("signature-no-photo"));
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

  const openGroupSections = (group) => {
    group.sectionNames.forEach((sectionName) => {
      const section = sectionByName.get(normalizeSectionName(sectionName));
      if (section) openSections.add(section.id);
    });
  };

  const scrollToTarget = (targetId) => {
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const renderCategoryNav = () => {
    categoryNav.replaceChildren();
    sectionGroups.forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-pill category-group-button";
      button.textContent = group.name;
      button.dataset.target = group.id;
      button.dataset.groupId = group.id;
      button.addEventListener("click", () => {
        openGroupSections(group);
        renderMenu();
        scrollToTarget(group.id);
      });
      categoryNav.appendChild(button);
    });

    sections.forEach((section) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-pill";
      button.textContent = section.name;
      button.dataset.target = slugify(section.name);
      button.dataset.sectionId = section.id;
      button.addEventListener("click", () => {
        openSections.add(section.id);
        renderMenu();
        scrollToTarget(button.dataset.target);
      });
      categoryNav.appendChild(button);
    });
  };

  const createVisualCategoryCard = ({ label, arabic, detail, image, targetId, sectionId, group }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = group ? "visual-category-card visual-category-card-primary" : "visual-category-card";
    button.dataset.target = targetId;
    if (sectionId) button.dataset.sectionId = sectionId;
    if (group) button.dataset.groupId = targetId;

    const media = document.createElement("span");
    media.className = "visual-category-media";
    if (image) {
      media.appendChild(createManagedImage(image, `${label} dishes`, "", 220, 160));
    } else {
      button.classList.add("no-photo");
      media.classList.add("is-missing");
      media.appendChild(createPhotoFallback("visual-category-no-photo"));
    }

    const text = document.createElement("span");
    text.className = "visual-category-text";

    const name = document.createElement("strong");
    name.textContent = label;
    text.appendChild(name);

    if (arabic) {
      const ar = document.createElement("small");
      ar.className = "arabic-name";
      ar.lang = "ar";
      ar.dir = "rtl";
      ar.textContent = arabic;
      text.appendChild(ar);
    } else if (detail) {
      const small = document.createElement("small");
      small.textContent = detail;
      text.appendChild(small);
    }

    button.append(media, text);
    button.addEventListener("click", () => {
      if (group) {
        openGroupSections(group);
      } else if (sectionId) {
        openSections.add(sectionId);
      }
      renderMenu();
      scrollToTarget(targetId);
    });

    return button;
  };

  const renderVisualCategories = () => {
    const cards = [];

    sectionGroups.forEach((group) => {
      cards.push(createVisualCategoryCard({
        label: group.name,
        detail: group.detail,
        image: imageForGroup(group),
        targetId: group.id,
        group
      }));
    });

    sections.forEach((section) => {
      cards.push(createVisualCategoryCard({
        label: section.name,
        arabic: section.ar,
        image: imageForSection(section),
        targetId: slugify(section.name),
        sectionId: section.id
      }));
    });

    visualCategoryStrip.replaceChildren(...cards);
  };

  const renderSignatures = () => {
    const selected = [];
    signatureNames.forEach((signature) => {
      const match = items.find((item) => normalize(item.name) === normalize(signature)) ||
        items.find((item) => normalize(item.name).includes(normalize(signature)));
      if (match && !selected.some((item) => item.id === match.id)) selected.push(match);
    });

    items.forEach((item) => {
      if (selected.length >= 8) return;
      if (item.image && !selected.some((selectedItem) => selectedItem.id === item.id)) selected.push(item);
    });

    signatureGrid.replaceChildren(...selected.slice(0, 8).map(createSignatureCard));
  };

  const createMenuSectionElement = (section, sectionItems, forceOpen = false) => {
    const sectionEl = document.createElement("section");
    const expanded = forceOpen || openSections.has(section.id);
    sectionEl.className = `menu-section accordion-section${expanded ? " is-open" : ""}`;
    sectionEl.id = slugify(section.name);
    sectionEl.dataset.sectionId = section.id;

    const panelId = `panel-${slugify(section.name)}`;
    const headerEl = document.createElement("button");
    headerEl.type = "button";
    headerEl.className = "menu-section-header category-accordion-trigger arabic-frame";
    headerEl.setAttribute("aria-expanded", String(expanded));
    headerEl.setAttribute("aria-controls", panelId);

    const titleWrap = document.createElement("div");
    titleWrap.className = "category-title-wrap";
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

    const meta = document.createElement("span");
    meta.className = "category-meta";

    const count = document.createElement("span");
    count.textContent = `${sectionItems.length} item${sectionItems.length === 1 ? "" : "s"}`;
    const chevron = document.createElement("span");
    chevron.className = "chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "⌄";
    meta.append(count, chevron);
    headerEl.append(titleWrap, meta);

    const panel = document.createElement("div");
    panel.className = "category-panel";
    panel.id = panelId;
    panel.hidden = !expanded;

    const grid = document.createElement("div");
    grid.className = "menu-item-grid";
    sectionItems.forEach((item) => grid.appendChild(createItemCard(item)));
    panel.appendChild(grid);

    headerEl.addEventListener("click", () => {
      const isExpanded = headerEl.getAttribute("aria-expanded") === "true";
      headerEl.setAttribute("aria-expanded", String(!isExpanded));
      panel.hidden = isExpanded;
      sectionEl.classList.toggle("is-open", !isExpanded);
      if (isExpanded) {
        openSections.delete(section.id);
      } else {
        openSections.add(section.id);
      }
    });

    sectionEl.append(headerEl, panel);
    return sectionEl;
  };

  const renderMenu = () => {
    const query = normalize(searchInput.value);
    sectionContainer.replaceChildren();

    let visibleCount = 0;
    const visibleSections = new Set();
    const visibleGroups = new Set();
    const groupedSectionIds = new Set();

    sectionGroups.forEach((group) => {
      const groupEl = document.createElement("section");
      groupEl.className = "menu-group";
      groupEl.id = group.id;

      const groupHeader = document.createElement("div");
      groupHeader.className = "menu-group-header";
      const groupTitle = document.createElement("h3");
      groupTitle.textContent = group.name;
      const groupDetail = document.createElement("p");
      groupDetail.textContent = group.detail;
      groupHeader.append(groupTitle, groupDetail);

      const groupSections = [];
      group.sectionNames.forEach((sectionName) => {
        const section = sectionByName.get(normalizeSectionName(sectionName));
        if (!section) return;
        groupedSectionIds.add(section.id);

        const sectionItems = items.filter((item) => item.sectionId === section.id && itemMatches(item, query));
        if (!sectionItems.length) return;

        visibleCount += sectionItems.length;
        visibleSections.add(section.id);
        visibleGroups.add(group.id);
        groupSections.push(createMenuSectionElement(section, sectionItems, Boolean(query)));
      });

      if (groupSections.length) {
        groupEl.append(groupHeader, ...groupSections);
        sectionContainer.appendChild(groupEl);
      }
    });

    sections.filter((section) => !groupedSectionIds.has(section.id)).forEach((section) => {
      const sectionItems = items.filter((item) => item.sectionId === section.id && itemMatches(item, query));
      if (!sectionItems.length) return;

      visibleCount += sectionItems.length;
      visibleSections.add(section.id);
      sectionContainer.appendChild(createMenuSectionElement(section, sectionItems, Boolean(query)));
    });

    menuCount.textContent = query
      ? `${visibleCount} matching item${visibleCount === 1 ? "" : "s"}`
      : `${items.length} menu item${items.length === 1 ? "" : "s"} across ${sections.length} categories`;
    noResults.hidden = visibleCount > 0;

    [...categoryNav.querySelectorAll("button")].forEach((button) => {
      if (button.dataset.groupId) {
        button.hidden = query ? !visibleGroups.has(button.dataset.groupId) : false;
        button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
        return;
      }
      button.hidden = query && button.dataset.sectionId ? !visibleSections.has(button.dataset.sectionId) : false;
      button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
    });

    [...visualCategoryStrip.querySelectorAll("button")].forEach((button) => {
      if (button.dataset.groupId) {
        button.hidden = query ? !visibleGroups.has(button.dataset.groupId) : false;
        return;
      }
      button.hidden = query && button.dataset.sectionId ? !visibleSections.has(button.dataset.sectionId) : false;
    });

    observeSections();
  };

  let observer;
  const observeSections = () => {
    if (observer) observer.disconnect();
    const navButtons = [...categoryNav.querySelectorAll("button"), ...visualCategoryStrip.querySelectorAll("button")];
    const buttons = new Map();
    navButtons.forEach((button) => {
      if (!button.dataset.target) return;
      if (!buttons.has(button.dataset.target)) buttons.set(button.dataset.target, []);
      buttons.get(button.dataset.target).push(button);
    });

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        buttons.forEach((buttonList) => {
          buttonList.forEach((button) => {
            button.classList.remove("is-active");
            button.setAttribute("aria-pressed", "false");
          });
        });
        const activeButtons = buttons.get(visible.target.id) || [];
        activeButtons.forEach((active) => {
          active.classList.add("is-active");
          active.setAttribute("aria-pressed", "true");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    document.querySelectorAll(".menu-group, .menu-section").forEach((section) => observer.observe(section));
  };

  renderVisualCategories();
  renderCategoryNav();
  renderSignatures();
  renderMenu();

  searchInput.addEventListener("input", renderMenu);
})();
