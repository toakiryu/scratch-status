import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck, TimerOff } from "lucide-react";
import { statusType } from "../api/scratch/health";

export default function StatusCards({
  classNames,
  statusList,
}: {
  classNames?: {
    section?: string;
    card?: string;
  };
  statusList: {
    title: string;
    descriptions?: {
      success?: string;
      timeout?: string;
      danger?: string;
    };
    status: statusType;
  }[];
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3",
        classNames?.section
      )}
    >
      {statusList.map((statusItem, index) => {
        return (
          <div
            key={index}
            className={cn(
              "flex justify-between items-center p-3 border",
              classNames?.card
            )}
          >
            <div className="mb-auto">
              <h1 className="font-bold text-xl">{statusItem.title}</h1>
              <p
                className={`text-sm ${
                  statusItem.status === "success"
                    ? "text-green-500"
                    : statusItem.status === "timeout"
                    ? "text-yellow-500"
                    : "text-red-500"
                } mt-2`}
              >
                {statusItem.status === "success"
                  ? statusItem?.descriptions?.success || "Success"
                  : statusItem.status === "timeout"
                  ? statusItem.descriptions?.timeout || "Timeout"
                  : statusItem?.descriptions?.danger || "Error"}
              </p>
            </div>
            <div className="mb-auto">
              {statusItem.status === "success" ? (
                <CircleCheck className="text-green-500" />
              ) : (
                <>
                  {statusItem.status === "timeout" ? (
                    <TimerOff className="text-yellow-500" />
                  ) : (
                    <CircleAlert className="text-red-500" />
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
