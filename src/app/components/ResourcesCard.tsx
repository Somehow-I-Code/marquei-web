import { ChevronRightIcon } from "@/components/Icons";

type Resource = {
  name: string;
  description: string;
};

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourcesCard({ resource }: ResourceCardProps) {
  return (
    <li key={resource.name}>
      <a className="flex flex-col gap-2">
        <div className="aspect-square rounded-lg bg-gradient-to-bl from-violet-400 to-violet-800  shadow-sm flex items-center justify-center" />

        <div className="flex items-center gap-1">
          <div className="flex flex-col gap-2">
            <h2 className="text-violet-950 text-sm font-bold">
              {resource.name}
            </h2>

            <p className="text-slate-500 text-xs">{resource.description}</p>
          </div>

          <div className="min-w-3">
            <ChevronRightIcon />
          </div>
        </div>
      </a>
    </li>
  );
}
