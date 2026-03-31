import { Glassmorphic } from "@/components/Glasmorphic/BasicGlassmorphic";
import { GlassmorphicButton } from "@/components/Glasmorphic/Button";
import { GlassmorphicCard } from "@/components/Glasmorphic/CardGlassmorphic";
import { GlassmorphicGradient } from "@/components/Glasmorphic/Gradient";
import { GlassmorphicModal } from "@/components/Glasmorphic/ModalGlassmorphic";
import { GlassmorphicNavbar } from "@/components/Glasmorphic/Nav";
import { User } from "lucide-react";
import React from "react";

 

const GlassmorphicTest = () => {
    const[isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      {/* // Basic usage */}
      <Glassmorphic blur="lg" rounded="xl" className="p-6">
        <h1>Glassmorphic Content</h1>
        <p>This content has a beautiful glass effect</p>
      </Glassmorphic>
      {/* // Card with hover effect */}
      <GlassmorphicCard
        title="Featured Player"
        subtitle="John Doe - Forward"
        icon={<User className="h-5 w-5" />}
        interactive
        onClick={() => console.log("Card clicked")}
      >
        <p>Player stats and information here...</p>
      </GlassmorphicCard>
      {/* // Navigation bar */}
      <GlassmorphicNavbar sticky onScroll>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Logo</h1>
          <nav className="flex gap-4">
            <a href="/">Home</a>
            <a href="/players">Players</a>
            <a href="/matches">Matches</a>
          </nav>
        </div>
      </GlassmorphicNavbar>
      {/* // Modal const [isOpen, setIsOpen] = useState(false); */}
      <GlassmorphicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Welcome"
        size="lg"
      >
        <p>Modal content with glass effect</p>
      </GlassmorphicModal>
      {/* // Button */}
      <GlassmorphicButton
        variant="primary"
        size="lg"
        onClick={() => alert("Clicked!")}
      >
        Click Me
      </GlassmorphicButton>
      {/* // Gradient glass */}
      <GlassmorphicGradient gradient="primary" animated>
        <div className="p-8">
          <h2>Animated Gradient Glass</h2>
          <p>With shimmer effect</p>
        </div>
      </GlassmorphicGradient>
    </div>
  );
}

export default GlassmorphicTest