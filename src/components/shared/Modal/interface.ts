export interface ModalProps {
	children: JSX.Element | string;
	title: string;
	onClose: (saved: boolean) => any;
	show?: boolean;
}

export interface ModalState {}
