import styles from './button.module.scss';
import cx from 'classnames';
import { Button as Button0 , MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';

export interface ButtonProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const Button = ({ className }: ButtonProps) => {
    return (
<div>
<MantineProvider>
                <Button0 variant="filled">Click Me</Button0>
                </MantineProvider>
</div>
    );
};
