import React from "react";
import { Alert } from "@heroui/react";
import type { AlertProps } from "@heroui/react";
import { cn } from "@/lib/utils";

interface CustomAlertProps extends AlertProps {
  contents?: string[];
}
const CustomAlert = ({
  children,
  variant,
  color,
  className,
  classNames,
  contents,
  ...props
}: CustomAlertProps) => {
  const colorClass = React.useMemo(() => {
    switch (color) {
      case "default":
        return "before:bg-default-300";
      case "primary":
        return "before:bg-primary";
      case "secondary":
        return "before:bg-secondary";
      case "success":
        return "before:bg-success";
      case "warning":
        return "before:bg-warning";
      case "danger":
        return "before:bg-danger";
      default:
        return "before:bg-default-200";
    }
  }, []);

  return (
    <Alert
      classNames={{
        ...classNames,
        base: cn(
          [
            "bg-default-50 dark:bg-background shadow-sm",
            "border-1 border-default-200 dark:border-default-100",
            "relative before:content-[''] before:absolute before:z-10",
            "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
            "rounded-l-none border-l-0",
            colorClass,
          ],
          classNames?.base,
          className
        ),
        mainWrapper: cn("pt-1", classNames?.mainWrapper),
        iconWrapper: cn("dark:bg-transparent", classNames?.iconWrapper),
      }}
      color={color}
      variant={variant}
      {...props}
    >
      {contents && (
        <ul className="list-inside list-disc">
          {contents?.map((content, index) => {
            return <li key={index}>{content}</li>;
          })}
        </ul>
      )}
      {children}
    </Alert>
  );
};

CustomAlert.displayName = "CustomAlert";

export { CustomAlert };
