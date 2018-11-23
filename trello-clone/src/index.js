import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

    render() {
        return this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} />;
        });
    }
}

class Column extends Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <TaskList>
                    {this.props.tasks.map((task, index) => (
                       <Task key={task.id} task={task} />
                    ))}
                </TaskList>
            </Container>
        );
    }
}

class Task extends Component {
    render() {
        return (
            <Container>
                <h4>{this.props.task.title}</h4>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
