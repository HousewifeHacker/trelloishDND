import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initial-data';

const Container = styled.div`
    display: flex;
`;
const TaskContainer = styled.div`
    margin-bottom: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
`;
const ColumnContainer = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    padding: 8px;
    width: 20%;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
// background color depends on snapshot
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
    flex-grow: 1;
    min-height: 100px;
`;

class App extends Component {
    state = initialData;

    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        // dropped out of droppable area
        if (!destination) {return}
        // dropped in same location
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {return}

        // remove from source, move into destination
        const startColumn = this.state.columns[source.droppableId];
        const startTaskIds = startColumn.taskIds.slice();
        startTaskIds.splice(source.index, 1);
        const endColumn = this.state.columns[destination.droppableId];
        if (startColumn === endColumn ) {
            startTaskIds.splice(destination.index, 0, draggableId);
            const newStartColumn = {
                ...startColumn,
                taskIds: startTaskIds
            };
            this.setState({
                columns: {
                    ...this.state.columns,
                    [startColumn.id]: newStartColumn,
                }
            });
        } else {
            const newStartColumn = {
                ...startColumn,
                taskIds: startTaskIds
            }
            const endTaskIds = endColumn.taskIds.slice();
            endTaskIds.splice(destination.index, 0, draggableId);
            const newEndColumn = {
                ...endColumn,
                taskIds: endTaskIds
            };
            this.setState({
                columns: {
                    ...this.state.columns,
                    [startColumn.id]: newStartColumn,
                    [endColumn.id]: newEndColumn,
                }
            });
        }
    }
    render() {
        /* DragDropContext has optional methods onDragStart and onDragUpdate */
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Container>
                    {this.state.columnOrder.map((columnId) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        return <Column key={column.id} column={column} tasks={tasks} />;
                    })}
                </Container>
            </DragDropContext>
        );
    }
}

class Column extends Component {
    render() {
        /* Droppable requires droppableId and returns a function, render props pattern */
        return (
            <ColumnContainer>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, idx) => {
                                return <Task key={task.id} task={task} index={idx}/>
                            })}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </ColumnContainer>
        );
    }
}

class Task extends Component {
    render() {
        return (
            // requirements similar to droppable, except index too
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <TaskContainer
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        isDragging={snapshot.isDragging}
                    >
                        <h4>{this.props.task.title}</h4>
                    </TaskContainer>
                )}
            </Draggable>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
