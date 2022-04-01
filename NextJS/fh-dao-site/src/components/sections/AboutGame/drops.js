import { CrownIcon, ShieldsIcon, LionIcon } from "components/icons";

const drops = [
  {
    smallTitle: "Drop 1",
    icon: <CrownIcon height="24" />,
    value: "30X",
    title: "Vanguards",
    text: "Vanguards lead their Species Clan. They earn powerful royalties from all other members of their clain.",
    items: [
      "1.3x multiplier on $QUEST token airdrop",
      "Est. average <strong>$200k</strong> return by launch.",
    ],
    button: {
      url: "https://www.google.com/",
      label: "1/30",
      hoverLabel: "CLAIM 1/30",
      openInNewTab: true,
      backgroundColor: "black",
      shadow: true,
      textColor: "blue-white",
      borderColor: "black",
      hoverBackgroundColor: "black",
      hoverTextColor: "blue-white",
      hoverBorderColor: "transparent",
    },
  },
  {
    smallTitle: "Drop 2",
    icon: <ShieldsIcon height="24" />,
    value: "300X",
    title: "Warriors",
    text: "Good Future Protectors earn from lower levels of their species, and can become Vanguards.",
    items: [
      "1.2x multiplier on $QUEST token airdrop",
      "Est. average $10k in return. Upgradable.",
    ],
    button: {
      url: "https://www.google.com/",
      label: "1/300",
      openInNewTab: true,
      backgroundColor: "transparent",
      textColor: "black",
      borderColor: "black",
    },
  },
  {
    smallTitle: "Drop 3",
    icon: <LionIcon height="24" />,
    value: "3000-9000X",
    title: "Protectors",
    text: "Good Future Supporters can team up to become Protectors and Vanguards.",
    items: ["1.1x multiplier on $QUEST token airdrop", "Upgradable."],
    button: {
      url: "https://www.google.com/",
      label: "1/9000",
      openInNewTab: true,
      backgroundColor: "transparent",
      textColor: "black",
      borderColor: "black",
    },
  },
];
export default drops;
