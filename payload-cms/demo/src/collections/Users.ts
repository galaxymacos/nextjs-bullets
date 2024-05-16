import type { CollectionConfig } from 'payload/types'
import TestComponent from '@/app/components/TestComponent'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "role",
      label: "Role",
      type: "select",
      defaultValue: "user",
      options: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Admin",
          value: "admin",
        },
      ],
    },
    {
      name: "test",
      type: "ui",
      admin: {
        components: {
          Field: TestComponent,
        }
      }
    }
  ],
}
