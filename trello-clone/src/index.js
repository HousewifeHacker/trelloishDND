import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';

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
            <div>
                <h3>{this.props.column.title}</h3>
                {this.props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        );
    }
}

class Task extends Component {
    render() {
        return (
            <div>
                <h4>{this.props.task.title}</h4>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
