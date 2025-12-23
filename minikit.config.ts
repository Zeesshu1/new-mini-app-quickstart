const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const minikitConfig = {
  // Yahan apna accountAssociation wala data baad mein daal sakte hain agar verify karna ho
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "TicTacToe", 
    subtitle: "Play & Win on Base", 
    description: "Simple Tic-Tac-Toe Game",
    appId: "694ad42ec63ad876c9081083", // Aapka diya hua App ID
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["game", "tictactoe", "base", "fun"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Beat your friends!",
    ogTitle: "Base Tic-Tac-Toe",
    ogDescription: "Play Tic-Tac-Toe on Base",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;
