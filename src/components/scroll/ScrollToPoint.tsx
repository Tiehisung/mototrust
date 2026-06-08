 
 
 
interface ScrollToPointBtnProps {
  sectionId: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  title?: string;
}

export function ScrollToPointBtn({
  sectionId,
  className = "",
  children,
  label,
  title = "",
}: ScrollToPointBtnProps) {
  const handleScrollToPoint = () => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button
      title={title}
      type="button"
      onClick={handleScrollToPoint}
      className={`cursor-pointer ${className}`}
    >
      {children} {label}
    </button>
  );
}
