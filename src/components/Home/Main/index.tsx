import {useEffect, useState} from 'react';
import {AddTaskButtonContainer, MainContainer} from './style';
import {Button} from '../../shared/Button';
import {Icon} from '../../shared/Icon';
import ReactTooltip from 'react-tooltip';
import {TaskModal} from '../../shared/Modal/TaskModal';
import {Task} from '../../shared/task.interface';

export const Main = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showModal, toggle] = useState<boolean>(false);

	const modalClosed = (task?: Task) => {
		toggle(false);
		task && setTasks([...tasks, task]);
	};

	return (
		<MainContainer>
			<AddTaskButtonContainer data-tip='Add Task'>
				<Button colorStyle='primary' size='md' hasIcon={true} onClick={() => toggle(true)}>
					<Icon name='PuzzlePlus' size='md' />
				</Button>
			</AddTaskButtonContainer>
			<ReactTooltip />
			<TaskModal title='Add Task' show={showModal} onClose={modalClosed} />
		</MainContainer>
	);
};
