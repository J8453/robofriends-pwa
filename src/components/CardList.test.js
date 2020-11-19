import { shallow, mount } from 'enzyme';
import React from 'react';
import CardList from './CardList';

it('expect to render CardList component', () => {
    const mockRobots = [
        {
            id: 1,
            name: 'Jenn',
            username: 'Jenn',
            email: 'xx@gmail.com',
        }
    ]
    expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
})