import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TToast, IToast, forceHideToast } from '@/actions'
import cn from 'classnames'
import styles from './Toaster.module.scss'

type TFontAwesomeClassNamesAsMsgType = 'fa-ban' | 'fa-exclamation-triangle' | 'fa-info-circle' | 'fa-check-circle'

const getFontAwesomeClassNameByType = (type: TToast): TFontAwesomeClassNamesAsMsgType => {
  switch (type) {
    case 'error':
      return 'fa-ban'
    case 'warning':
      return 'fa-exclamation-triangle'
    case 'success':
      return 'fa-check-circle'
    case 'info':
    case 'default':
    default:
      return 'fa-info-circle'
  }
}
export const Toaster: React.FC = () => {
  const items: IToast[] = useSelector((state: any) => state.toaster.items)
  const dispatch = useDispatch()
  const handleRemove = (id: number): void => {
    dispatch(forceHideToast(id))
  }

  return (
    <div className={styles['toast-container']}>
      {items.map((e: IToast) => (
        <div
          key={e.id}
          className={cn(
            styles['toast-container__toast-item-root'],
            styles[`toast-container__toast-item-root__${e.status}`],
            styles[`toast-container__toast-item-root__${e.status}--${e.type}`]
          )}
          onClick={handleRemove.bind(null, e.id)}
        >
          <div className={styles.messageWrapper}>
            <div>
              <i className={cn('fas', getFontAwesomeClassNameByType(e.type))}></i>
            </div>
            <div>{e.text}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
