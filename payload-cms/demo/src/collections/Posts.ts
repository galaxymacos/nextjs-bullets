import { CollectionConfig } from 'payload/types'
import AlertBox from '@/app/components/alert-box'

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text'
    },
    {
      name: 'description',
      label: 'Description',
      type: "textarea"
    },
  ]
}