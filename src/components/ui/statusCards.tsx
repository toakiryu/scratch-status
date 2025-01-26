import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck } from "lucide-react";

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
      danger?: string;
    };
    status: boolean;
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
            <div>
              <h1 className="font-bold text-xl">{statusItem.title}</h1>
              <p
                className={`text-sm ${
                  statusItem.status ? "text-green-500" : "text-red-500"
                } mt-2`}
              >
                {statusItem.status
                  ? statusItem?.descriptions?.success
                  : statusItem?.descriptions?.danger}
              </p>
            </div>
            <div className="mb-auto">
              {statusItem.status ? (
                <CircleCheck className="text-green-500" />
              ) : (
                <CircleAlert className="text-red-500" />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
