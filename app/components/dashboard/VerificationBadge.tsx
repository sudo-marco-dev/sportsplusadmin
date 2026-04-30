import { Badge } from "../ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface VerificationBadgeProps {
  status: "verified" | "unverified" | "suspicious";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function VerificationBadge({ 
  status, 
  size = "md", 
  showIcon = true 
}: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "text-xs py-0 px-1.5",
    md: "text-xs",
    lg: "text-sm py-1 px-2.5"
  };

  const iconSize = {
    sm: "h-2.5 w-2.5",
    md: "h-3 w-3",
    lg: "h-3.5 w-3.5"
  };

  switch (status) {
    case "verified":
      return (
        <Badge className={`bg-green-500 text-white hover:bg-green-600 ${sizeClasses[size]} ${showIcon ? "gap-1" : ""}`}>
          {showIcon && <CheckCircle2 className={iconSize[size]} />}
          Verified
        </Badge>
      );
    case "unverified":
      return (
        <Badge className={`bg-yellow-500 text-white hover:bg-yellow-600 ${sizeClasses[size]} ${showIcon ? "gap-1" : ""}`}>
          {showIcon && <AlertTriangle className={iconSize[size]} />}
          Unverified
        </Badge>
      );
    case "suspicious":
      return (
        <Badge className={`bg-red-500 text-white hover:bg-red-600 ${sizeClasses[size]} ${showIcon ? "gap-1" : ""}`}>
          {showIcon && <XCircle className={iconSize[size]} />}
          Suspicious
        </Badge>
      );
    default:
      return null;
  }
}
