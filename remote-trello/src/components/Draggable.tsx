import React from "react";
import { useDraggable } from "@dnd-kit/core";

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div className="">{children}</div>
      <div
        {...listeners}
        {...attributes}
        className="absolute right-[30px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition cursor-move"
      >
        <span className="p-1  rounded">⋮⋮</span>
      </div>
    </div>
  );
};
