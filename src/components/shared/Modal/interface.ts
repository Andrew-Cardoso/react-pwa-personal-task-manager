export interface ModalProps {
	children: JSX.Element | string;
	title: string;
	onClose: (saved: boolean) => any;
	show?: boolean;
	saveButtonText?: string;
	closeButtonText?: string;
}

export interface ModalState {}
