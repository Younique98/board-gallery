import { render, screen } from '@testing-library/react'
import { BoardCard } from '../BoardCard'

describe('Given a user is viewing the Board', () => {
  const mockBoard = {
    title: 'Marketing Assets',
    boardName: 'Campaign 2025',
    thumbnail: 'https://picsum.photos/400/300',
  }

  it('When user lands on the page, Then it should render the board title and name', () => {
    render(<BoardCard title={mockBoard.title} thumbnail={mockBoard.thumbnail} />)

    expect(screen.getByText(/Marketing Assets/i)).toBeInTheDocument()
  })

  it('When a user navigates the page. Then it should render the thumbnail image.', () => {
    const { container } = render(
      <BoardCard title={mockBoard.title} thumbnail={mockBoard.thumbnail} />
    )

    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image?.getAttribute('src')).toContain('picsum.photos')
  })
})
