import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
//import { exportAllDeclaration } from '@babel/types'



describe('<App />', () => {

    test('if no user is logged, notes are not rendered', async () => {

        let component
        component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('username')
        )
        const blogs = component.container.querySelectorAll('.blog')

        expect(blogs.length).toBe(0)
        const loginform = component.container.querySelectorAll('.LoginForm')
        expect(loginform.length).toBe(1)
    })

    test('if user is logged, notes are rendered', async () => {
        const user = {
            username: 'testAccount',
            token: '123456789',
            name: 'Teemu Testeri',
            id: '1122334455'
        }
        localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
        const temp = localStorage.getItem('loggedBloglistUser')
        console.log(temp)

        let component
        component = render(
            <App />
        )
        component.rerender(<App />)

        await waitForElement(
            () => component.getByText('Blogs')
        )
        const blogs = component.container.querySelectorAll('.blog')

        const loginform = component.container.querySelectorAll('.LoginForm')
        expect(loginform.length).toBe(0)
        expect(blogs.length).toBe(3)
        expect(component.container).toHaveTextContent('Blogi 1')
        expect(component.container).toHaveTextContent('Kirja 1')
        expect(component.container).toHaveTextContent('Huuhaa 1')

    })
})