// components/AvatarPreview.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarPreviewProps {
  src: string;
  fallback: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
};

const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  src,
  fallback,
  size = "lg",
}) => {
  return (
    <Avatar className={`${sizeClasses[size]} shadow border`}>
      <AvatarImage src={src || "/avatars/default.jpg"} alt="Avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarPreview;
