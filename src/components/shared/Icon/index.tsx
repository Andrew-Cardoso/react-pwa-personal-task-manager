import {memo} from 'react';
import {IconProps} from './interface';
import {Svg} from './style';

const IconComponent = ({name, size}: IconProps) => {
	switch (name) {
		case 'PuzzlePlus':
			return (
				<Svg size={size ?? 'md'} viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M13.04 19.61C12.67 18.55 11.68 17.8 10.5 17.8C9 17.8 7.8 19 7.8 20.5V22H4C2.9 22 2 21.11 2 20V16.2H3.5C5 16.2 6.2 15 6.2 13.5S5 10.8 3.5 10.8H2V7C2 5.9 2.9 5 4 5H8V3.5C8 2.12 9.12 1 10.5 1S13 2.12 13 3.5V5H17C18.1 5 19 5.89 19 7V11H20.5C21.88 11 23 12.12 23 13.5C23 13.82 22.94 14.12 22.83 14.39C21.79 13.53 20.46 13 19 13C15.69 13 13 15.69 13 19C13 19.2 13 19.41 13.04 19.61M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z'
					/>
				</Svg>
			);
		case 'AlertOutline':
			return (
				<Svg size={size ?? 'md'} viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z'
					/>
				</Svg>
			);
		default:
			return null;
	}
};

export const Icon = memo(IconComponent);
