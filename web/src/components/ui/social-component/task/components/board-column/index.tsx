import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '@shtcut/types/types';
import BoardCard from '../board-card';

interface BoardColumnProps {
    items: Task[];
}

const BoardColumn: React.FC<BoardColumnProps> = ({ items }) => {
    const hasTasks = items.length > 0;

    return (
        <div className="space-y-2">
            {hasTasks ? (
                items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => <BoardCard provided={provided} snapshot={snapshot} item={item} />}
                    </Draggable>
                ))
            ) : (
                <p className="text-center text-sm font-medium text-gray-500">No Tasks Available</p>
            )}
        </div>
    );
};

export default BoardColumn;
