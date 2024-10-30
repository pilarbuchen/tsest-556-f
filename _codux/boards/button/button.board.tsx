import { createBoard } from '@wixc3/react-board';
import { Button } from '../../../src/components/button/button';
import { MantineProvider } from '@mantine/core';

export default createBoard({
    name: 'Button',
    Board: () => (
        <MantineProvider>
            <Button />
        </MantineProvider>
    ),
});
