import React from 'react';
import TodoApp from './TodoApp';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TodoApp', () => {

    test('has a textbox', () => {
        render(<TodoApp />);
        expect(screen.getByRole('textbox', {name: /default/i})).toBeDefined();
    });

    test('textbox has focus on render', () => {
        render(<TodoApp />);
        expect(screen.getByRole('textbox', { name: /default/i })).toBe(document.activeElement);
    });

    test('can add a todo', () => {
        render(<TodoApp />);
        const textbox = screen.getByRole('textbox', { name: /default/i })
        const text = "wash the car";

        // first, make sure this TODO doesn't exist
        expect(screen.queryByText(text)).toBeNull();

        // then add it in
        userEvent.type(textbox, text);
        fireEvent.keyPress(textbox, {charCode:13});

        // and make sure it's there
        expect(screen.queryByText(text)).not.toBeNull();
    });
    test('can delete a todo', () => {
        render(<TodoApp />);
        const textbox = screen.getByRole('textbox', { name: /default/i })
        const text = "wash the car";

        // first, make sure this TODO doesn't exist
        expect(screen.queryByText(text)).toBeNull();

        // and make sure no 'close' buttons are on the screen by default ...
        // ... one should get added with the addition of a 'todo'
        expect(screen.queryByRole('button', {name: /close/i})).toBeNull();

        // then add a new TODO
        userEvent.type(textbox, text);
        fireEvent.keyPress(textbox, { charCode: 13 });

        // and make sure it's there
        expect(screen.queryByText(text)).not.toBeNull();
        expect(screen.queryByRole('button', { name: /close/i })).not.toBeNull();

        // now delete it
        
    });

});