import { motion,AnimatePresence } from 'framer-motion'
import type { NextPage } from 'next';
import Button from './Button'
import Icons from './Icons'
import { useEffect, useState, useRef, useMemo } from 'react'

interface PaginationProps {

    className?: string;
    rest?: any;
    color?: string;
    page: number;
    pageSize: number;
    total: number;
    size?: number;
    onPageChange: (page: number) => void;
}
const Pagination: NextPage<PaginationProps> = ({ className, color,  page, pageSize, total,onPageChange,size, ...rest }) => {
  const totalPages = Math.ceil(total / pageSize);
  const [active, setActive] = useState(page)
  const [oldActive, setOldActive] = useState(page)
  const buttonSize = size ? size : 34
  const wrapperRef:any = useRef(null)
  const [arrayWidth, setArrayWidth] = useState(0)

  const arrayMaxWidth = () => {
    const wrapperWidth:any =  wrapperRef.current ? (wrapperRef?.current?.clientWidth - 16 - ( 4 * (buttonSize + 16)) ): 0
     const arrayW = Math.floor(wrapperWidth / (buttonSize + 16))
     return arrayW < 1 ? 1 : arrayW
   }
 


  const [pages] = useMemo(() => {
    const pagesArr: any = []
    if (totalPages <= arrayWidth) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArr.push(i)
      }
    } else {
      if (page <= arrayWidth - 2) {
        for (let i = 1; i <= arrayWidth; i++) {
          pagesArr.push(i)
        }
      } else if (page > totalPages - (arrayWidth - 2)) {
        for (let i = totalPages - (arrayWidth - 1); i <= totalPages; i++) {
          pagesArr.push(i)
        }
      }
       else {

        if(arrayWidth === 1) {
          pagesArr.push(page)
        }else if (arrayWidth === 2 && page > 1) {
          pagesArr.push(page - 1, page)
        } else if (arrayWidth === 3) {
          pagesArr.push(page - 1, page, page + 1)
        } else if (arrayWidth === 4) {
          pagesArr.push(page - 1, page, page + 1, page + 2)
        } else {

        for (let i = page - 2; i <= page + 2; i++) {
          if(i > 0 && i <= totalPages)
          pagesArr.push(i)
        }
      }
    }
      if(pagesArr[0] !== 1) pagesArr.splice(0, 0, 1)
      if(pagesArr[pagesArr.length - 1] !== totalPages) pagesArr.push(`${totalPages}`)
    }
    return [pagesArr]
  }, [arrayWidth, page,totalPages])

  const [activeIndex, setActiveIndex] = useState(pages.findIndex((item: any) => item == active))

  const pageChange = (pg: any) => {

    typeof pg !== 'number' ? pg = parseInt(pg) : pg = pg
    if (page === 1 && pg === 0) return
    if( page === totalPages && pg === totalPages + 1) return
    setOldActive(activeIndex)
    setActive(pg)
    onPageChange(pg)
    
  }

 
 useEffect(() => {
  const activInd = pages.findIndex((item: any) => item == active)
  if(activInd > -1){

    setActiveIndex(activInd)
    const widtht = arrayMaxWidth()
      setArrayWidth(widtht)
  }
  }, [active, pages])

  useEffect(() => {
    if(page == active) return
    setActive(page)
    }, [page])

    useEffect(() => {
const widtht = arrayMaxWidth()
      setArrayWidth(widtht)
      }, [])

    return (
    <div ref={wrapperRef} className={`flex w-full overflow-clip max-w-[100%] items-center justify-center gap-4 p-2 relative ` + `${className ? className : ''}`}>
      <div className="flex w-fit-content items-center justify-center gap-4 relative">
        <AnimatePresence exitBeforeEnter>
        <motion.div
          className={`flex justify-center absolute z-10 items-center bg-button-gradient3 d3-shadow3 text-white rounded-lg cursor-pointer`}
          style={{height: `${buttonSize}px`, width: `${buttonSize}px`,minHeight: `${buttonSize}px`, minWidth: `${buttonSize}px`}}
          initial={{left: `${((oldActive) * (buttonSize + 16)) + (buttonSize + 16)}px` }}
          // animate={{ x: `${((page) * 2.3) + 40}px` }}
          animate={{left: `${((activeIndex) * (buttonSize + 16)) + (buttonSize + 16)}px` }}

          transition={{ type: 'spring', stiffness: 250, damping: 30}}
          // style={{left: `${((page - 1) * 50) + 50}px` }}
        >
          {active}
          </motion.div>
      </AnimatePresence>
        <Button className={`!p-0 ${page == 1 ? ' disabled' : ''}`} disabled={page == 1 ? true :false} 
        style={{height: `${buttonSize}px`, width: `${buttonSize}px`,minHeight: `${buttonSize}px`, minWidth: `${buttonSize}px`}}
        onClick={() => {pageChange(`${page - 1}`)}}
         leftIcon={ <Icons className={`rotate-180 !w-5 !h-5 `} icon={'arrowRight'}></Icons>}></Button>
        {pages.map((e: any, i : any) => {
        return <Button onClick={() => {pageChange(`${e}`)}} className={`!p-0 flex justify-center bg-image-none items-center bg-primary-400
         text-white rounded-lg cursor-pointer ${e == 1 || e == totalPages ? '!bg-primary-500' : ' '}`
         } key={i} text={`${e}`}
         style={{height: `${buttonSize}px`, width: `${buttonSize}px`,minHeight: `${buttonSize}px`, minWidth: `${buttonSize}px`}}
         ></Button>
      })}
        <Button className={`!p-0 ${page == 1 ? ' disabled' : ''}`} disabled={page == totalPages ? true :false}  onClick={() => {pageChange(`${page + 1}`)}}
        style={{height: `${buttonSize}px`, width: `${buttonSize}px`,minHeight: `${buttonSize}px`, minWidth: `${buttonSize}px`}}
         leftIcon={ <Icons className={`!w-5 !h-5`} icon={'arrowRight'}></Icons>}></Button>
        </div>
      </div>
      )
}

export default Pagination