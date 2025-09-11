import logoImage from "@assets/worldeduconnect_logo_1757584220284.png";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-12" }: LogoProps) {
  return (
    <img 
      src={logoImage} 
      alt="WorldWide EduConnect" 
      className={className}
      data-testid="logo-image"
    />
  );
}