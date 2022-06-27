import { CategoryStore } from "@app/store/model";
import { GroupCheckbox } from "./EventGroupCheckbox";
import { ExpandIcon } from "./ExpandIcon";

interface Props {
  category: CategoryStore;
  expanded: boolean;
  toggleExpanded: () => void;
}
export function EventGroupHeader(props: Props) {
  return (
    <div
      className="flex min-h-[32px] cursor-pointer flex-row items-center bg-secondary p-2 font-bold text-white"
      onClick={props.toggleExpanded}
    >
      <div className="flex flex-grow items-center">
        <ExpandIcon open={props.expanded} />
        <span className="ml-2">{props.category.id}</span>
      </div>

      <div className="flex">
        <GroupCheckbox category={props.category} />
      </div>
    </div>
  );
}
