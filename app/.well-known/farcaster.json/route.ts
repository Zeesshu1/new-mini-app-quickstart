import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: "APNA_HEADER_YAHAN_DALO",
      payload: "APNA_PAYLOAD_YAHAN_DALO",
      signature: "APNA_SIGNATURE_YAHAN_DALO"
    },
    miniapp: {
      version: "1",
      name: "Base Tic-Tac-Toe",
      description: "A simple Tic-Tac-Toe mini app built on Base",
      iconUrl: "https://new-mini-app-quickstart-git-main-zeesshu1s-projects.vercel.app/icon.png",
      homeUrl: "https://new-mini-app-quickstart-git-main-zeesshu1s-projects.vercel.app",
      imageUrl: "https://new-mini-app-quickstart-git-main-zeesshu1s-projects.vercel.app/hero.png",
      buttonTitle: "Launch Tic-Tac-Toe",
      splashImageUrl: "https://new-mini-app-quickstart-git-main-zeesshu1s-projects.vercel.app/splash.png",
      splashBackgroundColor: "#000000"
    }
  });
}
