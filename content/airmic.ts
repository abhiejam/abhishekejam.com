export const airmic = {
  name: "AirMic",
  headline: "Your iPhone is a mic now.",
  pitch:
    "AirMic streams your iPhone's mic over Wi-Fi to your computer, so it shows up as a normal microphone for Zoom, Google Meet and voice coding. No ads, no time limits.",
  seo: {
    title: "AirMic: your iPhone is a mic now",
    description:
      "AirMic turns your iPhone into a wireless mic for your computer. Join the waitlist for the App Store version.",
  },
  repoUrl: "https://github.com/abhiejam/airmic",
  video: {
    src: "/airmic/airmic-demo.mp4",
    poster: "/airmic/airmic-demo-poster.jpg",
    width: 720,
    height: 900,
  },
  icon: "/airmic/airmic-app-icon.svg",
  waitlist: {
    cta: "Join the waitlist",
    note: "We'll email you once when AirMic hits the App Store. Unsubscribe anytime.",
    success: "You're on the list.",
    buildYourself:
      "Prefer to build it yourself? It's free and open source on GitHub",
  },
} as const;
