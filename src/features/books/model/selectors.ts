import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

// Selector để lấy danh sách sách đã được filter và sort
export const selectFilteredBooks = createSelector(
  [(state: RootState) => state, (state: RootState, filters: any) => filters],
  (state, filters) => {
    // Logic filter sách sẽ được implement ở đây
    return []
  }
)

// Selector để lấy các category được sử dụng
export const selectUsedCategories = createSelector(
  [(state: RootState) => state],
  (state) => {
    // Logic để lấy các category đã được sử dụng
    return []
  }
)
