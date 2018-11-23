import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initial-data';

const Container = styled.div`
    margin-bottom: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    background-color: white;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
`;

class App extends Component {
    state = initialData;

    onDragEnd = result => {
        // reorder column
    }
    render() {
        /* DragDropContext has optional methods onDragStart and onDragUpdate */
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                {this.state.columnOrder.map((columnId) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        );
    }
}

class Column extends Component {
    render() {
        /* Droppable requires droppableId and returns a function, render props pattern */
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.tasks.map((task, idx) => {
                                return <Task key={task.id} task={task} index={idx}/>
                            })}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}

class Task extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                    >
                        <h4>{this.props.task.title}</h4>
                    </Container>
                )}
                
            </Draggable>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
