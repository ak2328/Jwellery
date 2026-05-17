import { NavbarSection } from "./sections/NavbarSection";
import { MainContentSection } from "./sections/MainContentSection";
import { FooterSection } from "./sections/FooterSection";

export const ManiDOroHome = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen" style={{ background: "#fef9e9" }}>
      <NavbarSection />
      <div style={{ paddingTop: "80px" }}>
        <MainContentSection />
        <FooterSection />
      </div>
    </div>
  );
};
