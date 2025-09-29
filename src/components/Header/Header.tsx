import { ArrowLeft } from "lucide-react";
import "./Header.css";

interface HeaderProps {
  showBackButton?: boolean;
  title: string;
  onBack?: () => void;
}

export function Header({ showBackButton = false, title, onBack }: HeaderProps) {
  return (
    <header className="header">
      {showBackButton && (
        <button className="header__back-button" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
      )}
      <h1
        className={`header__title ${
          showBackButton ? "header__title--with-back" : ""
        }`}
      >
        {title}
      </h1>
    </header>
  );
}
