export interface ISortOption {
  field: 'created_at' | 'updated_at' | 'title'  // which field to sort by
  direction: 'asc' | 'desc'                     // ascending or descending
}