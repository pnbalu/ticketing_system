import '../App.css'

type PaginationProps = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  pageSize?: number
}

export default function Pagination({ page, pageCount, onPageChange, pageSize }: PaginationProps) {
  if (pageCount <= 1) {
    return null
  }

  const goTo = (next: number) => {
    if (next < 1 || next > pageCount) {
      return
    }
    onPageChange(next)
  }

  return (
    <div className="pagination" role="navigation" aria-label="Table pagination">
      <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <span>
        Page {page} of {pageCount}
        {pageSize ? ` • ${pageSize} per page` : null}
      </span>
      <button type="button" onClick={() => goTo(page + 1)} disabled={page === pageCount}>
        Next
      </button>
    </div>
  )
}
