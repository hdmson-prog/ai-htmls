const domains = [
  {
    name: "NovaScale.com",
    category: "tech",
    tier: "premium",
    price: "$9,800",
    description: "High-growth SaaS or infrastructure brand.",
    age: "Registered 2016",
  },
  {
    name: "CopperTrail.com",
    category: "commerce",
    tier: "standard",
    price: "$2,400",
    description: "Great for DTC goods or outdoor commerce.",
    age: "Registered 2018",
  },
  {
    name: "SignalPine.com",
    category: "media",
    tier: "standard",
    price: "$1,950",
    description: "Editorial, podcast, or creator network.",
    age: "Registered 2019",
  },
  {
    name: "LushOrbit.com",
    category: "lifestyle",
    tier: "premium",
    price: "$7,200",
    description: "Beauty, wellness, or premium lifestyle label.",
    age: "Registered 2017",
  },
  {
    name: "RapidFleet.com",
    category: "tech",
    tier: "standard",
    price: "$3,800",
    description: "Logistics, delivery, or operations platform.",
    age: "Registered 2015",
  },
  {
    name: "SaffronCart.com",
    category: "commerce",
    tier: "standard",
    price: "$1,600",
    description: "Gourmet, food delivery, or specialty market.",
    age: "Registered 2020",
  },
  {
    name: "BloomHaven.com",
    category: "lifestyle",
    tier: "premium",
    price: "$6,500",
    description: "Home, garden, or modern living brand.",
    age: "Registered 2014",
  },
  {
    name: "ArcadeSignal.com",
    category: "media",
    tier: "standard",
    price: "$2,050",
    description: "Gaming, streaming, or pop culture.",
    age: "Registered 2018",
  },
];

const grid = document.getElementById("domainGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".chip");
const countTotal = document.getElementById("countTotal");
const countPremium = document.getElementById("countPremium");

const formatCategory = (value) => value[0].toUpperCase() + value.slice(1);

const renderCards = (list) => {
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML =
      "<div class='card'><div class='domain'>No results found</div><p>Try a different search or filter.</p></div>";
    return;
  }

  list.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.animation = `fadeUp 0.5s ease ${(index + 1) * 0.05}s both`;

    card.innerHTML = `
      <span class="badge">${formatCategory(item.category)}</span>
      <div class="domain">${item.name}</div>
      <div class="price">${item.price}</div>
      <p>${item.description}</p>
      <div class="meta">
        <span>${item.age}</span>
        <span>${item.tier === "premium" ? "Premium Tier" : "Standard Tier"}</span>
      </div>
      <a href="mailto:hello@yourdomain.com?subject=${encodeURIComponent(
        "Inquiry for " + item.name
      )}">Make an Offer</a>
    `;
    grid.appendChild(card);
  });
};

const applyFilters = () => {
  const activeFilter =
    document.querySelector(".chip.is-active")?.dataset.filter ?? "all";
  const query = searchInput.value.trim().toLowerCase();

  const filtered = domains.filter((item) => {
    const matchesFilter =
      activeFilter === "all" ||
      item.category === activeFilter ||
      (activeFilter === "premium" && item.tier === "premium");
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  renderCards(filtered);
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

document.querySelectorAll("[data-action='scroll']").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("browse").scrollIntoView({ behavior: "smooth" });
  });
});

countTotal.textContent = domains.length.toString();
countPremium.textContent = domains.filter((d) => d.tier === "premium").length;

renderCards(domains);

