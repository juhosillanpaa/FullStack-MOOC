import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
//import { prettyDom, getByText } from '@testing-library/dom'
import SimpleBlog from '../components/Simple_Blog'
import Blog from '../components/Blog'


afterEach(cleanup)
describe('SimpleBlog', () => {
    let component
    let mockHandler
    beforeEach(() => {
        const blog = {
            author: 'Kalle Kirjailija',
            title: 'Kertomus',
            url: 'www.kallenblog.fi',
            likes: 20
        }
        mockHandler = jest.fn()
        component = render(
            <SimpleBlog blog={ blog } onClick = { mockHandler } />
        )
    })



    test('renders content', () => {
        expect(component.container).toHaveTextContent('Kertomus')
    })

    test('Clicking the button calls event handler once', async () => {
        const button = component.container.querySelector('button')
        await fireEvent.click(button)
        await fireEvent.click(button)

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})

describe('Blog', () => {

    let component

    beforeEach(() => {
        const blog = {
            author: 'Kalle Kirjailija',
            title: 'Kertomus Nro 2',
            url: 'www.kallenblog.fi',
            likes: 20
        }
        component = render(
            <Blog blog = { blog } />
        )
    })

    //component.debug()
    test('Blog shows only title and author by default', () => {
        expect(component.container).toHaveTextContent('Kertomus Nro 2')
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('Clicking the blog will show rest of it', async () => {
        const btn = component.container.querySelector('.blog')
        await fireEvent.click(btn)
        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })
})







