const categoriesBase = {
  Frontend: [
    "react_native",
    "javascript",
    "typescript",
    "bootstrap",
    "tailwindcss",
    "html",
    "css",
    "expo",
    "radzen_og",
    "chromium",
    "blazor",
  ],
  Backend: ["dotnet", "nodejs", "express_js", "python", "c_sharp"],
  UI_UX: ["figma", "adobe_xd", "lunacy"],
  Base_de_donnees: ["mysql", "firebase", "mongo_db"],
  Design: ["adobe_illustrator", "adobe_photoshop", "adobe_premiere_pro"],
  DevOps: ["google_colab", "git", "codepen"],
  Social: [
    "x",
    "facebook",
    "instagram",
    "linkedin_circled",
    "pinterest",
    "whatsapp",
    "behance",
  ],
};

const categories = {
  All: [
    ...categoriesBase.Frontend,
    ...categoriesBase.Backend,
    ...categoriesBase.UI_UX,
    ...categoriesBase.Base_de_donnees,
    ...categoriesBase.Design,
    ...categoriesBase.DevOps,
    // ...categoriesBase.Social,
  ],
  ...categoriesBase,
};

const socialLinks: Record<string, string> = {
  x: "https://x.com/Mr_Nkounga",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin_circled: "https://linkedin.com",
  pinterest: "https://pin.it/4UWl5mfpk",
  // ios_logo: "https://apple.com/ios",
  whatsapp: "+242064493007",
  behance: "https://behance.net",
};



const img = [
  "https://i.pinimg.com/736x/65/87/fd/6587fd3d1f09d3085e0406b9598607c1.jpg",
  "https://i.pinimg.com/736x/dd/2e/92/dd2e920f1a2c92eb33a2ac7771ef8cda.jpg",
  "https://i.pinimg.com/736x/cc/b0/46/ccb0462defcf1fb788e4c151086ad0bf.jpg",
  "https://i.pinimg.com/1200x/df/88/1e/df881e66fd0ce73825986ff814d89818.jpg",
  "https://i.pinimg.com/1200x/08/ca/d1/08cad18c548840e34d94ddbab0898c48.jpg",
  "https://i.pinimg.com/736x/c0/9f/62/c09f62cefe85f72e1c1d6bcef022e030.jpg",
  "https://i.pinimg.com/736x/65/87/fd/6587fd3d1f09d3085e0406b9598607c1.jpg",
  "https://i.pinimg.com/736x/c9/d3/c9/c9d3c9f18882fd9e681ddf78580238ef.jpg",
  "https://i.pinimg.com/1200x/a7/a3/c6/a7a3c634f91dc85df4443473b6991fe0.jpg",
  "https://i.pinimg.com/736x/3a/61/19/3a6119b6894b8d08330285e155af78af.jpg",
  "https://i.pinimg.com/1200x/67/89/02/6789021f3fbc4a94dd661ed5d79fe6ef.jpg",
  "https://i.pinimg.com/736x/d8/a9/54/d8a9543ebe5810d498f9616521d16328.jpg",
  "https://i.pinimg.com/1200x/0f/8d/ad/0f8dad72e95ac171ec19fa8d6006dcd8.jpg",
  "https://i.pinimg.com/736x/30/5b/6f/305b6f57145b4c65fb6fa47785e9dd6e.jpg",
  "https://i.pinimg.com/736x/3c/af/df/3cafdf92a15ef8724674461cf0d4fa2f.jpg",
  "https://i.pinimg.com/736x/f5/d6/ee/f5d6ee9cb6f3067dea33f6f3f201dcdb.jpg",
  "https://i.pinimg.com/736x/6f/03/a1/6f03a12910c282821f628ecddd75a9f8.jpg",
  "https://i.pinimg.com/736x/ec/78/ca/ec78ca735cfe8904d6a456c7fd9d7e47.jpg",
  "https://i.pinimg.com/736x/72/d7/e8/72d7e8dc9f87cee12f9c84625528084d.jpg",
  "https://i.pinimg.com/736x/30/88/4b/30884b941f00d4ce0c30e8f913c13b21.jpg",
  "https://i.pinimg.com/736x/91/64/19/9164191c5aee685530d57daea7c0f326.jpg"
]

export {  categories, socialLinks, img }