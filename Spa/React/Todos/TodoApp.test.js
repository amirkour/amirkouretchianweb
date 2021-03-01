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

});