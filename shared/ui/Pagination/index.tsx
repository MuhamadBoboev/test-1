import classes from './pagination.module.scss'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'
import { HandySvg } from 'handy-svg'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'
import clsx from 'clsx'

interface Props extends ReactPaginateProps {

}

function Pagination({className, ...props}: Props) {
  const [rangeDisplayed, setRangeDisplayed] = useState(1)
  const {width} = useWindowSize()

  useEffect(() => {
    if (width > 460) {
      setRangeDisplayed(2)
    } else if (width > 600) {
      setRangeDisplayed(2)
    } else if (width > 1024) {
      setRangeDisplayed(3)
    }
  }, [width])

  if (props.pageCount !== undefined && props.pageCount === 1) {
    return null
  }

  return (
    <div className={clsx(classes.pagination, className)}>
      <ReactPaginate
        className={classes.list}
        pageRangeDisplayed={rangeDisplayed}
        marginPagesDisplayed={rangeDisplayed}
        previousClassName={classes.prevItem}
        previousLinkClassName={classes.prevLink}
        nextClassName={classes.nextItem}
        nextLinkClassName={classes.nextLink}
        disabledClassName={classes.disabled}
        disabledLinkClassName={classes.disabledLink}
        activeClassName={classes.activeItem}
        activeLinkClassName={classes.activeLink}
        pageClassName={classes.item}
        pageLinkClassName={classes.link}
        breakClassName={classes.breakItem}
        nextLabel={(
          <HandySvg
            src="/assets/icons/arrow-right.svg"
            width={16}
            height={16}
          />
        )}
        previousLabel={(
          <HandySvg
            src="/assets/icons/arrow-left.svg"
            width={16}
            height={16}
          />
        )}
        {...props}
      />
    </div>
  )
}

export { Pagination }