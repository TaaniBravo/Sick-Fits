import { integer, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Product = list({
    // todo
    // access:
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        status: select({
            options: [
                {label: 'Draft', value: 'DRAFT'},
                {label: 'AVAILABLE', value: 'AVAILABLE'},
                {label: 'UNAVAILABLE', value: 'UNAVAILABLE'}
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: {fieldMode: 'hidden'}
            }
        }),
        price: integer(),
        // todo photo
    }
})