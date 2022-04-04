import {createPortal} from 'react-dom';
import { Button } from '../Button';
import {ModalProps} from './interface';
import {ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader} from './style';

export const Modal = ({title, show, children, onClose}: ModalProps) => {
	return createPortal(
		<ModalContainer show={show}>
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalBody>
					{children}
				</ModalBody>
				<ModalFooter>
          <Button colorStyle='danger' onClick={() => onClose(true)} >Save</Button>
          <Button colorStyle='default' onClick={() => onClose(false)}>Cancel</Button>
        </ModalFooter>
			</ModalContent>
		</ModalContainer>,
		document.getElementById('root')!,
	);
};
