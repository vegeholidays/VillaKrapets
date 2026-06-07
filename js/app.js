let lang = "bg"

function render() {
  const t = translations[lang]
  const c = window.HOUSE_CONFIG

  document.title = t.eyebrow + " " + c.name

  const chips = c.amenities
    .map(a => `<div class="amenity-item">${a.icon} ${lang === "bg" ? a.bg : a.en}</div>`)
    .join("")

  document.getElementById("page").innerHTML = `
    <div class="hero">
      <p class="hero-eyebrow">${t.eyebrow}</p>
      <h1>${c.name}</h1>
      <p class="hero-sub">${t.subtitle}</p>
    </div>

    <div class="card">
      <p>${t.message}</p>
    </div>

    <div class="card">
      <p class="card-title">${t.amenitiesTitle}</p>
      <div class="amenities-grid">${chips}</div>
    </div>

    <div class="actions">
      <button class="action-btn" onclick="handleWifi()">
        <span class="btn-icon">📶</span>
        <div>
          <span class="btn-title">${c.wifiName} | ${c.wifiPassword}</span>
          <span class="btn-sub">${t.wifiSub}</span>
        </div>
      </button>
      <button class="action-btn" onclick="handleReview()">
        <span class="btn-icon">⭐</span>
        <div>
          <span class="btn-title">${t.leaveReview}</span>
          <span class="btn-sub">${t.reviewSub}</span>
        </div>
      </button>
      <button class="action-btn" onclick="handleCall()">
        <span class="btn-icon">📞</span> <span id="lang-flag"></span>
        <div>
          <span class="btn-title">${t.callUs}</span>
          <span class="btn-sub">${t.callSub}</span>
        </div>
      </button>
    </div>

    <div class="footer"><p>${t.footer}</p></div>
  `
}

function handleWifi() {
  const t = translations[lang]
  const pwd = window.HOUSE_CONFIG.wifiPassword
  navigator.clipboard.writeText(pwd)
    .then(() => showToast(t.wifiCopied))
    .catch(() => showToast(t.wifiFail + pwd))
}

function handleReview() {
  window.open(window.HOUSE_CONFIG.reviewUrl, "_blank", "noopener")
}

function handleCall() {
  window.location.href = "tel:" + (lang === "en" ? window.HOUSE_CONFIG.phoneEN : window.HOUSE_CONFIG.phoneBG)

}

function setLanguage(l) {
  lang = l
  document.getElementById("lang-flag").textContent = l === "en" ? "🇺🇸" : "🇧🇬"
  document.getElementById("dropdown-menu").classList.add("hidden")
  render()
}

function showToast(msg) {
  const el = document.getElementById("toast")
  el.textContent = msg
  el.classList.remove("hidden")
  clearTimeout(el._timer)
  el._timer = setTimeout(() => el.classList.add("hidden"), 2600)
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-btn").addEventListener("click", e => {
    e.stopPropagation()
    document.getElementById("dropdown-menu").classList.toggle("hidden")
  })
  document.addEventListener("click", () => {
    document.getElementById("dropdown-menu").classList.add("hidden")
  })
  render()
})
